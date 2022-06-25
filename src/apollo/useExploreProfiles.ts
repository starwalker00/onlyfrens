import { gql, useQuery } from "@apollo/client";
import { EXPLORE_PROFILES } from "./exploreProfiles";

export const useExploreProfiles = (request: any): any => {
  // const request = {
  //   sortCriteria: 'MOST_FOLLOWERS',
  //   limit: 10,
  // };
  const { data, ...rest } = useQuery(gql(EXPLORE_PROFILES), {
    variables: {
      request,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only"
  });
  const exploreProfiles = data?.exploreProfiles?.items;
  const haveExploreProfiles = Boolean(exploreProfiles?.length > 0);
  const pageInfoNext = data?.exploreProfiles?.pageInfo?.next

  return [exploreProfiles, haveExploreProfiles, pageInfoNext, { ...rest }] as const;
};