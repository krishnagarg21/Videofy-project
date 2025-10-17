import { ConnectToDB } from "@/lib/db";
import User from "@/models/User";
import { NextRequest, NextResponse } from "next/server";

//typeScript mei baceknd ki calls ts se save hoti hai and  frontend ki files tsx se save hoti hai


export async function POST(request: NextRequest){
    try {
        const {email, password} = await request.json();
        if(!email || !password){
            return NextResponse.json(
                {error: "Emaiil or Password is required"},
                {status: 400}
            )
        }

        //check exsting user
       await ConnectToDB()
       const existingUser =  await User.findOne({email})
       if(existingUser){
            if(!email || !password){
                return NextResponse.json(
                    {error: "User already exists!!!!"},
                    {status: 400}
                )
            }
       }

        await User.create({
            email,
            password
        })

        return NextResponse.json(
            {message: "User Registered Successfully"},
            {status: 400}
        )

    } catch (error) {
        console.log("Registeration failed!!", error);
        return NextResponse.json(
            {error: "Failed to register user"},
            {status: 400}
        )
    }
}