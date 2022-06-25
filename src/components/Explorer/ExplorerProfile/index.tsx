import { useEffect } from 'react'
import { Center, VStack } from '@chakra-ui/react'
import { useQuery, gql } from '@apollo/client'
import { useAccount } from 'wagmi'

import { EXPLORE_PROFILES } from 'src/apollo/exploreProfiles'
import ProfileList from './ProfileList'
import { namedConsoleLog } from 'src/utils/logUtils'
import { deleteTokens } from 'src/utils/localStorageUtils'
import { useExploreProfiles } from 'src/apollo/useExploreProfiles'

const ExplorerProfile = () => {
    const { data: account } = useAccount()
    const exploreProfilesRequest = {
        sortCriteria: 'MOST_FOLLOWERS',
        limit: 10,
    };
    const [exploreProfiles, haveExploreProfiles, pageInfoNext, exploreProfilesQuery] = useExploreProfiles(exploreProfilesRequest);

    // remove access-token and refetch data when account changes to update follow status
    // useEffect(() => {
    //     deleteTokens()
    //     exploreProfilesQueryResult.refetch()
    // }, [account]);

    return (
        <>
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
                    onClick={() => exploreProfilesQuery.fetchMore({
                        variables: {
                            request: {
                                ...exploreProfilesRequest,
                                cursor: pageInfoNext
                            },
                        },
                    })}
                />
            </Center>
        </>
    )
}

export default ExplorerProfile
