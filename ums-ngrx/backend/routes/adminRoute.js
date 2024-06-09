
const adminRouter = require('express').Router()
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
require('dotenv').config()

console.log('On admin route');

adminRouter.post('/login', async (req, res) => {
    try {
        console.log('in admin login controller');
        const adminData = await User.findOne({ email: req.body.email, isAdmin: true });
        if (!adminData) {
            return res.status(400).send({ message: 'This admin not exist' })
        }
        if (!(await bcrypt.compare(req.body.password, adminData.password))) {
            return res.status(400).send({
                message: "Password is Incorrect"
            })
        }

        console.log('verifying jwt');

        const token = jwt.sign({ _id: adminData._id },"1a2b3c4d5e6f7g8h9i0jA1B2C3D4E5F6G7H8I9J0K");
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        });

        console.log('sending response success');
        res.send({ message: 'Success' });

    } catch (error) {
        console.log(error);
    }
})

adminRouter.post('/logout', async (req, res) => {
    try {
        console.log('logging out');
        res.cookie('jwt', '', { maxAge: 0 });
        res.send({ message: 'Logout Success' })
    } catch (error) {
        console.log(error);
    }
})

adminRouter.get('/active', async (req, res) => {
    try {
        const id = req.params.id; console.log(id);
        const cookie = req.cookies["jwt"];
        const claims = jwt.verify(cookie,"1a2b3c4d5e6f7g8h9i0jA1B2C3D4E5F6G7H8I9J0K")
        if (!claims) {
            return res.status(401).send({ message: "Unautherized :(" })
        }

        const user = await User.findOne({ _id: claims._id, isAdmin: true });
        const { password, ...data } = user.toJSON(); console.log(user);
        // console.log(data);
        res.send(data);

    } catch (error) {
        return res.status(401).send({ message: "unauthenticated" })
    }
})

adminRouter.get('/usersList', async (req, res) => {
    try {
        console.log('in Users list controller');
        const users = await User.find()
        // console.log(users);
        res.send(users)
    } catch (error) {
        console.log(error)
        res.status(500).send('Internal Server Error');
    }
})

adminRouter.post('/deleteUser/:id', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete({ _id: req.params.id })
        if (!deletedUser) return res.send({ message: 'Something went wrong' })
        res.send(deletedUser);
    } catch (error) {
        console.log(error);
    }
})

adminRouter.get('/getUser/:user_id', async (req, res) => {
    try {console.log(req.params.user_id);
        const userData = await User.findById({ _id:req.params.user_id});
        if (!userData) return res.send({ message: 'Something went wrong' })
        const { password, ...data } = userData.toJSON();
        res.send(data);
    } catch (error) {
        console.log(error);
    }
})

adminRouter.post('/editUser', async (req, res) => {
    try {
        console.log(req.body,);
        const { name, userId } = req.body;
        const _id = req.body.userId
        const userData = await User.updateOne({ _id }, { $set: { name } });
        if (!userData) return res.send({ message: 'Something went wrong' })
        else console.log(userData);
        return res.send({ message: 'Success' })
    } catch (error) {
        console.log(error);
    }
})

adminRouter.post('/createUser', async (req, res) => {
    try {
        const { email, password, name } = req.body;
        console.log(req.body);

        const isEmailExist = await User.findOne({ email });
        if (isEmailExist) {
            return res.status(400).send({ message: 'Email already registered' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPass = await bcrypt.hash(password, salt)

        await new User({ name, email, password: hashedPass }).save()
        res.send({ message: 'Success' })

    } catch (error) {
        console.log(error);
    }
})

adminRouter.post('/', async( req, res) => {
    console.log('ADMIN router');
    
})


try {
    
} catch (error) {
    
}

module.exports = adminRouter;