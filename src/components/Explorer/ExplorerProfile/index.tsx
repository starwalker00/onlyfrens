import { useEffect } from 'react'
import { Center, VStack } from '@chakra-ui/react'
import { useQuery, gql } from '@apollo/client'
import { useAccount } from 'wagmi'

import { EXPLORE_PROFILES } from 'src/apollo/exploreProfiles'
import ProfileList from './ProfileList'
import { namedConsoleLog } from 'src/utils/logUtils'
import { deleteTokens } from 'src/utils/localStorageUtils'

const ExplorerProfile = () => {
    const { data: account } = useAccount()
    namedConsoleLog("account", account)
    const request = {
        sortCriteria: 'MOST_FOLLOWERS',
        // cursor: "{\"offset\":0}",
        limit: 10,
    };
    const exploreProfilesQueryResult = useQuery(gql(EXPLORE_PROFILES), {
        variables: {
            request,
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "network-only"
    });
    const exploreProfiles = exploreProfilesQueryResult?.data?.exploreProfiles?.items;
    const haveExploreProfiles = Boolean(exploreProfiles?.length > 0);

    // remove access-token and refetch data when account changes to update follow status
    useEffect(() => {
        deleteTokens()
        exploreProfilesQueryResult.refetch()
    }, [account]);

    return (
        <>
            {console.log(exploreProfilesQueryResult)}
            {
                haveExploreProfiles ?
                    <VStack>
                        <ProfileList profiles={exploreProfiles} />
                    </VStack>
                    : null
            }
            <Center>
                <input
                    type="button"
                    value="load more"
                    onClick={() => exploreProfilesQueryResult.fetchMore({
                        variables: {
                            request: {
                                ...request,
                                cursor: exploreProfilesQueryResult.data.exploreProfiles.pageInfo.next
                            },
                        },
                    })}
                />
            </Center>
        </>
    )
}

export default ExplorerProfile
