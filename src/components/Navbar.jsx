'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';
import { FcGoogle } from "react-icons/fc";
import { FaUser } from "react-icons/fa6";

const Navbar = () => {
    // Mock value for logged-in state; replace with actual session logic.
    const {data: session} = useSession();

    const [providers, setProviders] = useState(null);
    const [toggleDropdown, setToggleDropdown] = useState(false);

    useEffect(() => {
        const fetchProviders = async () => {
            const response = await getProviders();
            setProviders(response);
        };

        fetchProviders();
    }, []);

    return (
        <nav className="flex-between w-full  px-4 ">
            {/* Logo Section */}
            <Link href="/" className="flex gap-2 items-center">
                <Image
                    src="/images/logo2.jpg"
                    width={50}
                    height={50}
                    alt="Promptopia Logo"
                    className="object-contain"
                />
                <p className="logo_text">Promptopia</p>
            </Link>

           

            {/* Desktop Navigation */}
            <div className="sm:flex hidden">
                {/* use session to check if the user already exist */}
                {session?.user ? (
                    <div className="flex gap-3 md:gap-5">
                        <Link href="/create-prompt" className="black_btn">
                            Create Post
                        </Link>
                        <button type="button" onClick={signOut} className="outline_btn">
                            Sign Out
                        </button>
                        <Link href="/profile">
                            <Image
                                // making sure we get the profile picture from goggle aacount
                                // src="/images/profile.png"
                                src="https://lh3.googleusercontent.com/a/ACg8ocJ7T2h3MIa8vSrcPUNczjm2gEKYwP7LF0RXqMk5TiRtTxc2lMOZvg=s96-c"
                                width={37}
                                height={37}
                                alt="User profile"
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <div className="flex flex-col gap-3">
                        {providers &&
                            Object.values(providers).map((provider) => (

                               <div key={provider.name}>
                                {/* signin / register with your google acc */}
                                    <button
                                        type="button"
                                        // key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn">
                                        <span className="pr-2"><FcGoogle className="w-full" /></span><span className="text-[12px]"> Google login</span>
                                    </button>
                               </div>
                        ))}

                        {/* sign up normally */}
                        <Link href={'/register'}>
                            <button
                                type="button"
                                    className="black_btn">
                            <span className="pr-2"><FaUser className="w-full"  /></span> <span className="text-[12px]">Register here</span>
                            </button>
                        
                        </Link>



                            
                    </div>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">

                {/* use session to check if the user already exist */}
                {session?.user ? (
                    <div className="flex items-center">
                        <Image
                            // making sure we get the profile picture from goggle aacount
                            // src="/images/profile.png"

                            src="https://lh3.googleusercontent.com/a/ACg8ocJ7T2h3MIa8vSrcPUNczjm2gEKYwP7LF0RXqMk5TiRtTxc2lMOZvg=s96-c"
                            width={37}
                            height={37}
                            alt="profile picture"
                            className="rounded-full cursor-pointer"
                            onClick={() => setToggleDropdown((prev) => !prev)}
                        />
                        {toggleDropdown && (
                            <div className="dropdown">
                                <Link
                                    href="/profile"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}>My Profile
                                </Link>

                                <Link
                                    href="/create-prompt"
                                    className="dropdown_link"
                                    onClick={() => setToggleDropdown(false)}>Create Prompt
                                </Link>

                                <button
                                    type="button"
                                    onClick={() => {
                                        setToggleDropdown(false);
                                        signOut();
                                    }}
                                    className="dropdown_link mt-5 w-full black_btn hover:text-black"
                                >
                                    <b className="text-white hover:text-black w-full">Sign Out</b>
                                </button>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="flex gap-3">
                        {providers &&
                            Object.values(providers).map((provider) => (

                               <div key={provider.name}>
                                {/* signin / register with your google acc */}
                                    <button
                                        type="button"
                                        // key={provider.name}
                                        onClick={() => signIn(provider.id)}
                                        className="black_btn">
                                        <span className="pr-2"><FcGoogle  /></span> <span className="text-[10px]">Google login</span>
                                    </button>
                               </div>
                        ))}

                        {/* sign up normally */}
                        <Link href={'/register'}>
                            <button
                                type="button"
                                    className="black_btn">
                            <span className="pr-2"><FaUser className="w-full"  /></span> <span className="text-[10px]">Register here</span>
                            </button>
                        
                        </Link>



                            
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
