
import mongoose from "mongoose";


type MongooseCache = {
    conn: typeof mongoose | null;
    promise: Promise<typeof mongoose> | null;
}

declare global {
    var mongoose : MongooseCache | undefined;
}

const MONGODB_URI = process.env.MONGODB_URI;

let cached: MongooseCache = global.mongoose || {conn: null, promise: null}

if(!global.mongoose) {
    global.mongoose =  cached;
}


const connectDb = async():Promise<typeof mongoose> => {

    if(cached.conn){
        return cached.conn;
    }

    if(!cached.promise) {
        if(!MONGODB_URI){
            throw new Error("The Mongo connection string is undefined in the .env local file.");
        }

          const options = {
             bufferCommands: false, // Disable Mongoose buffering
        };

                    cached.promise = mongoose.connect(MONGODB_URI, options);
    }

    try{
        cached.conn = await cached.promise;
    }catch(err){
        console.log(err);
        throw err;
    }

    return cached.conn!;
}

export default connectDb;