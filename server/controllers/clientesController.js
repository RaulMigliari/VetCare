import supabase from '../supabase.js'

export async function listarClientes(req, res) {
  const { data, error } = await supabase
    .from('usuarios')
    .select('id, nome, email, telefone')
    .eq('tipo', 'cliente')

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  const clientesComPets = await Promise.all(
    data.map(async (cliente) => {
      const { data: pets, error: petsError } = await supabase
        .from('pets')
        .select('nome, raca, idade')
        .eq('dono_id', cliente.id)

      return {
        ...cliente,
        pets: petsError ? [] : pets
      }
    })
  )

  res.status(200).json(clientesComPets)
}

export async function atualizarCliente(req, res) {
  const { id } = req.params
  const { nome, email, telefone } = req.body

  const { error } = await supabase
    .from('usuarios')
    .update({ nome, email, telefone })
    .eq('id', id)

  if (error) {
    return res.status(500).json({ error: error.message })
  }

  res.status(200).json({ message: 'Dados atualizados com sucesso!' })
}
