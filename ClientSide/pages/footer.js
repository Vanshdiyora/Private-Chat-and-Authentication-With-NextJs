import React from 'react'
import { FaFacebookF } from "react-icons/fa";
import { FaInstagram,FaYoutube,FaTwitter ,FaPinterestP ,FaLinkedinIn  } from "react-icons/fa";
import styles from '../styles/footer.module.css'
function Footer() {
  return (
    <div className={styles.container}>
      <div className={styles.container1}>
        
        <div>
          <ul>
            <li>Home</li>
            <li>Agritech Start Up</li>
            <li>Services</li>
            <li>Auditorium</li>
          </ul>
        </div>
        <div className={styles.container1Center}>
          <div >

            <img src='/assets/logo.png' style={{width:'130px'}}/>
          </div>
          <div className={styles.icons}>
            <FaFacebookF />
            <FaInstagram  />
            <FaYoutube />
            <FaTwitter />
            <FaPinterestP/>
            <FaLinkedinIn />
          </div>
        </div>
        <div>
          <ul className={styles.container1right}>
            <li>Blogs</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
            <li>Terms & Con.</li>
          </ul>
        </div>


      </div>
      <div className={styles.container2}>
        <div>
          <p style={{ fontSize: '20px' }}> Email Address:</p>
          <p style={{ fontSize: '18px' }}>contact@wibes.com</p>
        </div>
        <div className={styles.container3Center}>
          <p>Address:

          </p>
          <p>
            9th Floor, APMC Krushi Bazaar, 901 to 910, Ring Rd, beside North Extension, Sahara Darwaja, Begampura, Surat, Gujarat 395003</p>
        </div>
        <div className={styles.container2Right}>
        <p>Contact:</p>

<p>+91 83206 27743</p>
        </div>
      </div>
      <div className={styles.container3}>
        <p>@2023 Wibes Co-Working Space. All Rights Reserved.</p>
        <p>Refund Policy</p>
      </div>

    </div>

  )
}

export default Footer