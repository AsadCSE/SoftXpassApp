const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')

const readUser = new express.Router()

readUser.get('/', async (req, res) => {
    if(req.headers.bearer){
        const {data} = jwt.verify(req.headers.bearer, process.env.JWTSECRET)
        const user = await User.findOne({_id: data})
        if(!user){return res.status(404).send()}
        return res.send(JSON.stringify({userPhone: user.userPhone}))
    }
    res.status(400).send()
})

module.exports = readUser