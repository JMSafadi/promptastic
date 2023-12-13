//  GET 
import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const GET = async(req, { params: { id } }) => {
  try {
    await connectToDB()

    const prompt = await Prompt.findById(id).populate('creator')
    if (!prompt) return new Response('Prompt not found', { status: 404 })

    return new Response(JSON.stringify(prompt), { status: 200 })

  } catch (error) {
    return new Response('Failed to fetch all prompts', { status: 500 })

  }
}

//  PATCH 
export const PATCH = async(req, { params: { id } }) => {
  const { prompt, tag, likes } = await req.json()

  try {
    await connectToDB()
    const existingPrompt = await Prompt.findById(id)

    if(!existingPrompt) return new Response('Prompt not found', { status: 404 })

    existingPrompt.prompt = prompt
    existingPrompt.tag = tag
    existingPrompt.likes = likes

    await existingPrompt.save()
    return new Response(JSON.stringify(existingPrompt), { status: 200 })

  } catch (error) {
    console.error(error)
    return new Response('Failed to update prompt', { status: 500 })
  }
}

//  DELETE 
export const DELETE = async(req, { params: { id } }) => {
  try {

    await connectToDB()

    await Prompt.findByIdAndRemove(id)
    return new Response('Prompt deleted successfully', { status: 200 })

  } catch (error) {
    console.error(error)
    return new Response('Failed to delete promt', { status: 500 })
    
  }
}
