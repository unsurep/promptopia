import registerModel from "@/models/register";
import { NextResponse } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";
import bcrypt from 'bcrypt'


export const POST =async (res, req) => {

    try {
        // first, the backend would receive incoming data from the frontend
        const {email, password} = await res.json();

        // then it would establish a connection to mongoose DB by callin it
        await dbConnect();

        // it would check mongoose db if incoming data match with what was keyed in 
        const user = await registerModel.findOne ({email:email});

        if (!user) {
            return new NextResponse(JSON.stringify({msg:'invalid credentials'}), {status:401});
        }

        // getting the hashed password stroed in DB
        const hashedPassword = user.password

        // verify if the password is a match
        const passwordTrue = bcrypt.compareSync(password, hashedPassword);

        if (!passwordTrue) {
            return new NextResponse(JSON.stringify({msg:'invalid credentials'}), {status:401})
        }

        else return new NextResponse(JSON.stringify({msg:'user logged in'}), {status:200});
   
    } catch (error) {
        console.log(error.message)
        return new NextResponse(JSON.stringify({msg:'server eror'}), {status:500})
        
    }

    
}