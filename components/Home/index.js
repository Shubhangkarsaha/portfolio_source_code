import { useEffect, useState } from 'react'
import Link from 'next/link'
import AnimatedLetters from '../AnimatedLetters'
import Logo from './Logo'
import Loader from 'react-loaders'
import Image from 'next/image'
import '../../styles/home.css'

const Home = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [projects, setProjects] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [homeImage, setHomeImage] = useState(null)
    const nameArray = ['h', 'u', 'b', 'h', 'a', 'n', 'g', 'k', 'a', 'r']
    const jobArray = [
        'F',
        'u',
        'l',
        'l',
        ' ',
        'S',
        't',
        'a',
        'c',
        'k',
        ' ',
        'D',
        'e',
        'v',
        'e',
        'l',
        'o',
        'p',
        'p',
        'e',
        'r',
        '.',
    ]

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    useEffect(() => {
        // Fetch latest projects
        fetch('/api/projects')
            .then(res => res.json())
            .then(data => {
                const sortedProjects = data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
                setProjects(sortedProjects.slice(0, 3))
                setLoading(false)
            })
            .catch(err => {
                console.error('Error fetching projects:', err)
                setError('Failed to load projects')
                setLoading(false)
            })

        // Fetch home image
        fetch('/api/home-image')
            .then(res => res.json())
            .then(data => {
                if (data?.image) {
                    setHomeImage(data.image)
                }
            })
            .catch(err => {
                console.error('Error fetching home image:', err)
            })
    }, [])

    return (
        <>
            <div className="container home-page">
                <div className="text-zone">
                    <h1>
                        <span className={letterClass}>H</span>
                        <span className={`${letterClass} _12`}>i,</span>
                        <br />
                        <span className={`${letterClass} _13`}>I</span>
                        <span className={`${letterClass} _14`}>&apos;m</span>
                        <Image src="/images/logo-s.png" alt="developer" width={32} height={32} />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={nameArray}
                            idx={15}
                        />
                        <br />
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={jobArray}
                            idx={25}
                        />
                    </h1>

                    <h2>Django / Scikit-learn / MERN Stack</h2>
                    <h2>C++ / JAVA / JavaScript / Python / Data Analysis / Data Structures & Algorithms / object oriented programming</h2>

                    <Link href="/contact" className="flat-button">
                        CONTACT ME
                    </Link>
                </div>

                {/* Right image card */}
                <div className="home-image-card">
                    {homeImage ? (
                        <div className="home-image-wrapper">
                            <Image
                                src={homeImage}
                                alt="Home visual"
                                width={380}
                                height={480}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <div className="home-image-placeholder">
                            <div style={{ opacity: 0.3 }}>
                                <Logo />
                            </div>
                            <p style={{ marginTop: '20px', color: '#fff', opacity: 0.6, fontSize: '14px', fontFamily: 'sans-serif' }}>
                                No image uploaded
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* Projects Section */}
            {loading ? (
                <div className="container" style={{ marginTop: '100px' }}>
                    <Loader type="ball-grid-pulse" />
                </div>
            ) : error ? (
                <div className="container" style={{ marginTop: '100px', color: '#fff', textAlign: 'center' }}>
                    <p>{error}</p>
                </div>
            ) : projects.length > 0 ? (
                <div className="container" style={{ marginTop: '100px' }}>
                    <h2 style={{ color: '#ffd700', fontSize: '32px', marginBottom: '40px', fontFamily: 'Coolvetica' }}>
                        Featured Projects
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        {projects.map(project => (
                            <div
                                key={project._id}
                                style={{
                                    background: 'rgba(255, 255, 255, 0.05)',
                                    padding: '20px',
                                    borderRadius: '10px',
                                    border: '1px solid rgba(255, 215, 0, 0.3)',
                                    transition: 'transform 0.3s ease',
                                }}
                                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-5px)'}
                                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
                            >
                                {project.image && (
                                    <div style={{ marginBottom: '15px', borderRadius: '8px', overflow: 'hidden' }}>
                                        <Image
                                            src={project.image}
                                            alt={project.title}
                                            width={300}
                                            height={200}
                                            style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
                                        />
                                    </div>
                                )}
                                <h3 style={{ color: '#ffd700', fontSize: '20px', marginBottom: '10px', fontFamily: 'Coolvetica' }}>
                                    {project.title}
                                </h3>
                                <p style={{ color: '#fff', fontSize: '14px', marginBottom: '15px', lineHeight: '1.6' }}>
                                    {project.description?.substring(0, 100)}...
                                </p>
                                <div style={{ display: 'flex', gap: '15px', marginTop: '15px' }}>
                                    {project.github && (
                                        <a
                                            href={project.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#ffd700',
                                                textDecoration: 'none',
                                                fontSize: '12px',
                                                border: '1px solid #ffd700',
                                                padding: '8px 15px',
                                                borderRadius: '4px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#ffd700'
                                                e.currentTarget.style.color = '#333'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent'
                                                e.currentTarget.style.color = '#ffd700'
                                            }}
                                        >
                                            GitHub
                                        </a>
                                    )}
                                    {project.demo && (
                                        <a
                                            href={project.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            style={{
                                                color: '#ffd700',
                                                textDecoration: 'none',
                                                fontSize: '12px',
                                                border: '1px solid #ffd700',
                                                padding: '8px 15px',
                                                borderRadius: '4px',
                                                transition: 'all 0.3s ease'
                                            }}
                                            onMouseEnter={(e) => {
                                                e.currentTarget.style.background = '#ffd700'
                                                e.currentTarget.style.color = '#333'
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.background = 'transparent'
                                                e.currentTarget.style.color = '#ffd700'
                                            }}
                                        >
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="container" style={{ marginTop: '100px', color: '#fff', textAlign: 'center' }}>
                    <p style={{ fontSize: '18px', opacity: 0.7 }}>No projects yet</p>
                </div>
            )}

            <Loader type="pacman" />
        </>
    )
}

export default Home

