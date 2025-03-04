import User from "../model/Users.js"
import Message from "../model/Message.js"
import { getReceiverSocketId, io } from "../library/socket.js"

export const usersForSidebar = async (req, res) => {
    try {
        const currentUser = req.user._id
        const filteredUsers = await User.find({ _id: { $ne: currentUser } }).select('-password')

        res.status(200).json(filteredUsers)

    } catch (error) {
        console.error(error.message)
        res.status(500).json({ error: 'Internal server error' })
    }
}

export const getMesseges = async (req, res) => {
    try {
        const { id: userToChatId } = req.params
        const myId = req.user._id

        const messages = await Message.find({
            $or: [
                { senderId: myId, receiverId: userToChatId },
                { senderId: userToChatId, receiverId: myId }
            ]
        })
            .populate('senderId', 'profile username')  // Only fetch the profile field
            .populate('receiverId', 'profile username');

        return res.status(200).json(messages)
    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ error: 'Internal server error.' })
    }
}

export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body
        const { id: receiverId } = req.params
        const senderId = req.user._id

        let imgUrl = ''

        // if (image) {
        //     const uploadResponse = await cloudinary.uploader.upload(image)
        //     imgUrl = uploadResponse.secure_url
        // }

        const newMessage = new Message({
            senderId,
            receiverId,
            text,
            image: imgUrl
        })

        await newMessage.save()

        // 🔥 Populate sender and receiver details
        const populatedMessage = await newMessage.populate([
            { path: "senderId", select: "profile username" },
            { path: "receiverId", select: "profile username" },
        ]);

        //todo: realtime functionality
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", populatedMessage);
        }

        res.status(201).json(populatedMessage);

    } catch (error) {
        console.error(error.message)
        return res.status(500).json({ erorr: 'Internal server error.' })
    }
}