import Post from "../models/post.model.js";


export const create = async (req, res, next) => {
    if(!req.body.title || !req.body.content) {
        return res.status(400).json("Please provide all required fields");
    }
    const slug = req.body.title.toLowerCase().split(' ').join('-').replace(/[^a-zA-Z0-9-]/g, '');
    const newPost = new Post({
        ...req.body,
        slug,
        userId: req.body.userId
    });
    try {
        const savedPost = await newPost.save();
        return res.status(201).json(savedPost);
    } catch (error) {
        return res.status(400).json({message: error.message});
        console.log(error);
    }
    
}