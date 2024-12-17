import { dbConnect } from "@/utilities/dbConnect";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";


export const POST = async (req, res) => {
    const {userId, prompt, tag} = await req.json();

    try { 
        await dbConnect();
        const newPrompt = new Prompt ({
        creator: userId,
        prompt,
        tag
    })

    await newPrompt.save();

    return new NextResponse(JSON.stringify(newPrompt), {status:201})
        
    } 
    
    catch (error) {
        return new NextResponse (JSON.stringify({msg:'server error! Failed to create a new prompt'}), {status:500});   
    }
  
};

