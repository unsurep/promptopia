
'use client'

import Image from "next/image"
import Link from "next/link"
import React from "react"

const Register=()=>{
   return(
    <>
        <section>
            <div className="text-black">
                <h1 className="flex-center">Register Here</h1>
                
                <div className="flex-center gap-[10rem]">
                    {/* div A */}
                    <div>
                        <div>Image</div>
                        <h2> Promptopia</h2>
                        <p className="text-[10px]">Discover, create, share, delete & edit AI prompts</p>
                    </div>



                    {/* div B */}
                    <div>
                        <div>
                            <h2>New Members Register Here</h2>
                            <p className="text-[12px]">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam nam dicta repudiandae.</p>
                        </div>

                        <form action="" className="flex flex-col gap-1">
                            <label htmlFor="">Name</label>
                            <input type="text" 
                            className="border border-b-stone-950  outline-none w-fit"
                            />

                            <label htmlFor="">Email</label>
                            <input type="email" 
                            className="border border-b-stone-950 outline-none w-fit"
                            />



                            <label htmlFor="">Password</label>
                            <input type="password" 
                            className="border border-b-stone-950 outline-none w-fit"
                            />          




                        </form>
                    </div>
                </div>
            </div>
        </section>
</>
   )


};
export default Register;