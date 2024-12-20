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

            const res = await axios.post ('http://localhost:3000/api/login', {email, password})
            

            if (res.status===401) {
                setError(true);
            }

            else if (res.status===200) {
                router.push('/home')
            }
            console.log(res);
 
        } catch (error) {
            setError('Incorrect Email/Password')
        }

        setLoading(false);
    };


    return(
        <>
        <section className="px-[1rem]">
            <div className="text-black justify-center flex flex-col">
                <h1 className="hidden md:flex md:justify-center md:items-center head_text py-[1rem]">Login Here</h1>
                <h1 className="md:hidden flex-center text-4xl font-extrabold my-[2rem]">Login Here</h1>
                
                <div className="lg:flex-center md:flex w-fit justify-center m-auto rounded-[20px] md:mt-4 shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
                    {/* div A */}
                    <div className="bg-amber-400 px-[1rem] roll-in-right cursor-pointer py-[5rem] md:px-[5rem] text-white rounded-[20px] w-fit">
                        <div className="text-[10rem] flex-center"><FaUnlockAlt /></div>
                        <h2 className="flex-center"> Promptopia</h2>
                        <p className="text-[10px] text-center">Login, discover, create, share, delete and edit powerful AI prompts</p>
                    </div>



                    {/* div B */}
                    <div className="w-full bg-white mt-4">
                        
                        {/* handling error state on the UI */}

                        {error && (
                            <div className="font-semibold py-2 bg-red-500 flicker-4">
                                <h1 className="text-white text-sm text-center">{error}</h1>
                            </div>
                        )}

                        <form onSubmit={submitHandler} className="flex flex-col gap-1 flex-center py-5 mt-5">

                            {/* email */}
                            <div className="flex flex-col">
                                <label htmlFor="">Email</label>
                                <input onChange={(e)=>setEmail(e.target.value)} type="email" 
                                className="border border-b-stone-950 outline-none w-full px-3 py-1 text-sm"/>
                            </div>

                            {/* password */}
                            <div className="relative flex flex-col">
                                <label htmlFor="">Password</label>
                                <input onChange={(e)=>setPassword(e.target.value)} type={showPassword ? "text" : "password"} 
                                className="border border-b-stone-950 outline-none w-full px-3 py-1 text-sm"/> 

                                <span className="absolute top-8 cursor-pointer right-[1rem]" onClick={()=> setShowPassword ((prev)=>!prev)}>
                                    {showPassword===true ? <GoEye /> : <GoEyeClosed /> }
                                </span>
                            </div>  

                            {/* button */}
                            <div className="flex justify-center mt-5">
                                <button type="submit" className="w-fit bg-amber-400 hover:bg-amber-200 text-white font-medium rounded-full px-8 py-2 mt-2">{loading? 'Loading...' : 'Submit form'}</button>
                            </div>

                            <div className="pt-4">
                                <i className="text-sm">Click here to 
                                <Link href={'/register'} className="cursor-pointer text-yellow-500 pl-1">
                                    register
                                </Link></i>
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