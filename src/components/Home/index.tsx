import type { NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from 'src/components/Layout'
import { Center, Heading } from '@chakra-ui/react'

const Home: NextPageWithLayout = () => {
    return (
        <>
            <Center>
                <Heading>Home</Heading>
            </Center>
        </>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}

export default Home
