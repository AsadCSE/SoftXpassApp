const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')

const create = new express.Router()

create.post('/', async (req, res) => {
    if(req.body.userPhone && req.body.userPass){
        try {
            const passCrypt = await bcrypt.hash(req.body.userPass, 3)
            const saveUser = new User({
                userPhone: req.body.userPhone,
                userPass: passCrypt
            })
            const token = jwt.sign({ data: saveUser._id }, process.env.JWTSECRET)
            saveUser.userToken = token
            const newUser = await saveUser.save()
            res.send({token: newUser.userToken})
        } catch(e) {
            return res.status(409).send({Error: "Phone already exists!"})
        }
    }else{
        res.status(400).send({Error: "bad request!"})
    }
})

module.exports = create