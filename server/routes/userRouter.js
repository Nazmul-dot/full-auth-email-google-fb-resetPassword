const express = require('express')
const router = express.Router();
const USER = require('../models/userShcema')
const bcrypt = require('bcryptjs');
const auth = require('../middleware/auth');
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const fetch = require('node-fetch')
var nodemailer = require('nodemailer');
//for sending email
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'shakil01621154843@gmail.com',
        pass: '01621154843'
    }
});
//for google login
const client = new OAuth2Client('230599958091-ssvq3h8e45q8ldh78tpadp6mcbl56i19.apps.googleusercontent.com');
//registration
router.post('/register', async (req, res) => {
    console.log(req.body)
    const { name, email, password, conferm_password } = req.body
    try {
        if (!name || !email || !password || !conferm_password) {
            return res.status(422).json({ error1: 'fill all the field' })
        }
        const check = await USER.findOne({ email: email })
        if (check) {
            return res.status(422).json({ error: 'email already exist' })
        } else {
            const token = jwt.sign({ name, email, password }, process.env.KEY, {
                expiresIn: '5m'
            })
            //email data sending
            var mailOptions = {
                from: 'shakil01621154843@gmail.com',
                to: email,
                subject: 'Sending Email using Node.js',
                html: `
                <h1>Please use the following to activate your account</h1>
                <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
                <hr />
                <p>This email may containe sensetive information</p>
                <p>${process.env.CLIENT_URL}</p>
            `
            };
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });
        }
    } catch (error) {
        return res.status(422).json({ error3: 'registration failed' })
    }
})

//activation on realtime gmail id
router.post('/activation', async (req, res) => {
    try {
        const { token } = req.body
        const { name, email, password } = jwt.verify(token, process.env.KEY)
        res.cookie('jwtToken', token)
        const docu = new USER({ name, email, password, token })
        const result = await docu.save();
        console.log(result)
    } catch (error) {
        console.log(error)
    }

})
// get email for reset password
router.post('/getemail', async (req, res) => {
    console.log(req.body)
    const { email } = req.body
    const isemail = await USER.findOne({ email: email })
    if (isemail) {
        console.log(email)
        const token = jwt.sign({ _id: isemail._id }, process.env.KEY, {
            expiresIn: '5m'
        })
        var mailOptions = {
            from: 'shakil01621154843@gmail.com',
            to: email,
            subject: 'for reset password',
            html: `
            <h1>click the link to reset password</h1>
            <p>${process.env.CLIENT_URL}/users/resetpass/${token}</p>
            <hr />
            <p>This email may containe sensetive information</p>
            <p>${process.env.CLIENT_URL}</p>
        `
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    }
})
//reset password
router.post('/resetpassword', async (req, res) => {
    try {
        var { password, comfirm_password, token } = req.body;
        console.log(req.body)
        if (password === comfirm_password) {
            var { _id } = jwt.verify(token, process.env.KEY)
            var user = await USER.findOne({ _id: _id })
            if (user) {
                password = await bcrypt.hash(password, 10);
                console.log(password)
                // console.log(user.password)
                const result = await USER.findByIdAndUpdate(_id, { password: password }, { new: true })
                console.log(result)
            }
        }
    } catch (error) {
        console.log(error)
    }

})
//login
router.post('/login', async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body
    try {
        if (!email || !password) {
            return res.status(422).json({ error1: 'fill all the field' })
        }
        const userSignin = await USER.findOne({ email: email })
        console.log(userSignin)
        if (userSignin) {
            const ismatch = await bcrypt.compare(password, userSignin.password)
            if (ismatch) {
                const token = await userSignin.tokengenaration()
                console.log(token)
                res.cookie('jwtToken', token)
                console.log("user signin successfully")
                await userSignin.save();
                res.json(userSignin)
            } else {
                return res.status(422).json({ error: 'credential......' })
            }
        } else {
            return res.status(422).json({ error: 'credential......' })
        }

    } catch (error) {
        return res.status(422).json({ error3: 'login failed failed' })
    }
})
//login with google
router.post('/googlelogin', async (req, res) => {
    // console.log(req.body)
    try {
        const { tokenId } = req.body;
        const response = await client.verifyIdToken({ idToken: tokenId, audience: '230599958091-ssvq3h8e45q8ldh78tpadp6mcbl56i19.apps.googleusercontent.com' })
        const { email_verified, email, name } = response.payload;
        // console.log(email_verified, email, name)
        if (email_verified) {
            const user = await USER.findOne({ email: email })
            if (user) {
                const token = await user.tokengenaration()
                console.log(token)
                res.cookie('jwtToken', token)
                await user.save();
                res.json(user)
            } else {
                var password = email + process.env.KEY;
                const googleuser = new USER({ name, email, password })
                const token = await googleuser.tokengenaration()
                console.log(token)
                res.cookie('jwtToken', token)
                const result = await googleuser.save();
                res.json(result)
            }
        }

    } catch (error) {
        res.status(404).json({ message: error })
    }

})

// login with facebook
router.post('/facebooklogin', async (req, res) => {
    try {
        const { userID, accessToken } = req.body
        // console.log(userID,accessToken)
        const url = `https://graph.facebook.com/v2.11/${userID}/?fields=id,name,email&access_token=${accessToken}`;
        var responce = await fetch(url);
        responce = await responce.json();
        const { name, email } = responce;
        const user = await USER.findOne({ email: email })
        if (user) {
            const token = await user.tokengenaration()
            console.log(token)
            res.cookie('jwtToken', token)
            await user.save();
            res.json(user)
        } else {
            var password = email + process.env.KEY;
            const googleuser = new USER({ name, email, password })
            const token = await googleuser.tokengenaration()
            console.log(token)
            res.cookie('jwtToken', token)
            const result = await googleuser.save();
            res.json(result)
        }
    } catch (error) {
        res.status(402).json({ message: error })
    }
})
//user logged
router.get('/logged', auth, (req, res) => {
    console.log('logged')
    res.json(req.user)
})
//logout
router.get('/logout', auth, async (req, res) => {
    try {
        res.clearCookie('jwtToken')
        // req.user.token = []
        // const result = await req.user.save()
        // console.log(result)
        const result = await USER.findByIdAndUpdate(req.user._id, { token: '' }, { new: true })
        console.log(result)
        res.json(true)
    } catch (error) {
        console.log(error)
        res.status(404).json({ message: error })
    }

})

module.exports = router