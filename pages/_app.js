import '../styles/globals.css'
import { useEffect } from 'react'
import 'animate.css'
import 'loaders.css'
import 'leaflet/dist/leaflet.css'

function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // Initialize EmailJS if needed
        if (typeof window !== 'undefined') {
            // EmailJS will be initialized in Contact component
        }
    }, [])

    return <Component {...pageProps} />
}

export default MyApp

