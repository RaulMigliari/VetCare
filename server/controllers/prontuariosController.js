import supabase from '../supabase.js'

export async function listarProntuariosPorPet(req, res) {
  const nomePet = req.params.nome?.trim().toLowerCase()

  const { data: pet, error: petError } = await supabase
    .from('pets')
    .select('id')
    .eq('nome', nomePet)
    .single()

  if (petError || !pet) {
    return res.status(404).json({ error: 'Pet não encontrado.' })
  }

  const { data, error } = await supabase
    .from('prontuarios')
    .select('data, descricao, veterinario')
    .eq('pet_id', pet.id)
    .order('data', { ascending: false })

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({
    petId: pet.id,
    prontuarios: data
  })
}

export async function adicionarProntuario(req, res) {
  const { pet_id, descricao, veterinario } = req.body
  const data = new Date().toISOString().split('T')[0]

  const { error } = await supabase
    .from('prontuarios')
    .insert([{ pet_id, descricao, veterinario, data }])

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(201).json({ message: 'Prontuário salvo!' })
}
