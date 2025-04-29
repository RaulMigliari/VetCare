import express from 'express'
import { listarProntuariosPorPet, adicionarProntuario } from '../controllers/prontuariosController.js'

const router = express.Router()

router.get('/:nome', listarProntuariosPorPet)
router.post('/', adicionarProntuario)

export default router
