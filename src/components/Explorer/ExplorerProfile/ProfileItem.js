import { HStack, Box, Tag } from '@chakra-ui/react'
import FollowButton from './FollowButton'
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
            <FollowButton
                isFollowedByMe={profile.isFollowedByMe}
                account={data}
                profileId={profile.id} />
            {Boolean(profile.isFollowedByMe) && <Tag size='sm'>followed</Tag>}
        </HStack>
    )
}

export default ProfileItem