import mongoose from "mongoose";
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST= async(req)=>{
    const {userId, prompt, tag}= await req.json();
    try {
        await connectToDB();
        const newPrompt=await Prompt.create({
            prompt: prompt, 
            tag: tag,
            creator: userId
        })
        console.log(newPrompt);
        return new Response(JSON.stringify(newPrompt), {status:201})

    } catch (error) {
        console.error(error);
    }
}