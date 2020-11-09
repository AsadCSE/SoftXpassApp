const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')

const readEntry = new express.Router()

readEntry.get('/', async (req, res) => {
    if(req.headers.bearer && req.body.readId){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send()}
            try {
                const user = await User.findOne({_id: data.data})
                if(!user) {return res.status(404).send()}
                const entries = user.userVault.filter((entry) => entry._id == req.body.readId ? true : false)
                res.send(JSON.stringify(entries[0]))
            }catch(e) {
                res.status(500).send()
            }
        })
    }else{
        res.status(400).send()
    }
})

module.exports = readEntry