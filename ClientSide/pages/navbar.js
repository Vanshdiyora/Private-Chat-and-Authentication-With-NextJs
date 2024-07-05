import React from 'react'
import styles from '../styles/navbar.module.css'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { logOut } from '@/lib/features/userSlice'
import { useRouter } from 'next/router'
function Navbar() {
  const router =useRouter()
  const userState=useSelector(state=>state.user.loggedUser)
  const dispatch=useDispatch()
  const handleLogout=()=>{
    dispatch(logOut({ email: userState.email }))
      router.push(`/`)
  }
  return (
    <div className={styles.container}>
        <div className={styles.contImage}>
            <img src={"/assets/logo.png"} style={{height:'60px'}}/>
        </div>
        <div className={styles.headersub}>

        <div className={styles.menu}>
            <ul>
                <Link href={'/'}><li>Home</li></Link>
                <Link href={'/'}><li>Start-Up</li></Link>
                {userState ?<Link href={`/chat/${userState.email}`}><li>Chat</li></Link>:''}
                <Link href={'/eventorium'}><li>Auditorium</li></Link>
                {!userState ? <><Link href={'/login'}><li>Login</li></Link>
                <Link  href={'/sign'}><li className={styles.except}>Sign Up</li></Link></>:''}

            </ul>
        </div>
        </div>
        { userState?<p onClick={()=>{handleLogout()}} style={{color:'white', cursor: 'pointer' }}>Log Out</p>:""}
        <p style={{color:'white'}}>{userState.email}</p>

    </div>
  )
}

export default Navbar