import supabase from '../supabase.js'

export async function listarPets(req, res) {
  const { data, error } = await supabase
    .from('pets')
    .select('id')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json(data)
}
