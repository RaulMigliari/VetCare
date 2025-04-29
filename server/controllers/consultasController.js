import supabase from '../supabase.js'

export async function agendarConsulta(req, res) {
  const { petNome, data, horario, tipo, clienteEmail } = req.body

  const { data: usuario, error: userError } = await supabase
    .from('usuarios')
    .select('id')
    .eq('email', clienteEmail)
    .single()

  if (userError || !usuario) {
    return res.status(400).json({ error: 'Cliente não encontrado.' })
  }


  const nomePetNormalizado = petNome.trim().toLowerCase()

  const { data: pet, error: petError } = await supabase
    .from('pets')
    .select('id')
    .eq('nome', nomePetNormalizado)
    .eq('dono_id', usuario.id)
    .single()

  if (petError || !pet) {
    return res.status(400).json({ error: 'Pet não encontrado.' })
  }

  const { error: insertError } = await supabase
    .from('consultas')
    .insert([{
      pet_id: pet.id,
      data,
      horario,
      tipo,
      status: 'confirmada'
    }])

  if (insertError) {
    return res.status(500).json({ error: 'Erro ao agendar consulta: ' + insertError.message })
  }

  res.status(201).json({ message: 'Consulta agendada com sucesso!' })
}

export async function listarConsultasCliente(req, res) {
  const email = req.query.email?.trim().toLowerCase()

  if (!email) {
    return res.status(400).json({ error: 'Email não fornecido.' })
  }

  const { data: usuario, error: userError } = await supabase
    .from('usuarios')
    .select('id')
    .eq('email', email)
    .single()

  if (userError || !usuario) {
    return res.status(404).json({ error: 'Usuário não encontrado.' })
  }

  const { data, error } = await supabase
    .from('consultas')
    .select(`
      id,
      data,
      horario,
      tipo,
      status,
      pets (
        nome
      )
    `)
    .eq('pets.dono_id', usuario.id)
    .order('data', { ascending: true })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const consultasFormatadas = data.map((item) => ({
    id: item.id,
    data: item.data,
    horario: item.horario,
    tipo: item.tipo,
    status: item.status,
    nome_pet: item.pets?.nome || 'Pet'
  }))

  res.status(200).json(consultasFormatadas)
}

export async function cancelarConsulta(req, res) {
  const id = req.params.id

  const { error } = await supabase
    .from('consultas')
    .update({ status: 'cancelada' })
    .eq('id', id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({ message: 'Consulta cancelada com sucesso!' })
}
