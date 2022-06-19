import type { NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from 'src/components/Layout'
import { Center, Heading } from '@chakra-ui/react'
import ExplorerProfile from "src/components/Explorer/ExplorerProfile";

const ExplorerProfilePage: NextPageWithLayout = () => {
    return (
        <>
            <Center>
                <Heading>ExplorerProfilePage</Heading>
            </Center>
            <ExplorerProfile />
        </>
    )
}

ExplorerProfilePage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}

export default ExplorerProfilePage
