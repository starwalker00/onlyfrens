import { HStack, Box, Button } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'
import ConnectWalletModal from 'src/components/Modals/ConnectWalletModal'
import { namedConsoleLog } from 'src/utils/logUtils'
import { useAccount, useDisconnect } from 'wagmi'
import { truncateEthAddress } from 'src/utils/ethersService'

function handleOtherButtonClick() {
    console.log("handleFollowButtonClick")
}

export default function ConnectWalletButton() {
    const connectWalletModalDisclosure = useDisclosure()
    const { data, isError, isLoading } = useAccount()
    const { disconnect } = useDisconnect()
    namedConsoleLog("data?.address", data?.address)
    const isWalletConnected = Boolean(data?.address)
    namedConsoleLog("isWalletConnected", isWalletConnected)
    if (!isWalletConnected) {
        return (
            <>
                <ConnectWalletModal connectWalletModalDisclosure={connectWalletModalDisclosure} />
                <Button onClick={connectWalletModalDisclosure.onOpen}>
                    Connect Wallet
                </Button>
            </>
        )
    }
    return (
        <>
            <ConnectWalletModal connectWalletModalDisclosure={connectWalletModalDisclosure} />
            <Button>{truncateEthAddress(data?.address as string)}</Button>
            <Button onClick={() => disconnect()}>
                Disconnect
            </Button>
        </>
    )
}
