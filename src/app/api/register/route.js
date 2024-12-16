import { dbConnect } from '@/utilities/dbConnect';
import registerModel from '@/models/register';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(request) {
  try {
    // Handle CORS preflight request
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        },
      });
    }

    // Receiving incoming data from the frontend
    const { name, email, password } = await request.json();

    // Connecting to the database
    await dbConnect();

    // Prevent duplicate user registration
    const userExists = await registerModel.findOne({ email });
    if (userExists) {
      return new NextResponse(
        JSON.stringify({ msg: 'User already exists' }),
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    // Hashing the password with salt and bcrypt
    const salt = await bcrypt.genSalt(16);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Storing user data with the hashed password
    const user = new registerModel({ name, email, password: hashedPassword });
    await user.save();

    if (!user) {
      return new NextResponse(
        JSON.stringify({ msg: 'User not created' }),
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      );
    }

    return new NextResponse(
      JSON.stringify({ msg: 'User created successfully' }),
      { status: 201, headers: { 'Access-Control-Allow-Origin': '*' } }
    );

  } catch (error) {
    console.error(error.message);
    return new NextResponse(
      JSON.stringify({ msg: 'Server error!' }),
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    );
  }
}
