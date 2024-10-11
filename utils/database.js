import mongoose from "mongoose";

let isConnected=false;

export const connectToDB= async()=>{
    mongoose.set('strictQuery', true);
    
    if(isConnected){
        console.log("MongoDB is already connected!");
        return;
    }
    else{
        try{
            await mongoose.connect(process.env.MONGODB_URI, {
                dbName:'promptoverflow',
                useNewUrlParser: true,
                useUnifiedTopology: true
            })

            isConnected=true;
            console.log("MongoDB Connected Established.");
    
        }
        catch(error){
            console.error(error)
        }
    }
}
