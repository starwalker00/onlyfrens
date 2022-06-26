import { useAccount, useDisconnect } from 'wagmi'

import { Button, Tag } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/hooks'

import { useAuthenticate } from 'src/apollo/useAuthenticate'
import ConnectWalletModal from 'src/components/Modals/ConnectWalletModal'
import { truncateEthAddress } from 'src/utils/ethersService'

function handleOtherButtonClick() {
    console.log("handleFollowButtonClick")
}

export default function ConnectWalletButton() {
    const connectWalletModalDisclosure = useDisclosure()
    const { data } = useAccount()
    const { authenticate, isAuthenticated } = useAuthenticate()
    const { disconnect } = useDisconnect()
    const isWalletConnected = Boolean(data?.address)

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
            {Boolean(isAuthenticated) && <Tag size='sm'>authenticated</Tag>}
            <Button onClick={() => disconnect()}>
                Disconnect
            </Button>
        </>
    )
}
