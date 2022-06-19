import { HStack, Box } from '@chakra-ui/react'

const ProfileItem = ({ profile }) => {
    return (
        <HStack dir='row'>
            <Box>{profile.id}</Box>
            <Box>{profile.handle}</Box>
            <Box>{profile.ownedBy}</Box>
        </HStack>
    )
}

export default ProfileItem