import { dbConnect } from "@/utilities/dbConnect";
import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";


export const GET = async (request) => {
    try {
        await dbConnect();

        const prompts = await Prompt.find({}).populate
        ('creator');

        return new NextResponse(JSON.stringify(prompts), {status:200})
        
    }
    
    
    catch (error) {
        return new NextResponse (JSON.stringify({msg:'server error! Failed to fetch prompt'}), {status:500});
        
    }
    
}