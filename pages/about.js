import Layout from '../components/Layout'
import About from '../components/About'
import Head from 'next/head'

export default function AboutPage() {
    return (
        <>
            <Head>
                <title>About - Shubhangkar Saha</title>
                <meta name="description" content="About Shubhangkar Saha - Full Stack Developer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <About />
            </Layout>
        </>
    )
}

