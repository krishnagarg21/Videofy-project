import mongoose from "mongoose";

const mongoDB_url = process.env.MONGODB_URL!;

if(!mongoDB_url){
    throw new Error("Please define MONGODB_URL in env variables")
}

let cached = global.mongoose;

if(!cached){
    cached = global.mongoose = {conn: null, promise: null};
}

export async function ConnectToDB() {
    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise){
       cached.promise =  mongoose.connect(mongoDB_url).then(() => mongoose.connection)
    }

    try {
        cached.conn = await cached.promise;
    } catch (error) {

        cached.promise = null;
        throw error;
    }


    return cached.conn;
}