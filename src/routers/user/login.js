const express = require('express')
const bcrypt = require('bcrypt')
const login = new express.Router()
const User = require('../../models/UserModel')

login.post('/', async (req, res) => {
    if(req.body.userPhone && req.body.userPass){
        try {
            const getUser = await User.findOne({userPhone: req.body.userPhone})
            if(!getUser){return res.status(404).send({Error: "user not found!"})}
            const isMatch = await bcrypt.compare(req.body.userPass, getUser.userPass)
            if(!isMatch) {return res.status(403).send({Error: "access forbidden!"})}
            res.send({token: getUser.userToken})
        }catch(e){
            res.status(500).send({Error: "Server Error"})
        }
    }
    res.status(400).send({Error: "bad request!"})
})

module.exports = login