import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET=async(req, {params})=>{

    try {
        await connectToDB();

        const prompt=await Prompt.findById(params.id).populate('creator');

        // console.log(prompt);
        return new Response(JSON.stringify(prompt));
        
    } catch (error) {
        console.error("Error in fetching Post.", {status: 404})
    }

}

export const PATCH=async(req, {params})=>{
    const updatePrompt= await req.json();
    await connectToDB();
    try {
        const prompt=await Prompt.findById(params.id);
        prompt.tag=updatePrompt.tag;
        prompt.prompt=updatePrompt.prompt;

        await prompt.save();
        
        return new Response(JSON.stringify(prompt));
        
    } catch (error) {
        console.error("Error in updating prompt.", {status:400});
    }
    
}

export const DELETE=async(req, {params})=>{
    await connectToDB();

    try {
        const statusPrompt=await Prompt.findByIdAndDelete(params.id);
        return new Response("Prompt Deleted Successfully!");
        
    } catch (error) {
        console.error("Error in deleting prompt.");
    }
    
}