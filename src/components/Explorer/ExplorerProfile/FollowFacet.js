import { HStack, Box, Button, Tag } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import ConnectWalletModal from 'src/components/Modals/ConnectWalletModal'
import { namedConsoleLog } from 'src/utils/logUtils'
import { useFollow } from 'src/apollo/useFollow'

const FollowFacet = ({
    account,
    isFollowedByMe,
    profileId
}) => {
    const [follow, followed, error, loading] = useFollow(null)
    const connectWalletModalDisclosure = useDisclosure()
    function handleFollowButtonClick() {
        console.log("handleFollowButtonClick")
        follow(profileId)
        namedConsoleLog("followed", followed)
    }
    isFollowedByMe = isFollowedByMe || followed;
    return (
        <>
            <ConnectWalletModal connectWalletModalDisclosure={connectWalletModalDisclosure} />
            <Button
                size='xs' isLoading={loading}
                onClick={
                    account ?
                        handleFollowButtonClick :
                        connectWalletModalDisclosure.onOpen
                }
            >
                follow
            </Button>
            {Boolean(isFollowedByMe) && <Tag size='sm'>followed</Tag>}
        </>
    )
}

export default FollowFacet