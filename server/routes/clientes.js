import express from 'express'
import { listarClientes } from '../controllers/clientesController.js'
import { atualizarCliente } from '../controllers/clientesController.js'

const router = express.Router()

router.get('/', listarClientes)
router.patch('/:id', atualizarCliente)

export default router
