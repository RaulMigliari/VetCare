//! ponto de entrada do servidor Express

import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import authRoutes from './routes/auth.js'
import consultasRoutes from './routes/consultas.js'
import prontuariosRoutes from './routes/prontuarios.js'
import clientesRoutes from './routes/clientes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/consultas', consultasRoutes)
app.use('/api/prontuarios', prontuariosRoutes)
app.use('/api/clientes', clientesRoutes)

console.log("Iniciando servidor VetCare...");

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`)
})
