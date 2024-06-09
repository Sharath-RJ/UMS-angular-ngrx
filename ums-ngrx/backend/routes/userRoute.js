const userRoute = require('express').Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const uplaod = require('../config/multer')
const env=require('dotenv');

userRoute.post('/register', async (req, res) => {
    const { name, email, password } = req.body
    const salt = await bcrypt.genSalt(10)
    const hashedPass = await bcrypt.hash(password, salt)
    const isUserExist = await User.findOne({ email })
    if (isUserExist) {
        return res.status(400).send({ message: "Email already exist" })
    } else {
        await new User({
            name,
            email,
            password: hashedPass
        }).save()
        res.send({
            message:'Success'
        })

    }
})


userRoute.post("/login", async (req, res) => {
    const { email, password } = req.body
    const userData = await User.findOne({email, isAdmin: false }) 
    if(!userData){
        return res.status(404).send({ message: 'User not found' })
    }
    if(!(await bcrypt.compare(password, userData.password))){
        console.log('Password didnt match');
        return res.status(400).send({ message: 'Password is Incorrect' })
    }

    const token = jwt.sign({_id: userData._id},"1a2b3c4d5e6f7g8h9i0jA1B2C3D4E5F6G7H8I9J0K")
    res.cookie('jwt',token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000     // 24 hours
    })

    res.send({ message : 'Success' })
})

userRoute.get('/profile',async (req, res) => {
    try {
        console.log('On profile controller');
        const token = req.cookies['jwt']
        console.log(req.cookies);
        const claims = jwt.verify(token,"1a2b3c4d5e6f7g8h9i0jA1B2C3D4E5F6G7H8I9J0K")
        if(!claims) return res.status(401).send( { message: 'Unauthenticated' })

        const userData = await User.findOne({ _id: claims._id })
        const { password,...data } = userData.toJSON()
        console.log(data);
        res.send(data)

    } catch (error) {
        console.log(error);
    }
})


userRoute.post('/profile-upload-single',uplaod.single('image'), async(req, res) => {
    try {
        console.log('upload controller');
        const cookie = req.cookies['jwt'];
        const claims = jwt.verify(cookie,"1a2b3c4d5e6f7g8h9i0jA1B2C3D4E5F6G7H8I9J0K")
        if(!claims) return res.status(401).send({ message: 'Unauthenticated' })

        const updateImg = await User.updateOne(
            {_id: claims._id},
            {
                $set:{
                    image: req.file.filename
                }
            }
        );

        if(!updateImg) return res.status(401).json({ message: "Something went wrong!" })
        return res.status(200).json({ message: 'Image Uploaded Successfully' })

    } catch (error) {
        console.log(error);
    }
})

userRoute.post('/logout', async( req, res) => {
    console.log('logging out');
    res.cookie('jwt','',{maxAge:0})
    res.send({ message : 'Logged Out' })
})

userRoute.post('/', async( req, res) => {
    console.log('user',req.headers);
    // res.cookie('jwt','',{maxAge:0})
    // res.send({ message : 'Logged Out' })
})

module.exports = userRoute