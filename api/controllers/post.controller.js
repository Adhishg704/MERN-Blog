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
        console.log(error);
        return res.status(400).json({message: error.message});
    } 
}


export const getPosts = async (req, res, next) => {
    const startIndex = req.query.startIndex || 0;
    const limit = req.query.limit || 9;
    const sortDirection = req.query.order === "asc"? 1: -1;
    const posts = await Post.find({
        ...req.query.userId && {userId: req.query.userId},
        ...req.query.category && {category: req.query.category},
        ...req.query.slug && {slug: req.query.slug},
        ...req.query.searchTerm && {
            $or: [
                {title: {$regex: req.query.searchTerm, $options: 'i'}},
                {content: {$regex: req.query.searchTerm, $options: 'i'}}
            ]
        }
    }).sort({updatedAt: sortDirection}).skip(startIndex).limit(limit);
    const totalPosts = await Post.countDocuments();
    const now = new Date();
    const oneMonthAgo = new Date(
        now.getFullYear(),
        now.getMonth() - 1,
        now.getDate()
    );
    const lastMonthPosts = await Post.countDocuments({
        updatedAt: {$gte: oneMonthAgo}
    });
    return res.status(200).json({
        posts,
        totalPosts,
        lastMonthPosts
    });
}


export const deletePost = async (req, res, next) => {
    if (req.query.userId !== req.query.postUserId) {
        return res.status(400).json("You are not allowed to delete the post")
    }
    try {
        await Post.findByIdAndDelete(req.query.postId);
        return res.status(200).json("Post has been deleted successfully");
    } catch (error) {
        console.log(error.message);
    }
}
