import { messageModel } from "../../../DB/model/message.model.js";
import { userModel } from "../../../DB/model/user.model.js";

export const sendMessage = async (req, res) => {
  try {
    const { userId } = req.params;
    const { text } = req.body;
    const user = await userModel.findById(userId).select("userName");
    if (!user) {
      res.json({ message: "invalid reciver id" });
    } else {
      const newMessage = new messageModel({ text, reciverId: userId });
      const savedMessage = await newMessage.save();
      res.json({ message: "success ", savedMessage });
    }
  } catch (error) {
    res.json({ message: "catch error", error });
  }
};

export const myMessages = async (req, res) => {
  try {
    const messageList = await messageModel.find({ reciverId: req.user._id });
    res.json({ message: "success", messageList });
  } catch (error) {
    res.json({ message: "error" });
  }
};
export const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await messageModel.deleteOne({
      reciverId: req.user._id,
      _id: id,
    });
    if (message.deletedCount) {
      res.json({ message: "success" });
    } else {
      res.json({ message: "invalid delete message" });
    }
  } catch (error) {
    res.json(error);
  }
};
