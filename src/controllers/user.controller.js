import User from "../models/user.model.js";

export const createUser = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(201).json({ message: "User already exists." });
    }
    const result = await User.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
