const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userPhone: {
        type: String,
        unique: true,
        required: true
    },
    userPass: {
        type: String
    },
    userVault: [{
        site: {
            type: String
        },
        siteLogin: {
            type: String
        },
        sitePass: {
            type: String
        }
    },{
        timestamps: true
    }],
    userToken: {
        type: String
    }
},{
    timestamps: true
})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel