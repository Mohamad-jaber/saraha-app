import { userModel } from "../../../DB/model/user.model.js";
import bcrypt from "bcrypt";

export const userProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    res.json({ message: "user page", user });
  } catch (error) {
    res.json({ meesage: "catch error", error });
  }
};

export const getShareProfile = async (req, res) => {
  const user = await userModel.findById(req.params.id).select("userName");
  res.json({ message: "success", user });
};

export const updatepassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await userModel.findById(req.user._id);
  const match = await bcrypt.compare(oldPassword, user.password);

  if (!match) {
    res.json({ message: "In-Valid Password" });
  } else {
    bcrypt.hash(newPassword, 8, async function (err, hash) {
      await userModel.findByIdAndUpdate({ _id: user._id }, { password: hash });
      res.json({ message: "success, password updated succesfully" });
    });
  }
};

export const profilePic = async (req, res) => {
  try {
    if (!req.file) {
      res.json({ message: "please upload your file " });
    } else {
      const image = req.file.destination + "/" + req.file.filename;
      await userModel.updateOne({ _id: req.user._id }, { profilePic: image });
      res.status(200).json({ message: "done", image });
    }
  } catch (error) {
    res.status(500).json({});
  }
};
