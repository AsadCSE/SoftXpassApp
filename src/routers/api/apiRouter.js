const express = require('express')
const errorRouter = require('../error/error')
const userRouter = require('../user/userRouter')
const vaultRouter = require('../vault/vaultRouter')

const apiRouter = new express.Router()

apiRouter.use('/user', userRouter)
apiRouter.use('/vault', vaultRouter)
apiRouter.use('*', errorRouter)

module.exports = apiRouter