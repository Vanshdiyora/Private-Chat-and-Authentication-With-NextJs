import React from 'react'
import styles from '../styles/sign.module.css'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { signUp } from '@/lib/features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';


const initialValues = {
    name: '',
    email: '',
    password: ''
}

const signInSchema = Yup.object({
    name: Yup.string().required('required'),
    password: Yup.string().required('required'),
    email: Yup.string().email().required('required')
})



function Sign() {
    const router=useRouter()
    const userState = useSelector((state) => state.user);
    const dispatch = useDispatch();
    console.log(userState)
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signInSchema,
        onSubmit: (values,action) => {
            dispatch(signUp({email:values.email,
                name:values.name,
                password:values.password
            }))
            router.push(`/login`);
              
            action.resetForm()

        }


    });

    return (
        <div style={{width:'100%',display:'flex', justifyContent: "center"}}>

        <div className={styles.container}>
            <div className={styles.title}>
                Sign Up
            </div>
            <form className={styles.formS} onSubmit={handleSubmit}>
                    Name:
                    {errors.name && touched.name ? (
                        <span style={{ fontSize: '14px', paddingLeft: '30px', color: 'red' }}>{errors.name}</span>
                    ) : null}
                <div className={styles.inputText}>
                    <input type='text' name='name' onBlur={handleBlur} onChange={handleChange} value={values.name} placeholder='Enter Your Name' />
                </div>
                Email:

                    {errors.email && touched.email ? (
                        <span style={{ fontSize: '14px', paddingLeft: '30px', color: 'red' }}>{errors.email}</span>
                    ) : null}
                <div className={styles.inputText}>
                    <input type='text' name='email' onBlur={handleBlur} onChange={handleChange} value={values.email} placeholder='Enter Your Email' />
                </div>
                Password:
                    {errors.password && touched.password ? (
                        <span style={{ fontSize: '14px', paddingLeft: '30px', color: 'red' }}>{errors.password}</span>
                    ) : null}
                <div className={styles.inputText}>
                    <input type='text' name='password' onBlur={handleBlur} onChange={handleChange} value={values.password} placeholder='Enter Your Password' />
                </div>
                <div><button type='submit' className={styles.btn}>Sign Up</button></div>
            </form>
        </div>
                    </div>
    )
}

export default Sign