import type { NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from 'src/components/Layout'
import { Center, Heading } from '@chakra-ui/react'
import ExplorerPublication from "src/components/Explorer/ExplorerPublication";

const ExplorerPublicationPage: NextPageWithLayout = () => {
    return (
        <>
            <Center>
                <Heading>ExplorerPublicationPage</Heading>
            </Center>
            <ExplorerPublication />
        </>
    )
}

ExplorerPublicationPage.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}

export default ExplorerPublicationPage
