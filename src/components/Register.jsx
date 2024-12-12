
'use client'

import axios from "axios";
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { BsRocketFill } from "react-icons/bs";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";

const Register=()=>{
    const router = useRouter();

    const [showPassword, setShowPassword]=useState(false);
    const [loading, setLoading]= useState(false);
    const [error, setError]=useState('');

    const [name, setName]=useState('');
    const [email, setEmail]=useState('');
    const [password, setPassword]=useState('');

    const submitHandler = async(e)=>{
        e.preventDefault();

        if (!name || !email || !password) {
            setError('Error! Please fill in all fields.');
            return;
        }

        setLoading(true);
        setError('');

        try {
            const res = await axios.post('http://localhost:3000/api/register', {
                name,
                email, 
                password
            });

            if (res.status===201) {
                router.replace('/login')
            } else {
                setError('Registration Failed. Please try again.');
            }
          
        } catch (error) {
            setError('Error! from server:')  

        } finally {
            setLoading(false);
        }
    };



   return(
    <>
        <section>
            <div className="text-black justify-center">
                <h1 className="flex-center head_text">Register Here</h1>
                
                <div className="flex-center gap-[3rem] w-fit justify-center m-auto rounded-[20px] mt-4 shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]">
                    {/* div A */}
                    <div className="bg-amber-400 wobble-hor-top cursor-pointer py-[5rem] px-[5rem] text-white rounded-[20px] w-fit">
                        <div className="text-[10rem]"><BsRocketFill /></div>
                        <h2 className="flex-center"> Promptopia</h2>
                        <p className="text-[10px] flex-center">Discover, create, share, delete and edit AI prompts</p>
                    </div>



                    {/* div B */}
                    <div className="w-full">
                        <h2 className="font-medium text-lg">New Members Register Here</h2>
                        {/* handling error state on the UI */}

                        {error && (
                            <div className="font-semibold py-2 bg-red-500 flicker-4">
                                <h1 className="text-white text-sm text-center">{error}</h1>
                            </div>
                        )}

                        <form onSubmit={submitHandler} className="flex flex-col gap-1 mt-3">
                            {/* name */}
                            <label htmlFor="">Name</label>
                            <input onChange={(e)=>setName(e.target.value)} type="text" 
                            className="border border-b-stone-950 outline-none w-[20vw] px-3 py-1 text-sm"
                            />

                            {/* email */}
                            <label htmlFor="">Email</label>
                            <input onChange={(e)=>setEmail(e.target.value)} type="email" 
                            className="border border-b-stone-950 outline-none w-[20vw] px-3 py-1 text-sm"
                            />

                            {/* password */}
                            <div className="relative flex flex-col">
                                <label htmlFor="">Password</label>
                                <input onChange={(e)=>setPassword(e.target.value)} type={showPassword ? "text" : "password"} 
                                className="border border-b-stone-950 outline-none w-[20vw] px-3 py-1 text-sm"/> 

                                <span className="absolute top-8 cursor-pointer right-[5rem]" onClick={()=> setShowPassword ((prev)=>!prev)}>
                                    {showPassword===true ? <GoEye /> : <GoEyeClosed /> }
                                </span>
                            </div>  






                            {/* check box remember me */}
                            <div className="flex gap-2 justify-center mt-1">
                                <input type="checkbox" /> 
                                <label>Remember Me</label>
                            </div>    

                            <div className="flex justify-center">
                                <button className="w-fit bg-amber-200 hover:bg-amber-400 text-white font-medium rounded-full px-8 py-2 mt-2">Submit form</button>
                            </div>




                        </form>
                    </div>
                </div>
            </div>
        </section>
</>
   )


};
export default Register;