import { useEffect, useRef, useState } from 'react'
import Loader from 'react-loaders'
import AnimatedLetters from '../AnimatedLetters'
import emailjs from '@emailjs/browser'
import dynamic from 'next/dynamic'
import '../../pages/contact/contact.css'

// Dynamically import MapComponent to avoid SSR issues
const ContactMap = dynamic(() => import('./MapComponent'), {
  ssr: false,
})

const Contact = () => {
    const [letterClass, setLetterClass] = useState('text-animate')
    const refForm = useRef()

    useEffect(() => {
        setTimeout(() => {
            setLetterClass('text-animate-hover')
        }, 4000)
    }, [])

    useEffect(() => {
        // Initialize EmailJS
        if (typeof window !== 'undefined') {
            emailjs.init({
                publicKey: 'NXW3ladxJkGPWrDIZ',
            })
        }
    }, [])

    const sendEmail = (e) => {
        e.preventDefault()

        emailjs
            .sendForm(
                'gmail',
                'contact_shubha',
                refForm.current,
                'NXW3ladxJkGPWrDIZ'
            )
            .then(
                () => {
                    alert('Message successfully send!')
                    window.location.reload(false)
                },
                () => {
                    alert('Failed to send the message, please try again')
                }
            )
    }

    return (
        <>
            <div className="container contact-page">
                <div className="contact-page-wrapper">
                    <div className="contact-left">
                        <div className="text-zone">
                            <h1>
                                <AnimatedLetters
                                    letterClass={letterClass}
                                    strArray={['C', 'o', 'n', 't', 'a', 'c', 't', ' ', 'm', 'e']}
                                    idx={15}
                                />
                            </h1>
                            <p>
                                I&apos;m a very ambitious front-end developer looking for a role in
                                established IT company with the opportunity to work with the latest
                                technologies on chalenging and diverse project.
                            </p>
                            <div className="contact-form">
                                <form ref={refForm} onSubmit={sendEmail}>
                                    <ul>
                                        <li className="half">
                                            <input type="text" name="name" placeholder="Name" required />
                                        </li>
                                        <li className="half">
                                            <input type="email" name="email" placeholder="Email" required />
                                        </li>
                                        <li>
                                            <input placeholder="Subject" type="text" name="Subject" required />
                                        </li>
                                        <li>
                                            <textarea placeholder="Message" name="message" required></textarea>
                                        </li>
                                        <li>
                                            <input type="submit" className="flat-button" value="SEND" />
                                        </li>
                                    </ul>
                                </form>
                            </div>
                        </div>

                        <div className="info-map">
                            Shubhangkar Saha,
                            <br />
                            India,
                            <br />
                            LPU, Punjab
                            <span>shubhangkar426@gmail.com</span>
                        </div>
                    </div>

                    <div className="contact-right">
                        <ContactMap />
                    </div>
                </div>
            </div>
            <Loader type="pacman" />
        </>
    )
}

export default Contact

