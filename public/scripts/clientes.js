document.addEventListener('DOMContentLoaded', async () => {
  const lista = document.getElementById('clientesLista')
  const formBusca = document.getElementById('formBusca')
  const buscaInput = document.getElementById('buscaInput')
  let clientes = []

  function renderClientes(filtro = '') {
    const termo = filtro.trim().toLowerCase()
    const filtrados = clientes.filter(c =>
      c.nome.toLowerCase().includes(termo)
    )

    if (filtrados.length === 0) {
      lista.innerHTML = '<p>Nenhum cliente encontrado.</p>'
      return
    }

    lista.innerHTML = filtrados.map(cliente => `
      <div class="cliente-card">
        <h3>${cliente.nome}</h3>
        <p><strong>Email:</strong> ${cliente.email}</p>
        <p><strong>Telefone:</strong> ${cliente.telefone}</p>
        <div class="pets-lista">
          <h4>Pets:</h4>
          ${cliente.pets.length > 0 ? cliente.pets.map(pet => `
            <div class="pet-card">
              <p><strong>Nome:</strong> ${pet.nome}</p>
              <p><strong>Raça:</strong> ${pet.raca}</p>
              <p><strong>Idade:</strong> ${pet.idade}</p>
            </div>
          `).join('') : '<p>Sem pets cadastrados.</p>'}
        </div>
      </div>
    `).join('')
  }

  try {
    const res = await fetch('http://localhost:5000/api/clientes')
    clientes = await res.json()

    if (!res.ok) throw new Error(clientes.error)
    renderClientes()
  } catch (err) {
    lista.innerHTML = `<p class="erro">${err.message}</p>`
  }

  formBusca.addEventListener('input', (e) => {
    renderClientes(buscaInput.value)
  })
})
