"use client";

import Feed from "@/components/Feed";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { FaUser } from "react-icons/fa6";
import Image from "next/image";
import react from "react";
import { useTypewriter } from "react-simple-typewriter";
import { TiWeatherPartlySunny } from "react-icons/ti";


// AOS
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Home = () => {
  const showCursor = true;

  const [text, helper]=useTypewriter ({
    words: ['Discover ', 'Create ', 'Share ','Discover & Share '],
    cursor: showCursor,
    cursorStyle:showCursor ? '_' : '',
    loop:3,
    typeSpeed:70,
    deleteSpeed:50,
    delaySpeed:1000
  });











  useEffect(() => {
    AOS.init({
      duration: 1000, // Animation duration in milliseconds
      once: true, // Animation triggers only once on scroll
    });
  }, []);



    return (
      <section>
      <div className="w-full flex-center flex-col px-[1rem] ">
        {/* Nav */}
        <nav className="flex-between w-full px-[1rem] pt-[2rem]  ">
          {/* Logo Section */}

          {/* Div A */}
          <Link href="/" className="flex gap-2 items-center" data-aos="fade-left" data-aos-duration="2000">
            <Image
            src="/images/logo2.jpg"
            width={50}
            height={50}
            alt="Promptopia Logo"
            className="object-contain"/><p className="logo_text">Promptopia</p>
          </Link>

          {/* Div B */}
          <div className="flex" data-aos="fade-right" data-aos-duration="2000">
            {/* sign up normally */}
            <Link href={"/register"}>
              <button type="button" className="black_btn flex items-center justify-center gap-2 shake">
                <p className=""><FaUser /></p>
                <p className="text-[14px]">Register</p>
              </button>
            </Link>
          </div>

        </nav>

        {/* hero section */}
        <div data-aos="zoom-in-up" data-aos-duration="2000">
          <h1 className="head_text text-center"> {text}
            <br className="max-md:hidden" />
            <span className="orange_gradient hidden:lg"> AI-Powered Prompts</span>
          </h1>

          <p className="desc tect-center">
            Promptopia is an open-source AI prompting tool for modern world to
            discover, create and share creative prompts.
          </p>
        </div>

        {/* weather section */}

        <Link href={'/weatherapp'}>
          <div className="absolute right-[3rem]  bottom-4 cursor-pointer rounded-full text-5xl text-yellow-400"><TiWeatherPartlySunny /></div>
        </Link>

        
      </div>
      </section>
    );
  }

export default Home;
