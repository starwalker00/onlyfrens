import { HStack, Box, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import ConnectWalletModal from 'src/components/Modals/ConnectWalletModal'
import { namedConsoleLog } from 'src/utils/logUtils'

function handleFollowButtonClick() {
    console.log("handleFollowButtonClick")
}

const FollowButton = ({
    account,
    doesFollow
}) => {
    const connectWalletModalDisclosure = useDisclosure()
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