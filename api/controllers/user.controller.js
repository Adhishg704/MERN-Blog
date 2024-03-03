import bcryptjs from "bcryptjs";
import User from "../models/user.model.js";

export const test = (req, res) => {
  res.json({ message: "API is working" });
};

export const update = async (req, res, next) => {
  if (req.user.id !== req.params.userId) {
    return res.status(401).json({ errors: "Unauthorized" });
  }
  if (req.body.password) {
    if (req.body.password.length < 6) {
      return res
        .status(400)
        .json({ errors: "Password must be at least 6 characters" });
    }
    req.body.password = bcryptjs.hashSync(req.body.password, 10);
  }
  if (req.body.username) {
    if (req.body.username.length < 3 || req.body.username > 20) {
      return res
        .status(400)
        .json({ errors: "Username must be between 3 and 20 characters" });
    }
    if (req.body.username !== req.body.username.toLowerCase()) {
      return res.status(400).json({ errors: "Username must be lowercase" });
    }
    if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
      return res.status(400).json({ errors: "Username must be lowercase" });
    }
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    );
    const { password: pass, ...rest } = updatedUser._doc;
    return res.status(200).json(rest);
  } catch (err) {
    return res.status(400).json({ errors: "Cannot find user" });
  }
};
