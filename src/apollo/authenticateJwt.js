import {
    apolloClient
} from "./apolloClient";
import {
    gql
} from "@apollo/client";

const AUTHENTICATION = `
  mutation SignedAuth($request: SignedAuthChallenge!) { 
    authenticate(request: $request) {
      accessToken
      refreshToken
    }
 }
`;

export const authenticateJwt = (address, signature) => {
    return apolloClient.mutate({
        mutation: gql(AUTHENTICATION),
        variables: {
            request: {
                address,
                signature,
            },
        },
    });
};