import type { NextPageWithLayout } from 'src/custom-types/page'
import type { ReactElement } from 'react'
import { Layout, Navbar } from 'src/components/Layout'
import { Center, Heading } from '@chakra-ui/react'

const About: NextPageWithLayout = () => {
    return (
        <>
            <Center>
                <Heading>About</Heading>
            </Center>
        </>
    )
}

About.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            <Navbar />
            {page}
        </Layout>
    )
}

export default About
