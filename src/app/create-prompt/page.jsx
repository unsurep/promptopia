'use client'


import {useState} from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Form from "@/components/Form";
import axios from "axios";


import Link from "next/link";
import Image from "next/image";
import { IoCreateOutline } from "react-icons/io5";
import { GoSignOut } from "react-icons/go";

const CreatePrompt =()=>{
  const router = useRouter();
  

    const [submitting, setSubmitting]=useState(false);
    const [post, setPost]=useState({
        prompt:'',
        tag:'',

    });

    const createPrompt = async (e) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            // Making the API call using axios
            const response = await axios.post('/api/prompt/new', {
              prompt: post.prompt,
              tag: post.tag
            });
      
            // Handle successful response
            if (response.status === 201) {
              router.push('/home'); // Redirect to home page on success
            }
      
          } catch (error) {
            console.error("Error creating prompt:", error);
          } finally {
            setSubmitting(false); // Reset submitting state
          }




        
    };



    return (
        <>
        {/* NavBar */}
        <nav className="flex-between w-full px-[1rem]">
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
              <button type="button" className="bg-black py-2 px-3 md:py-2 md:px-4 text-white rounded-full hover:bg-white hover:text-black hover:border outline flex items-center justify-center gap-1 shake">
                {/* <p className=""><GoSignOut /></p> */}
                <p className="text-[12px] md:text-[14px] ">Create-Post</p>
                <p><IoCreateOutline /></p>
              </button>
            </Link>

            {/* signout button */}
            <Link href={""}>
              <button type="button" className="bg-black px-3 py-2 md:py-2 md:px-4 rounded-full text-white hover:bg-white hover:text-black hover:border outline flex items-center justify-center gap-1 shake">
                <p className="text-[12px] md:text-[14px]">Sign out</p>
                <p className=""><GoSignOut /></p>
              </button>
            </Link>

            {/* Profile Pic */}
          </div>
        </nav>

        <Form
         type="Create" 
         post={post}
         setPost={setPost}
         submitting={submitting}
         handleSubmit={createPrompt}
        
        />

        </>
        
    )



};

export default CreatePrompt;