import registerModel from "@/models/register";
import { NextResponse } from "next/server";
import { dbConnect } from "@/utilities/dbConnect";
import bcrypt from 'bcrypt'

export const POST = async (res, req) => {
    try {
        // taking incoming data from the frontend
        const {email, password} = await res.json();

        // calling database connection
        await dbConnect();

        // checking database if the incoming data is a match
        const user = await registerModel.findOne({email:email});
        
        if (!user) {
            return new NextResponse(JSON.stringify({msg:'invaild credential'}), {status:401});
        }

        // getting the hasedpassword stored in the database
        const hashedPassword = user.password

        // verify if the password is a match
        const passwordTrue = bcrypt.compareSync(password, hashedPassword)

        if (!passwordTrue) {
            return new NextResponse(JSON.stringify({msg:'invalid credentials'}), {status:401});

        }

        else return new NextResponse(JSON.stringify({msg:'user logged in'}), {status:200});


    } catch (error) {
        console.log(error.message) 
        return new NextResponse(JSON.stringif({msg:'server error'}), {status:500});
        
    }










    
}