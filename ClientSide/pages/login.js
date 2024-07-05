import React,{useEffect} from 'react'
import styles from '../styles/sign.module.css'
import * as Yup from "yup";
import { useFormik } from 'formik';
import { useDispatch,useSelector } from 'react-redux';
import { getUserData, logIn } from '@/lib/features/userSlice';
import { useRouter } from 'next/router';
const initialValues = {
    email: '',
    password: ''
}

const signInSchema = Yup.object({
    password: Yup.string().required('required'),
    email: Yup.string().email().required('required')

})

function Login() {  
    const router=useRouter()
    const userState= useSelector((state)=>state.user)
    const dispatch=useDispatch()
    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues,
        validationSchema: signInSchema,
        onSubmit: (values,action) => {
            
            dispatch(logIn({email:values.email,
                password:values.password
            }))
         
            // action.resetForm()
        }


    });

    useEffect(() => {
        if (userState.loggedUser.isAuth) {
          router.push(`/chat/${values.email}`);
        }
      }, [userState.loggedUser.isAuth]);
    

    return (
        <div style={{width:'100%',display:'flex', justifyContent: "center"}}>

        <div className={styles.container}>
            <div className={styles.title}>
                Login In
            </div>
            <form className={styles.formS} onSubmit={handleSubmit}>
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
                <div><button type='submit' className={styles.btn}>Login In</button></div>
            </form>
        </div>
                    </div>
    )
}

export default Login