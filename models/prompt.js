import { model, models, Schema } from "mongoose";

const PromptSchema= new Schema({
    prompt:{
        type: String,
        required: [true,"Prompt is required!"]
    },
    tag:{
        type: String,
    },
    creator: {
        type: Schema.Types.ObjectId,
        required: [true, "Please Provide Creator ID!"],
        ref: "User",
    }
    
})

const Prompt= models.Prompt || model('Prompt', PromptSchema);

export default Prompt;