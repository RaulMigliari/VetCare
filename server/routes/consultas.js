import express from 'express'
import { agendarConsulta, listarConsultasCliente, cancelarConsulta } from '../controllers/consultasController.js'

const router = express.Router()

router.post('/', agendarConsulta)
router.get('/cliente', listarConsultasCliente)
router.patch('/:id/cancelar', cancelarConsulta)


export default router