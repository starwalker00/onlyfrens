import { useEffect, useState } from 'react'
import { gql, useLazyQuery, useMutation } from '@apollo/client'
import { useAccount, useSignMessage } from 'wagmi'

import { getTokens, saveTokens } from 'src/utils/localStorageUtils'
import { getAddress } from 'src/utils/jwtService'

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
  const { data: account } = useAccount()

  // - lens api query - loadChallengeAPI
  // - web3 signing - signMessage
  // - lens api mutation - authenticateAPIMutate

  // get authentication status for current connected address from local storage
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {
    if (typeof window !== 'undefined') { // no local storage server-side, runs only client-side
      const auth = getTokens();
      const authAddress = getAddress(auth)
      if (Boolean(auth) && authAddress == account?.address) {
        console.log("useAuthenticate:: localStorage found for address: " + account?.address)
        setIsAuthenticated(true)
      } else {
        console.log("useAuthenticate:: address" + account?.address + " not authenticated")
        setIsAuthenticated(false)
      }
    }
  }, [account])


  // 1/3 lens api query - loadChallengeAPI
  const [loadChallengeAPI] = useLazyQuery(CHALLENGE_QUERY, {
    fetchPolicy: 'network-only',
    async onCompleted(challengeAPIData) {
      alert(JSON.stringify(challengeAPIData))
      signMessage.signMessage({ message: challengeAPIData?.challenge?.text })
    },
    onError(error) {
      alert(error)
    }
  });

  // 2/3 web3 signing - signMessage
  const signMessage = useSignMessage({
    onSuccess(signature, args) {
      alert(JSON.stringify(signature))
      authenticateAPIMutate({
        variables: {
          request: { address: account?.address, signature: signature }
        }
      });
    },
    onError(error) {
      alert(error)
    }
  })

  // 3/3 lens api mutation - authenticateAPIMutate
  const [authenticateAPIMutate, authenticateAPIResponse] = useMutation(AUTHENTICATE_MUTATION, {
    fetchPolicy: 'network-only',
    onCompleted(authenticateAPIData) {
      alert(JSON.stringify(authenticateAPIData))
      // save auth information to local storage for future use
      saveTokens({
        accessToken: authenticateAPIData.authenticate.accessToken,
        refreshToken: authenticateAPIData.authenticate.refreshToken,
      });
      console.log("useAuthenticate:: address" + account?.address + " authenticated")
      setIsAuthenticated(true)
    },
    onError(error) {
      alert(error)
    }
  })


  function authenticate() {
    console.log("useAuthenticate:authenticate")
    console.log(`isAuthenticated = ${isAuthenticated}`)
    // do not auth if already authenticated or wallet not connected
    const skip = isAuthenticated || !Boolean(account?.address)
    if (!skip) {
      loadChallengeAPI({
        variables: {
          request: {
            address: account?.address,
          },
        },
      });
    }

  }
  return [authenticate, isAuthenticated] as const;
};