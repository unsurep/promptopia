// "use client";

// import Image from "next/image";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { signIn, signOut, getProviders, useSession } from "next-auth/react";
// import { FcGoogle } from "react-icons/fc";
// import { FaUser } from "react-icons/fa6";

// const Navbar = () => {
 

//   return (
//     <nav className="flex-between w-full px-[1rem] pt-[1rem]  ">
//       {/* Logo Section */}
//       <Link href="/" className="flex gap-2 items-center">
//         <Image
//           src="/images/logo2.jpg"
//           width={50}
//           height={50}
//           alt="Promptopia Logo"
//           className="object-contain"
//         />
//         <p className="logo_text">Promptopia</p>
//       </Link>

    
//       <div className="flex ">
//         {/* sign up normally */}
//         <Link href={"/register"}>
//           <button type="button" className="black_btn flex items-center justify-center gap-1">
//             {/* <span className="md:pr-2"><FaUser className="w-fit" /></span><span className="text-[10px]">Register</span> */}
//             <p className=""><FaUser /></p>
//             <p className="text-base">Register</p>
//           </button>
//         </Link>
//       </div>

      
//     </nav>
//   );
// };

// export default Navbar;
