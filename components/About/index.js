import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3, faGitAlt, faHtml5, faJsSquare, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons'
import Loader from 'react-loaders'
import Image from 'next/image'
import '../../styles/about.css'

const About = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [certificates, setCertificates] = useState([])
    const [achievements, setAchievements] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        Promise.all([
            fetch('/api/certificates').then(res => res.json()),
            fetch('/api/achievements').then(res => res.json())
        ])
            .then(([certsData, achievementsData]) => {
                setCertificates(certsData)
                setAchievements(achievementsData)
                setLoading(false)
            })
            .catch(err => {
                console.error('Error fetching data:', err)
                setError('Failed to load data')
                setLoading(false)
            })
    }, [])

    return (
        <>
            <div className="container about-page">
                <div className="text-zone">
                    <h1>
                        <AnimatedLetters
                            letterClass={letterClass}
                            strArray={['A', 'b', 'o', 'u', 't', ' ', 'm', 'e']}
                            idx={15}
                        />
                    </h1>
                    <p>
                        I&apos;m a very ambitious front-end developer looking for a role in
                        established IT company with the opportunity to work with the latest
                        technologies on chalenging and diverse project.
                    </p>
                    <p>
                        I&apos;m quietly confident, naturally curious, and perpetually working on
                        improving my chops one design problem at a time.
                    </p>
                    <p>
                        If I need to define myself in one sentence that would be a family person,
                        son of beautiful mother, a sports fanatic, photography enthusiast, and tech-obsessed!!!
                    </p>

                    {/* Certificates Section */}
                    {loading ? (
                        <div style={{ marginTop: '40px' }}>
                            <Loader type="ball-grid-pulse" />
                        </div>
                    ) : error ? (
                        <p style={{ color: '#ffd700', marginTop: '40px' }}>{error}</p>
                    ) : certificates.length > 0 && (
                        <div style={{ marginTop: '40px' }}>
                            <h3 style={{ color: '#ffd700', fontSize: '24px', marginBottom: '20px', fontFamily: 'Coolvetica' }}>
                                Certificates
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {certificates.map(cert => (
                                    <div
                                        key={cert._id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255, 215, 0, 0.2)'
                                        }}
                                    >
                                        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                                            {cert.image && (
                                                <Image
                                                    src={cert.image}
                                                    alt={cert.title}
                                                    width={60}
                                                    height={60}
                                                    style={{ borderRadius: '4px' }}
                                                />
                                            )}
                                            <div>
                                                <h4 style={{ color: '#ffd700', fontSize: '16px', marginBottom: '5px' }}>
                                                    {cert.title}
                                                </h4>
                                                <p style={{ color: '#fff', fontSize: '13px', margin: '0' }}>
                                                    {cert.issuer} {cert.issueDate && `• ${cert.issueDate}`}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Achievements Section */}
                    {!loading && !error && achievements.length > 0 && (
                        <div style={{ marginTop: '40px' }}>
                            <h3 style={{ color: '#ffd700', fontSize: '24px', marginBottom: '20px', fontFamily: 'Coolvetica' }}>
                                Achievements
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                                {achievements.map(achievement => (
                                    <div
                                        key={achievement._id}
                                        style={{
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            padding: '15px',
                                            borderRadius: '8px',
                                            border: '1px solid rgba(255, 215, 0, 0.2)'
                                        }}
                                    >
                                        <h4 style={{ color: '#ffd700', fontSize: '16px', marginBottom: '5px' }}>
                                            {achievement.title} {achievement.year && `(${achievement.year})`}
                                        </h4>
                                        {achievement.description && (
                                            <p style={{ color: '#fff', fontSize: '13px', margin: '0', lineHeight: '1.6' }}>
                                                {achievement.description}
                                            </p>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                <div className="stage-cube-cont">
                    <div className="cubespinner">
                        <div className="face1">
                            <FontAwesomeIcon icon={faNodeJs} color="#09dd09" />
                        </div>

                        <div className="face2">
                            <FontAwesomeIcon icon={faHtml5} color="#F06529" />
                        </div>

                        <div className="face3">
                            <FontAwesomeIcon icon={faCss3} color="#28A4D9" />
                        </div>

                        <div className="face4">
                            <FontAwesomeIcon icon={faReact} color="#5ED4F4" />
                        </div>

                        <div className="face5">
                            <FontAwesomeIcon icon={faJsSquare} color="#EFD81D" />
                        </div>

                        <div className="face6">
                            <FontAwesomeIcon icon={faGitAlt} color="#EC4D28" />
                        </div>
                    </div>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default About

