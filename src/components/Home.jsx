"use client";

import Feed from "@/components/Feed";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { GoSignOut } from "react-icons/go";
import Image from "next/image";
import React from "react";
import { Typewriter, useTypewriter } from "react-simple-typewriter";


// AOS
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Home = () => {

  const [text, helper]=useTypewriter ({




    
  })


  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animation triggers only once on scroll
    });
  }, []);

 

    return (
      <section className="w-full flex-center flex-col px-[1rem] ">
        {/* Nav */}
        <nav className="flex-between w-full px-[1rem] pt-[1rem]  ">
          {/* Logo Section */}
          <Link href="/" className="flex gap-2 items-center" data-aos="fade-left" data-aos-duration="2000">
            <Image
              src="/images/logo2.jpg"
              width={50}
              height={50}
              alt="Promptopia Logo"
              className="object-contain"
            />
            <p className="logo_text">Promptopia</p>
          </Link>

          <div className="flex gap-3 " 
           >
            {/* sign up normally */}

            {/* create button */}
            <Link href={"/create-prompt"}>
              <button type="button" className="black_btn flex items-center justify-center gap-1 shake">
                {/* <p className=""><GoSignOut /></p> */}
                <p className="text-[14px]">Create-Prompt</p>
              </button>
            </Link>

            {/* signout button */}
            <Link href={""}>
              <button type="button" className="black_btn flex items-center justify-center gap-1 shake">
                <p className=""><GoSignOut /></p>
                <p className="text-[14px]">Sign out</p>
              </button>
            </Link>

            {/* Profile Pic */}
          </div>
        </nav>

       <div data-aos="zoom-in-up" data-aos-duration="2000" >
          <h1 className="head_text text-center">
            Discover & Share
            <br className="max-md:hidden" />
            <span className="orange_gradient hidden:lg">AI-Powered Prompts</span>
          </h1>

          <p className="desc tect-center">
            Promptopia is an open-source AI prompting tool for modern world to
            discover, create and share creative prompts.
          </p>
        </div>

        {/* Feed component */}
        <div className="mt-10">
          <Feed />    
        </div>

      </section>
    );
  }
export default Home;
