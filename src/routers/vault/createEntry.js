const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')

const createEntry = new express.Router()

createEntry.post('/', async (req, res) => {
    if(!!req.headers.bearer && req.body.siteNote.length < 101){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send({Error: "not acceptable!"})}
            try {
                const user = await User.findOne({_id: data.data})
                let userVault = user.userVault
                userVault.push({
                    site: req.body.site,
                    siteLogin: req.body.siteLogin,
                    sitePass: req.body.sitePass,
                    siteNote: req.body.siteNote
                })
                await User.findOneAndUpdate({_id: user._id}, {userVault})
                res.send()
            }catch(e) {
                res.status(500).send({Error: "server error!"})
            }
        })
    }else{
        res.status(400).send({Error: "bad request!"})
    }
})

module.exports = createEntry