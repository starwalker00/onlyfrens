import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { useAccount } from "wagmi";
import { EXPLORE_PROFILES } from "./exploreProfiles";

export const useExploreProfiles = (request: any): any => {
  const { data: account } = useAccount()
  // const request = {
  //   sortCriteria: 'MOST_FOLLOWERS',
  //   limit: 10,
  // };
  const { data, refetch, ...rest } = useQuery(gql(EXPLORE_PROFILES), {
    variables: {
      request,
    },
    notifyOnNetworkStatusChange: true,
    fetchPolicy: "network-only"
  });

  // refetch on account change to update followed status
  useEffect(() => {
    refetch()
  }, [account])

  const exploreProfiles = data?.exploreProfiles?.items;
  const haveExploreProfiles = Boolean(exploreProfiles?.length > 0);
  const pageInfoNext = data?.exploreProfiles?.pageInfo?.next

  return [exploreProfiles, haveExploreProfiles, pageInfoNext, { ...rest }] as const;
};