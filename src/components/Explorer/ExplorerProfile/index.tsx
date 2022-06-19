import { Center, VStack, Box } from '@chakra-ui/react'
import { EXPLORE_PROFILES } from 'src/apollo/exploreProfiles'
import { useQuery, gql } from '@apollo/client'
import ProfileList from './ProfileList'

const ExplorerProfile = () => {
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
