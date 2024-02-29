import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";

export const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcryptjs.hashSync(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const existingUser = await User.findOne({email});
        if(existingUser) {
            return res.status(401).json({errors: [{msg: "User already registered"}]});
        }
        await newUser.save();
        res.json("Signup successful");
    }
    catch(err) {
        console.log(err);
    }
}