//! rotas de autenticação (registro, login)

import express from 'express'
import { registerUser, loginUser } from '../controllers/authController.js'

const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)


export default router

