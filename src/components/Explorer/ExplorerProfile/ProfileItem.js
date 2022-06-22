import { HStack, Box, Tag } from '@chakra-ui/react'
import FollowFacet from './FollowFacet'
import { useAccount } from 'wagmi'
import { namedConsoleLog } from 'src/utils/logUtils'

const ProfileItem = ({ profile }) => {
    const { data, isError, isLoading } = useAccount()
    namedConsoleLog("data", data)
    return (
        <HStack dir='row'>
            <Box>{profile.id}</Box>
            <Box>{profile.handle}</Box>
            <Box>{profile.ownedBy}</Box>
            <FollowFacet
                isFollowedByMe={profile.isFollowedByMe}
                account={data}
                profileId={profile.id} />
        </HStack>
    )
}

export default ProfileItem