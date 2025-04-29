import express from 'express'
import { agendarConsulta, listarConsultasCliente, cancelarConsulta, listarConsultasPorData } from '../controllers/consultasController.js'

const router = express.Router()

router.post('/', agendarConsulta)
router.get('/cliente', listarConsultasCliente)
router.patch('/:id/cancelar', cancelarConsulta)
router.get('/', listarConsultasPorData)


export default router