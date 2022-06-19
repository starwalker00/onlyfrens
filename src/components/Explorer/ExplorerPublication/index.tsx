import { Center, VStack, Box } from '@chakra-ui/react'
import { EXPLORE_PUBLICATIONS } from 'src/apollo/explorePublications'
import { useQuery, gql } from '@apollo/client'
import PublicationList from './PublicationList'

const ExplorerPublication = () => {
    const request = {
        sortCriteria: 'TOP_COLLECTED',
        // cursor: "{\"offset\":0}",
        limit: 10,
    };
    const explorePublicationsQueryResult = useQuery(gql(EXPLORE_PUBLICATIONS), {
        variables: {
            request,
        },
        notifyOnNetworkStatusChange: true,
        fetchPolicy: "network-only"
    });
    const explorePublications = explorePublicationsQueryResult?.data?.explorePublications?.items;
    const haveExplorePublications = Boolean(explorePublications?.length > 0);

    return (
        <>
            {console.log(explorePublicationsQueryResult)}
            {
                haveExplorePublications ?
                    <VStack>
                        <PublicationList publications={explorePublications} />
                    </VStack>
                    : null
            }
            <Center>
                <input
                    type="button"
                    value="load more"
                    onClick={() => explorePublicationsQueryResult.fetchMore({
                        variables: {
                            request: {
                                ...request,
                                cursor: explorePublicationsQueryResult.data.explorePublications.pageInfo.next
                            },
                        },
                    })}
                />
            </Center>
        </>
    )
}

export default ExplorerPublication
