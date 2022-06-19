import {
    ApolloClient,
    ApolloLink,
    HttpLink,
    InMemoryCache,
} from "@apollo/client";
import {
    getTokens,
    saveTokens
} from "src/utils/localStorageUtils";
import jwtDecode from "jwt-decode";
import config from "../config";
import { cache } from './cache';

const API_URL = config.apollo.APOLLO_URI;

const REFRESH_AUTHENTICATION_MUTATION = `
  mutation Refresh($request: RefreshRequest!) {
    refresh(request: $request) {
      accessToken
      refreshToken
    }
  }
`;

const httpLink = new HttpLink({
    uri: API_URL,
    fetch,
});

export let apolloClient;

const authLink = new ApolloLink((operation, forward) => {
    const auth = getTokens();

    operation.setContext({
        headers: {
            "x-access-token": auth && auth.accessToken ? `Bearer ${auth.accessToken}` : "",
        },
    });

    const {
        exp
    } = auth && auth.accessToken ? jwtDecode(auth.accessToken) : "";

    if (Date.now() >= exp * 1000) {
        fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                operationName: "Refresh",
                query: REFRESH_AUTHENTICATION_MUTATION,
                variables: {
                    request: {
                        refreshToken: auth.refreshToken
                    },
                },
            }),
        })
            .then((res) => res.json())
            .then((res) => {
                operation.setContext({
                    headers: {
                        "x-access-token": auth.accessToken ?
                            `Bearer ${res.data.refresh.accessToken}` :
                            "",
                    },
                });
                if (res && res.data.refresh) {
                    saveTokens({
                        accessToken: res.data.refresh.accessToken,
                        refreshToken: res.data.refresh.refreshToken,
                    });
                }
            });
    }
    return forward(operation);
});

apolloClient = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: cache,
});