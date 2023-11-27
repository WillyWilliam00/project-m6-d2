import express from "express"
import { BlogPost } from "../schemas/blogPosts.js"

const blogPosts = express.Router()

blogPosts.get("/", async (req, res) => {
    try {
        const blogPosts = await BlogPost.find({})
        res.json(blogPosts)
    }
    catch(error) {
        console.log(error)
        res.status(404).send()
    }
})

blogPosts.get("/:id", async (req, res) => {
    try{
        const {id} = req.params
        const blogPost = await BlogPost.findById(id)
        res.json(blogPost)
    }
    catch(error){
        console.log(error)
        res.status(404).send()
    }
})

blogPosts.post("/", async (req, res) => {
    try{
        const newBlogPost = new BlogPost(req.body)
        res.status(201).json(await newBlogPost.save())
    }
    catch(error){
        console.log(error)
        res.status(404).send()
    }
})

blogPosts.delete("/:id", async (req, res)=> {
    try{
        const {id} = req.params
        const blogPost = await BlogPost.findByIdAndRemove(id)
        !blogPost ? res.status(400).send() : res.status(204).send()
    }
    catch(error){
        console.log(error)
        res.status(404).send()
    }
})

blogPosts.put("/:id", async (req, res) => {
    try{
        const {id} = req.params
        const blogPostUp = await BlogPost.findByIdAndUpdate(id, req.body, {new: true})
        res.status(200).json(blogPostUp)
    }
    catch(error){
        console.log(error)
        res.status(404).send()
    }
})
export default blogPosts
