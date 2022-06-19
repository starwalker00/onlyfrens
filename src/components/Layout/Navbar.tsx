import NextLink from 'next/link'
import {
    Box,
    Flex,
    HStack,
    Link,
    IconButton,
    useDisclosure,
    useColorModeValue,
    Stack,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';

export default function Navbar() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    return (
        <>
            <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
                <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                        size={'md'}
                        icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                        aria-label={'Open Menu'}
                        display={{ md: 'none' }}
                        onClick={isOpen ? onClose : onOpen}
                    />
                    <HStack spacing={8} alignItems={'center'}>
                        <Box>Logo</Box>
                        <HStack
                            as={'nav'}
                            spacing={4}
                            display={{ base: 'none', md: 'flex' }}>
                            <NextLink href='/' passHref>
                                <Link>Home</Link>
                            </NextLink>
                            <NextLink href='/explorer/profiles' passHref>
                                <Link>ExplorerProfile</Link>
                            </NextLink>
                            <NextLink href='/explorer/publications' passHref>
                                <Link>ExplorerPublications</Link>
                            </NextLink>
                            <NextLink href='/about' passHref>
                                <Link>About</Link>
                            </NextLink>
                        </HStack>
                    </HStack>
                </Flex>

                {isOpen ? (
                    <Box pb={4} display={{ md: 'none' }}>
                        <Stack as={'nav'} spacing={4}>
                            <NextLink href='/' passHref>
                                <Link>Home</Link>
                            </NextLink>
                            <NextLink href='/about' passHref>
                                <Link>About</Link>
                            </NextLink>
                        </Stack>
                    </Box>
                ) : null}
            </Box>
        </>
    );
}
