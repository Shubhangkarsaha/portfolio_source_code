import Layout from '../components/Layout'
import Contact from '../components/Contact'
import Head from 'next/head'

export default function ContactPage() {
    return (
        <>
            <Head>
                <title>Contact - Shubhangkar Saha</title>
                <meta name="description" content="Contact Shubhangkar Saha - Full Stack Developer" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Layout>
                <Contact />
            </Layout>
        </>
    )
}

