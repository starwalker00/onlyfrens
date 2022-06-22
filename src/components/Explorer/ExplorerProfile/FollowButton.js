import { HStack, Box, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import ConnectWalletModal from 'src/components/Modals/ConnectWalletModal'
import { namedConsoleLog } from 'src/utils/logUtils'
import { useFollow } from 'src/apollo/useFollow'



const FollowButton = ({
    account,
    isFollowedByMe,
    profileId
}) => {
    const [follow, data, error, loading] = useFollow(null)
    const connectWalletModalDisclosure = useDisclosure()
    function handleFollowButtonClick() {
        console.log("handleFollowButtonClick")
        follow(profileId)
        namedConsoleLog("data", data)
    }
    return (
        <>
            <ConnectWalletModal connectWalletModalDisclosure={connectWalletModalDisclosure} />
            <Button
                size='xs'
                onClick={
                    account ?
                        handleFollowButtonClick :
                        connectWalletModalDisclosure.onOpen
                }
            >
                follow
            </Button>
        </>
    )
}

export default FollowButton