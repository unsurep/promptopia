import { dbConnect } from '@/utilities/dbConnect';
import registerModel from '@/models/register'
import { NextResponse } from 'next/server'
import bcrypt from 'bcrypt'

export const POST = async (res) => {
    try {
        // backend receiving incoming data from frontend
    const {name, email, password} = await res.json();

    // connecting to DB
    await dbConnect();

    // preventing user not to register twice
    const userExists = await registerModel.findOne ({email:email});
    if (userExists) {
        return new NextResponse(JSON.stringify({msg:'user already exists'}), {status:200});
    }

    // hashing of password with salt and bcrypt for security reasons 
    const salt = bcrypt.genSaltSync(16);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // Here we want to store the vales of the hashed password
    const user = new registerModel ({name, email, password:hashedPassword})
    await user.save();

    if (!user) {
        return new NextResponse (JSON.stringify({msg:'user not created'}), {status:400});
    }

    else return new NextResponse (JSON.stringify({msg:'user created successfully'}), {status:201});
        
    } catch (error) {
        console.log(error.message)
        return new NextResponse (JSON.stringify({msg:'server error!'}), {status:500});

        
    }
};
