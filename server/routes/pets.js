import express from 'express'
import { listarPets } from '../controllers/petsController.js'

const router = express.Router()

router.get('/', listarPets)

export default router
