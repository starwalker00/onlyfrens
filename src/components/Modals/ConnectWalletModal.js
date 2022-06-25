import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Button, Text
} from '@chakra-ui/react'
import { useConnect, useAccount } from 'wagmi'
import { useEffect } from 'react'
import config from 'src/config'
import { useAuthenticate } from 'src/apollo/useAuthenticate'
import { namedConsoleLog } from 'src/utils/logUtils'

function ConnectWalletModal({ connectWalletModalDisclosure }) {
    const { isOpen, onOpen, onClose } = connectWalletModalDisclosure
    const { connect, connectors, error, isConnecting, pendingConnector, isConnected } = useConnect({
        chainId: config.chain.CHAIN_ID,
    })
    const { data: account } = useAccount()
    const [authenticate, isAuthenticated] = useAuthenticate();

    // close modal after successful connection
    // TODO: fix signature after wallet conection / connected address change
    useEffect(() => {
        (async function () {
            if (isConnected && !isAuthenticated) {
                namedConsoleLog("account?.address", account)
                const res = await authenticate(account?.address);
                onClose()
            }
        })();
    }, [account?.address]);

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
                <ModalHeader>Connect Wallet</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack>
                        {connectors.map((connector) => (
                            <Button
                                disabled={!connector.ready}
                                key={connector.id}
                                onClick={() => connect(connector)}
                            >
                                {connector.name}
                                {!connector.ready && ' (unsupported)'}
                                {isConnecting &&
                                    connector.id === pendingConnector?.id &&
                                    ' (connecting)'}
                            </Button>
                        ))}

                        {error && <div>{error.message}</div>}
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={onClose}>
                        Close
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default ConnectWalletModal