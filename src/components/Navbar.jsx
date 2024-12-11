'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { signIn, signOut, getProviders, useSession } from 'next-auth/react';

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
        <nav className="flex-between w-full mb-16 px-4 pt-3">
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
                                src="/images/profile.png"
                                width={37}
                                height={37}
                                alt="profile picture"
                                className="rounded-full"
                            />
                        </Link>
                    </div>
                ) : (
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>

            {/* Mobile Navigation */}
            <div className="sm:hidden flex relative">

                {/* use session to check if the user already exist */}
                {session?.user ? (
                    <div className="flex items-center">
                        <Image
                            src="/images/profile.png"
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
                    <>
                        {providers &&
                            Object.values(providers).map((provider) => (
                                <button
                                    type="button"
                                    key={provider.name}
                                    onClick={() => signIn(provider.id)}
                                    className="black_btn"
                                >
                                    Sign In
                                </button>
                            ))}
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
