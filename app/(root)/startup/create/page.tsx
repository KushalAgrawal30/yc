import StartupForm from "@/components/StartupForm";
import React from "react";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Create = async () => {

    const session = await auth() 
    console.log(session?.user?.name)

    if(!session) redirect('/') 

    return(
        <>
        <section className="pink_container !min-h-[230px]">
            <h1 className="heading">Submit YOUR STARTUP PITCH</h1>
        </section>

        <StartupForm/>
        </>
    )
}

export default Create;