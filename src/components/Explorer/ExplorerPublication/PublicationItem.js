import { HStack, Box } from '@chakra-ui/react'

const PublicationItem = ({ publication }) => {
    return (
        <HStack dir='row'>
            <Box>{publication.id}</Box>
            <Box>{publication.appId}</Box>
            <Box>{publication.profile.handle}</Box>
        </HStack>
    )
}

export default PublicationItem