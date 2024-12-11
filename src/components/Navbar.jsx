'use client'

import Image from "next/image"
import Link from "next/link";
import { useState, useEffect } from "react";
import {signIn, signOut, useSession, getProviders} from 'next-auth/react';




const Navbar=()=>{
    const isUserLoggedIn=true;

    const [providers, setProviders] = useState(null);

    useEffect(()=>{
        const setProviders = async ()=>{
            const response = await getProviders();

            setProviders(response);
        }

        setProviders()

    }, [])


    return(
        <>
            <nav className="flex-between w-full mb-16 px-[1rem] pt-3">
                <Link href={'/'} className="flex gap-2 flex-center">
                    <Image src='/images/logo.webp' width={70} height={30} alt="Promptopia Logo" className="object-contain"/>

                    <p className="logo_text">Promptopia</p>
                </Link>

                {/* Desktop Navigation */}

                <div className="sm:flex hidden">
                    {isUserLoggedIn?
                    
                        <div className="flex gap-3 md:gap-5">
                            <Link href={'/create-prompt'} className="black_btn">
                                Create Post
                            </Link>

                            <button type="button" onClick={signOut} className="outline_btn">
                                Sign Out
                            </button>

                            <Link href={'/profile'}>
                                <Image src='/images/profile.png' width={37} height={37} alt="profile picture" className="rounded-full"/>
                            </Link>

                        </div> 
                        
                        : 
                        
                        // sign in using google providers
                        <>
                            {/* {providers &&
                                Object.values(providers).map((providers)=> (<button>
                                    
                                </button>)
                                
                                
                                ) 
                            
                            } */}


                        </>
                    }

                </div>




                
            </nav>
        </>
    )


};
export default Navbar;