const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')
const readEntries = new express.Router()

readEntries.get('/', async (req, res) => {
    if(req.headers.bearer){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send()}
            try {
                const user = await User.findOne({_id: data.data})
                if(!user) {return res.status(404).send()}
                res.send(JSON.stringify(user.userVault))
            }catch(e) {
                res.status(500).send()
            }
        })
    }else{
        res.status(400).send()
    }
})

module.exports = readEntries