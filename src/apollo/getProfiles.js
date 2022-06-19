import {
  apolloClient
} from "./apolloClient";
import {
  gql
} from "@apollo/client";

export const GET_PROFILES = `
  query Profile($request: ProfileQueryRequest!) {
    profiles(request: $request) {
      items {
        id
        name
        bio
        metadata
        attributes {
          displayType
          traitType
          key
          value
        }
        picture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        handle
        coverPicture {
          ... on NftImage {
            contractAddress
            tokenId
            uri
            verified
          }
          ... on MediaSet {
            original {
              url
              mimeType
            }
          }
          __typename
        }
        ownedBy
        dispatcher {
          address
          canUseRelay
        }
        stats {
          totalFollowers
          totalFollowing
          totalPosts
          totalComments
          totalMirrors
          totalPublications
          totalCollects
        }
        followModule {
          ... on FeeFollowModuleSettings {
            type
            amount {
              asset {
                symbol
                name
                decimals
                address
              }
              value
            }
            recipient
          }
          ... on ProfileFollowModuleSettings {
           type
          }
          ... on RevertFollowModuleSettings {
           type
          }
        }
      }
      pageInfo {
        prev
        next
        totalCount
      }
    }
  }
`;

export const GET_PROFILE_STATS = `
query GetProfilesStats($request: ProfileQueryRequest!) {
  profiles(request: $request) {
    items {
      stats {
        totalFollowers
        totalFollowing
        totalPosts
        totalComments
        totalMirrors
        totalPublications
        totalCollects
      }
    }
  }
}`;

export const USER_COUNT_QUERY = `
query {
  globalProtocolStats {
    totalProfiles
  }
}
`;

export const getProfiles = (request) => {
  return apolloClient.query({
    query: gql(GET_PROFILES),
    variables: {
      request,
    },
    fetchPolicy: "network-only",
  });
};

export const getProfilesCount = async () => {
  const {
    data: {
      globalProtocolStats: {
        totalProfiles
      },
    },
  } = await apolloClient.query({
    query: gql(USER_COUNT_QUERY),
    fetchPolicy: "network-only",
  });
  return totalProfiles;
};

