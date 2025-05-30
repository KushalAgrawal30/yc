"use server"

import { auth } from "@/auth"
import { writeClient } from "@/sanity/lib/write-client";
import slugify from 'slugify'


export const createPitch = async (state: any, form: FormData, Pitch: string) => {
    const session = await auth();

    if(!session){
        return JSON.parse(JSON.stringify({ error: 'Not signed in', status: 'Error'}))
    }
    const { title, description, category, link } = Object.fromEntries(
        Array.from(form).filter(([key]) => key !== 'pitch')
    )

    const slug = slugify(title as string, {lower: true, strict: true})

    try{
        const startup = {
            title, 
            description, 
            category, 
            image: link,
            slug: {
                _type: slug,
                current: slug
            },
            author: {
                _type: 'reference',
                _ref: session?.id
            },
            Pitch
        }

        const result = await writeClient.create({ _type: "startup" , ...startup})

        return JSON.parse(JSON.stringify({...result, error: '', status: 'SUCCESS'}))

    }catch(error){
        console.log(error)

        return JSON.parse(JSON.stringify({ error: JSON.stringify(error), status: 'Error'}))
    }
    
}