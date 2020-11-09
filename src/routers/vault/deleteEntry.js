const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../../models/UserModel')

const deleteEntry = new express.Router()

deleteEntry.post('/', async (req, res) => {
    if(req.headers.bearer && req.body.deleteId){
        jwt.verify(req.headers.bearer, process.env.JWTSECRET, async (err, data) => {
            if(err) {return res.status(406).send()}
            try {
                const user = await User.findOne({_id: data.data})
                if(!user) {return res.status(404).send()}
                const entries = user.userVault.filter((entry) => entry._id == req.body.deleteId ? false : true)
                await User.findOneAndUpdate({_id: data.data}, {userVault: entries})
                res.send()
            }catch(e) {
                res.status(500).send()
            }
        })
    }else{
        res.status(400).send()
    }
})

module.exports = deleteEntry