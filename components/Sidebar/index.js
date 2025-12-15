import Link from 'next/link'
import { useRouter } from 'next/router'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { faGithub, faLinkedin, faSkype, faYoutube } from '@fortawesome/free-brands-svg-icons'
import Image from 'next/image'

const Sidebar = () => {
    const router = useRouter()
    const isActive = (path) => router.pathname === path

    return (
        <div className="nav-bar">
            <Link className="logo" href="/">
                <Image src="/images/logo-s.png" alt="Logo" width={24} height={24} />
            </Link>

            <nav>
                <Link 
                    href="/"
                    className={router.pathname === '/' ? 'active' : ''}
                >
                    <FontAwesomeIcon icon={faHome} />
                </Link>

                <Link 
                    href="/about"
                    className={`about-link ${router.pathname === '/about' ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faUser} />
                </Link>

                <Link 
                    href="/contact"
                    className={`contact-link ${router.pathname === '/contact' ? 'active' : ''}`}
                >
                    <FontAwesomeIcon icon={faEnvelope} />
                </Link>
            </nav>
            <ul className="social-links">
                <li>
                    <a target="_blank" rel="noreferrer" href="https://www.linkedin.com/in/shubhangkar/">
                        <FontAwesomeIcon icon={faLinkedin} />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noreferrer" href="https://github.com/Shubhangkarsaha">
                        <FontAwesomeIcon icon={faGithub} />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noreferrer" href="https://www.youtube.com/@nabla426">
                        <FontAwesomeIcon icon={faYoutube} />
                    </a>
                </li>
                <li>
                    <a target="_blank" rel="noreferrer" href="/">
                        <FontAwesomeIcon icon={faSkype} />
                    </a>
                </li>
            </ul>
        </div>
    )
}


export default Sidebar
