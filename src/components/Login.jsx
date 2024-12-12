'use client'

import axios from "axios";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { FaUnlockAlt } from "react-icons/fa";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const Login=()=>{
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const submitHandler= async(e)=>{
        e.preventDefault();

        // for form validation

        if (!email || !password) {
            setError('Error! All fields are required.');
            return;
        }

        setLoading(true);
        setError('');

        // Calling of API

        try {

            // const res = await axios.post ('http://localhost:3000/api/login', {email, password})
            const res = await axios.post (`${process.env.NEXT_PUBLIC_ENDPOINT}/api/login`, {email, password})

    

            if (res.status===401) {
                setError(true);
            }

            else if (res.status===200) {
                router.push('/')
            }
            console.log(res);
 
        } catch (error) {
            setError(error.message)
        }

        setLoading(false);
    };


    return(
        <>
            <section>
                <div className="text-black justify-center">
                    <h1 className="flex-center head_text">Login Here</h1>
                    
                    <div className="flex-center  w-fit justify-center m-auto rounded-[20px] mt-4 shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
                        {/* div A */}
                        <div className="bg-amber-400 cursor-pointer py-[5rem] px-[5rem] text-white rounded-[20px] w-fit roll-in-right">
                            <div className="text-[10rem]"><FaUnlockAlt /></div>
                            <h2 className="flex-center"> Promptopia</h2>
                            <p className="text-[10px] flex-center">Login, discover, create, share, delete and edit powerful AI prompts</p>
                        </div>
    
    
    
                        {/* div B */}
                        <div className="w-full">
                            {/* <h2 className="font-medium text-lg">Login Here</h2> */}
                            {/* handling error state on the UI */}
    
                            {error && (
                                <div className="font-semibold py-2 bg-red-500 flicker-4">
                                    <h1 className="text-white text-sm text-center">{error}</h1>
                                </div>
                            )}
    
                            <form onSubmit={submitHandler} className="flex flex-col flex-center gap-5">
                               
                                {/* email */}
                                <div className="flex flex-col pt-10">
                                    <label htmlFor="">Email</label>
                                    <input onChange={(e)=>setEmail(e.target.value)} type="email" 
                                    className="border border-b-stone-950 outline-none w-[20vw] px-3 py-1 text-sm"
                                />
                                </div>
    
                                {/* password */}
                                <div className="relative flex flex-col">
                                    <label htmlFor="">Password</label>
                                    <input onChange={(e)=>setPassword(e.target.value)} type={showPassword ? "text" : "password"} 
                                    className="border border-b-stone-950 outline-none w-[20vw] px-3 py-1 text-sm"/> 
    
                                    <span className="absolute top-8 cursor-pointer right-[1rem]" onClick={()=> setShowPassword ((prev)=>!prev)}>
                                        {showPassword===true ? <GoEye /> : <GoEyeClosed /> }
                                    </span>
                                </div>  
    

                                {/* check box remember me */}
                                <div className="flex gap-2 justify-center mt-1">
                                    <input type="checkbox" /> 
                                    <label>Remember Me</label>
                                </div>    
    
                                <div className="flex justify-center">
                                    <button type="submit" className="w-fit bg-amber-400 hover:bg-amber-200 text-white   font-medium rounded-full px-8 py-2 mt-2">{loading? 'Loading...' : 'Submit form'}</button>
                                </div>
    

                            </form>
                        </div>
                    </div>
                </div>
            </section>
    </>
       )



};

export default Login;