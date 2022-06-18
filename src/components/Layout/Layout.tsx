import Head from 'next/head'

export default function Layout({ children }: any) {
    return (
        <>
            <Head>
                <title>Template</title>
            </Head>
            <main>{children}</main>
        </>
    )
}
