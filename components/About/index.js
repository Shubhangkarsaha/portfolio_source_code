import { useEffect, useState } from 'react'
import AnimatedLetters from '../AnimatedLetters'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCss3, faGitAlt, faHtml5, faJsSquare, faNodeJs, faReact } from '@fortawesome/free-brands-svg-icons'
import { faExternalLinkAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import Loader from 'react-loaders'
import Image from 'next/image'
import '../../styles/about.css'
import '../../styles/about-sections.css'

const About = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const [projects, setProjects] = useState([])
    const [certificates, setCertificates] = useState([])
    const [achievements, setAchievements] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const [modalData, setModalData] = useState(null)

    useEffect(() => {
        const timer = setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    useEffect(() => {
        Promise.all([
            fetch('/api/projects').then(res => res.json()),
            fetch('/api/certificates').then(res => res.json()),
            fetch('/api/achievements').then(res => res.json())
        ])
            .then(([projectsData, certsData, achievementsData]) => {
                setProjects(projectsData)
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

    const openModal = (data, type) => {
        setModalData({ ...data, type })
    }

    const closeModal = () => {
        setModalData(null)
    }

    const renderCard = (item, type) => {
        if (type === 'project') {
            return (
                <div key={item._id} className="about-card">
                    {item.image && (
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={300}
                            height={160}
                            className="about-card-image"
                        />
                    )}
                    <h3 className="about-card-title">{item.title}</h3>
                    {item.description && (
                        <p className="about-card-description">
                            {item.description.length > 120 
                                ? `${item.description.substring(0, 120)}...` 
                                : item.description}
                        </p>
                    )}
                    <div className="about-card-actions">
                        {item.demo && (
                            <a
                                href={item.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-card-btn"
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                Demo
                            </a>
                        )}
                        {item.github && (
                            <a
                                href={item.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="about-card-btn"
                            >
                                <FontAwesomeIcon icon={faExternalLinkAlt} />
                                Code
                            </a>
                        )}
                        <button
                            onClick={() => openModal(item, 'project')}
                            className="about-card-btn"
                        >
                            Details
                        </button>
                    </div>
                </div>
            )
        } else if (type === 'certificate') {
            return (
                <div key={item._id} className="about-card">
                    {item.image && (
                        <Image
                            src={item.image}
                            alt={item.title}
                            width={300}
                            height={160}
                            className="about-card-image"
                        />
                    )}
                    <h3 className="about-card-title">{item.title}</h3>
                    {item.issuer && (
                        <p className="about-card-meta">
                            {item.issuer} {item.issueDate && `• ${item.issueDate}`}
                        </p>
                    )}
                    <div className="about-card-actions">
                        <button
                            onClick={() => openModal(item, 'certificate')}
                            className="about-card-btn"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            )
        } else if (type === 'achievement') {
            return (
                <div key={item._id} className="about-card">
                    <h3 className="about-card-title">
                        {item.title} {item.year && `(${item.year})`}
                    </h3>
                    {item.description && (
                        <p className="about-card-description">
                            {item.description.length > 150 
                                ? `${item.description.substring(0, 150)}...` 
                                : item.description}
                        </p>
                    )}
                    <div className="about-card-actions">
                        <button
                            onClick={() => openModal(item, 'achievement')}
                            className="about-card-btn"
                        >
                            View Details
                        </button>
                    </div>
                </div>
            )
        }
        return null
    }

    const renderAddCard = () => (
        <div key="add-card" className="about-card about-card-add">
            <span className="about-card-add-icon">+</span>
        </div>
    )

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

                    {/* New Sections */}
                    <div className="about-sections">
                        {/* Projects Section */}
                        <div className="about-section">
                            <h2>Projects</h2>
                            {loading ? (
                                <div className="about-section-loading">
                                    <Loader type="ball-grid-pulse" />
                                </div>
                            ) : error ? (
                                <div className="about-section-empty">{error}</div>
                            ) : (
                                <div className="about-card-grid">
                                    {projects.map(project => renderCard(project, 'project'))}
                                    {renderAddCard()}
                                </div>
                            )}
                        </div>

                        {/* Certifications Section */}
                        <div className="about-section">
                            <h2>Certifications</h2>
                            {loading ? (
                                <div className="about-section-loading">
                                    <Loader type="ball-grid-pulse" />
                                </div>
                            ) : error ? (
                                <div className="about-section-empty">{error}</div>
                            ) : (
                                <div className="about-card-grid">
                                    {certificates.map(cert => renderCard(cert, 'certificate'))}
                                    {renderAddCard()}
                                </div>
                            )}
                        </div>

                        {/* Achievements Section */}
                        <div className="about-section">
                            <h2>Achievements</h2>
                            {loading ? (
                                <div className="about-section-loading">
                                    <Loader type="ball-grid-pulse" />
                                </div>
                            ) : error ? (
                                <div className="about-section-empty">{error}</div>
                            ) : (
                                <div className="about-card-grid">
                                    {achievements.map(achievement => renderCard(achievement, 'achievement'))}
                                    {renderAddCard()}
                                </div>
                            )}
                        </div>
                    </div>
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

            {/* Modal */}
            {modalData && (
                <div className="about-modal-overlay" onClick={closeModal}>
                    <div className="about-modal-content" onClick={(e) => e.stopPropagation()}>
                        <button className="about-modal-close" onClick={closeModal}>
                            <FontAwesomeIcon icon={faTimes} />
                        </button>
                        <h2 className="about-modal-title">{modalData.title}</h2>
                        
                        {modalData.image && (
                            <Image
                                src={modalData.image}
                                alt={modalData.title}
                                width={600}
                                height={300}
                                className="about-modal-image"
                            />
                        )}

                        {modalData.type === 'project' && (
                            <>
                                {modalData.description && (
                                    <p className="about-modal-description">{modalData.description}</p>
                                )}
                                <div className="about-modal-actions">
                                    {modalData.demo && (
                                        <a
                                            href={modalData.demo}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="about-modal-btn"
                                        >
                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            View Demo
                                        </a>
                                    )}
                                    {modalData.github && (
                                        <a
                                            href={modalData.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="about-modal-btn"
                                        >
                                            <FontAwesomeIcon icon={faExternalLinkAlt} />
                                            View Code
                                        </a>
                                    )}
                                </div>
                            </>
                        )}

                        {modalData.type === 'certificate' && (
                            <>
                                {modalData.issuer && (
                                    <p className="about-modal-meta">
                                        Issued by: {modalData.issuer}
                                        {modalData.issueDate && ` • ${modalData.issueDate}`}
                                    </p>
                                )}
                            </>
                        )}

                        {modalData.type === 'achievement' && (
                            <>
                                {modalData.year && (
                                    <p className="about-modal-meta">Year: {modalData.year}</p>
                                )}
                                {modalData.description && (
                                    <p className="about-modal-description">{modalData.description}</p>
                                )}
                            </>
                        )}
                    </div>
                </div>
            )}

            <Loader type="pacman" />
        </>
    )
}

export default About
