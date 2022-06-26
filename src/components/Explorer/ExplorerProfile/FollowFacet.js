import { Button, Tag } from '@chakra-ui/react'
import { namedConsoleLog } from 'src/utils/logUtils'
import { useFollow } from 'src/apollo/useFollow'

const FollowFacet = ({
    account,
    isFollowedByMe,
    profileId
}) => {
    const [follow, followed, error, isError, isLoading] = useFollow()
    function handleFollowButtonClick() {
        console.log("handleFollowButtonClick")
        follow(profileId)
        namedConsoleLog("followed", followed)
    }
    isFollowedByMe = isFollowedByMe || followed
    return (
        <>
            <Button
                size='xs' isLoading={isLoading}
                onClick={handleFollowButtonClick}
            >
                follow
            </Button>
            {Boolean(isFollowedByMe) && <Tag size='sm'>followed</Tag>}
        </>
    )
}

export default FollowFacet