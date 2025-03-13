import User from "../model/Users.js"
import bcrypt from 'bcrypt'
import generateCookie from "../library/generateCookie.js"
import cloudinary from 'cloudinary'


export const RegisterUser = async (req, res) => {

    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({ error: 'username and password required.' })

    const userExist = await User.findOne({ username })


    if (userExist) return res.status(400).json({ error: 'username already exist.' })
    if (password.length < 6) return res.status(400).json({ error: 'password must be 6 characters long.' })

    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(password, salt)

    const newUser = new User({ username: username, password: hashPassword })
    newUser.save()

    res.status(200).json({ success: `${username} created` })
}

export const LoginUser = async (req, res) => {
    const { username, password } = req.body

    if (!username || !password) return res.status(400).json({ error: 'username and password required.' })

    const user = await User.findOne({ username })
    if (!user) return res.status(400).json({ error: 'user does not exist.' })

    const isMatched = await bcrypt.compare(password, user.password)
    if (!isMatched) return res.status(400).json({ error: 'password does not match.' })


    generateCookie(user._id, res)

    res.status(200).json(user);
}

export const LogoutUser = async (req, res) => {
    res.cookie('jwt', '', {
        maxAge: 0,
        httpOnly: 'false', //False pag production
        secure: 'true',
        sameSite: 'none'
    })

    res.status(200).json({ success: 'successfully logout.' })
}

export const updateUser = async (req, res) => {
    try {
        let user = req.user._id

        let { username, profile } = req.body

        let currentUser = await User.findById(user)

        if (username) {
            if (username !== currentUser.username) {
                let usernameExist = await User.findOne({ username })
                if (usernameExist) return res.status(400).json({ error: 'username is already taken.' })

                currentUser.username = username;
            }
        }

        if (profile) {
            if (currentUser?.profile) {
                await cloudinary.uploader.destroy(currentUser.profile.split('/').pop().split('.')[0]) // to destroy old image
            }

            try {
                const uploadResponse = await cloudinary.uploader.upload(profile)
                currentUser.profile = uploadResponse.secure_url

            } catch (error) {
                console.log(`error in cloudinary : ${error}`)
            }
        }

        await currentUser.save()

        res.status(200).json(currentUser)
    } catch (error) {
        console.log(error.message)
        return res.status(500).json({ error: 'Internal server error' })
    }
}

export const getMe = async (req, res) => {
    res.status(200).json(req.user)
}

