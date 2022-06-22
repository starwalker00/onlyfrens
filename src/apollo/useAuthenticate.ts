import { useState } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useSignMessage } from 'wagmi'

import { getTokens, saveTokens } from 'src/utils/localStorageUtils'

const CHALLENGE_QUERY = gql`
  query Challenge($request: ChallengeRequest!) {
    challenge(request: $request) {
      text
    }
  }
`

export const AUTHENTICATE_MUTATION = gql`
  mutation Authenticate($request: SignedAuthChallenge!) {
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
  }
`

export const useAuthenticate = () => {
  // hook state
  // const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // API calls and wallet signature
  const [loadChallengeAPI] = useLazyQuery(CHALLENGE_QUERY, {
    fetchPolicy: 'no-cache'
  })
  const { signMessageAsync } = useSignMessage()
  const [authenticateAPI] = useMutation(AUTHENTICATE_MUTATION, {
    fetchPolicy: 'no-cache'
  })

  // main function
  async function authenticate(address: string) {
    // try to get access-token from local storage
    // nothing to do if its present, refresh is handled by ApolloLink in src/apollo/apolloClient
    const auth = getTokens();
    if (Boolean(auth))
      return
    // begin first authentication process
    try {
      const challengeResponse = await loadChallengeAPI({
        variables: {
          request: {
            address,
          },
        },
      });
      const signature = await signMessageAsync({ message: challengeResponse?.data?.challenge?.text })
      const authenticateAPIResponse = await authenticateAPI({
        variables: {
          request: { address: address, signature }
        }
      });
      // save auth information to local storage for future use
      saveTokens({
        accessToken: authenticateAPIResponse.data.authenticate.accessToken,
        refreshToken: authenticateAPIResponse.data.authenticate.refreshToken,
      });
      // setData(response.data);
    } catch (error) {
      console.log(error)
      setError(error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };
  return [authenticate, error, loading] as const;
};