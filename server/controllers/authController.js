//! lógica de registro/login separada

import supabase from '../supabase.js'

export async function registerUser(req, res) {
  const { nome, email, telefone, senha, tipo, pet } = req.body

  if (!nome || !email || !senha || !tipo || !pet) {
    return res.status(400).json({ error: 'Dados obrigatórios não preenchidos.' })
  }

  // 1. Inserir cliente na tabela 'usuarios'
  const { data: usuario, error: userError } = await supabase
    .from('usuarios')
    .insert([{ nome, email, telefone, senha, tipo }])
    .select()
    .single()

  if (userError) {
    return res.status(500).json({ error: 'Erro ao criar usuário: ' + userError.message })
  }

  // 2. Inserir pet associado ao cliente
  const { nome: nomePet, raca, idade } = pet

  const { error: petError } = await supabase
    .from('pets')
    .insert([{
      nome: nomePet,
      raca,
      idade,
      dono_id: usuario.id
    }])

  if (petError) {
    return res.status(500).json({ error: 'Usuário criado, mas houve erro ao cadastrar o pet: ' + petError.message })
  }

  return res.status(201).json({ message: 'Cadastro realizado com sucesso!', usuario })
}

export async function loginUser(req, res) {
  const { email, senha } = req.body

  if (!email || !senha) {
    return res.status(400).json({ error: 'Email e senha são obrigatórios.' })
  }

  // Buscar usuário com base no email
  const { data: usuario, error } = await supabase
    .from('usuarios')
    .select()
    .eq('email', email)
    .single()

  if (error || !usuario) {
    return res.status(401).json({ error: 'Usuário não encontrado.' })
  }

  if (usuario.senha !== senha) {
    return res.status(401).json({ error: 'Senha incorreta.' })
  }

  // OK - devolver dados úteis
  res.status(200).json({
    message: 'Login realizado com sucesso!',
    nome: usuario.nome,
    tipo: usuario.tipo
  })
}
