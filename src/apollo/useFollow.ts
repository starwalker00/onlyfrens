import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useAccount, useContractWrite, useSignTypedData } from 'wagmi'

import config from 'src/config'
import omit from 'src/utils/omit'
import { splitSignature } from 'src/utils/ethersService'
import { LensHubProxy } from 'src/abis/LensHubProxy'

import { useAuthenticate } from './useAuthenticate'

// used to inform the relayer that pays the fees
const BROADCAST_MUTATION = gql`
  mutation Broadcast($request: BroadcastRequest!) {
    broadcast(request: $request) {
      ... on RelayerResult {
        txHash
      }
      ... on RelayError {
        reason
      }
    }
  }
`

const CREATE_FOLLOW_TYPED_DATA_MUTATION = gql`
  mutation CreateFollowTypedData(
    $options: TypedDataOptions
    $request: FollowRequest!
  ) {
    createFollowTypedData(options: $options, request: $request) {
      id
      expiresAt
      typedData {
        domain {
          name
          chainId
          version
          verifyingContract
        }
        types {
          FollowWithSig {
            name
            type
          }
        }
        value {
          nonce
          deadline
          profileIds
          datas
        }
      }
    }
  }
`

export const useFollow = (profileId: any) => {
  const url = 'https://jsonplaceholder.typicode.com/todos/1'
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { data: account } = useAccount()
  const [authenticate] = useAuthenticate();
  const [createFollowTypedDataAPI, { loading: typedDataLoading }] = useMutation(
    CREATE_FOLLOW_TYPED_DATA_MUTATION,
  )
  const { signTypedDataAsync } = useSignTypedData()
  const { writeAsync } = useContractWrite(
    {
      addressOrName: config.contracts.LENS_HUB_CONTRACT_ADDRESS,
      contractInterface: LensHubProxy
    },
    'followWithSig',
  )
  async function follow(profileId: string) {
    try {
      // authenticate
      // account.address should never be undefined if we reach this
      const res = await authenticate(account?.address as string);
      // follow
      const createFollowTypedDataAPIResponse = await createFollowTypedDataAPI({
        variables: {
          request: {
            follow: { profile: profileId },
          },
        },
      });
      console.log(createFollowTypedDataAPIResponse);
      const { data: { createFollowTypedData: { typedData } } } = createFollowTypedDataAPIResponse;
      const signTypedDataAsyncResponse = await signTypedDataAsync({
        domain: omit(typedData?.domain, '__typename'),
        types: omit(typedData?.types, '__typename'),
        value: omit(typedData?.value, '__typename')
      })
      const { profileIds, datas: followData } = typedData?.value
      const { v, r, s } = splitSignature(signTypedDataAsyncResponse)
      const sig = { v, r, s, deadline: typedData.value.deadline }
      const inputStruct = {
        follower: account?.address,
        profileIds,
        datas: followData,
        sig
      }
      await writeAsync({ args: inputStruct })
      // setData(response.data);
    } catch (error) {
      console.log(error)
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return [follow, data, error, loading] as const;
};