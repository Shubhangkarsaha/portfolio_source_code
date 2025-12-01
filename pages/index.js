import Layout from '../components/Layout'
import Home from '../components/Home'
import Head from 'next/head'

export default function Index() {
    return (
        <>
            <Head>
                <title>Shubhangkar Saha - Portfolio</title>
                <meta name="description" content="Portfolio website of Shubhangkar Saha - Full Stack Developer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Home />
            </Layout>
        </>
    )
}

