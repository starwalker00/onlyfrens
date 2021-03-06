import { useEffect } from 'react'
import { useConnect, useAccount } from 'wagmi'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    VStack,
    Button
} from '@chakra-ui/react'

import config from 'src/config'
import { useAuthenticate } from 'src/apollo/useAuthenticate'
import { namedConsoleLog } from 'src/utils/logUtils'
import { useGetProfilesByAddress } from 'src/apollo/useGetProfiles'

function ConnectWalletModal({ connectWalletModalDisclosure }) {
    const { isOpen, onOpen, onClose } = connectWalletModalDisclosure
    const { connect, connectors, error, isConnecting, pendingConnector, isConnected } = useConnect({
        chainId: config.chain.CHAIN_ID,
    })
    const { data: account } = useAccount()
    const { authenticate, isAuthenticated } = useAuthenticate();
    const { data: profilesByAddress } = useGetProfilesByAddress(account?.address);
    console.log("profilesByAddress"); console.log(profilesByAddress);

    // close modal after successful connection
    useEffect(() => {
        (async function () {
            if (isConnected) {
                namedConsoleLog("account?.address", account)
                if (!isAuthenticated) {
                    authenticate();
                }
                onClose()
            }
        })();
    }, [isConnected, isAuthenticated, account]);

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