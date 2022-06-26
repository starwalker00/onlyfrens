import { useState } from 'react'
import { gql, useMutation } from '@apollo/client'
import { useAccount, useContractWrite, useSignTypedData } from 'wagmi'

import config from 'src/config'
import omit from 'src/utils/omit'
import { splitSignature } from 'src/utils/ethersService'
import { LensHubProxy } from 'src/abis/LensHubProxy'

import { useAuthenticate } from './useAuthenticate'
import { namedConsoleLog } from 'src/utils/logUtils'

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

  // - lens api mutation - createFollowTypedData
  // - web3 signing - signTypedData
  // - web3 call - followWithSig

  const [followed, setFollowed] = useState<any>(false);

  const { data: account } = useAccount()
  const [authenticate, isAuthenticated] = useAuthenticate();

  // 1/3
  const [createFollowTypedDataAPIMutate] = useMutation(CREATE_FOLLOW_TYPED_DATA_MUTATION, {
    fetchPolicy: 'network-only',
    async onCompleted(createFollowTypedDataAPIData) {
      alert(JSON.stringify(createFollowTypedDataAPIData))
      const { createFollowTypedData: { typedData } } = createFollowTypedDataAPIData;
      signTypedData.signTypedData({
        domain: omit(typedData?.domain, '__typename'),
        types: omit(typedData?.types, '__typename'),
        value: omit(typedData?.value, '__typename')
      })
    },
    onError(error) {
      alert(error)
    }
  })

  // 2/3
  const signTypedData = useSignTypedData({
    onSuccess(signature, typedData) {
      alert(JSON.stringify(typedData))
      const { profileIds, datas: followData } = typedData?.value
      const { v, r, s } = splitSignature(signature)
      const sig = { v, r, s, deadline: typedData.value.deadline }
      const inputStruct = {
        follower: account?.address,
        profileIds,
        datas: followData,
        sig
      }
      followWithSig.write({ args: inputStruct })
    },
  })

  // 3/3
  const followWithSig = useContractWrite(
    {
      addressOrName: config.contracts.LENS_HUB_CONTRACT_ADDRESS,
      contractInterface: LensHubProxy
    },
    'followWithSig',
    {
      async onSuccess(data, args) {
        alert(JSON.stringify(data))
        const { hash, wait } = data;
        const txReceipt = await wait();
        // // is tx is successful, update state without refetching with API
        if (Boolean(txReceipt?.status)) {
          setFollowed(true)
        }
      },
      onError(error) {
        alert(error)
      }
    }
  )
  function follow(profileId: string) {
    console.log("useFollow:follow")
    console.log(`isAuthenticated = ${isAuthenticated}`)
    if (isAuthenticated) {
      createFollowTypedDataAPIMutate({
        variables: {
          request: {
            follow: { profile: profileId },
          },
        },
      });
    }
  }
  return [follow, followed] as const;
};