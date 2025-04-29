document.addEventListener('DOMContentLoaded', async () => {
    const lista = document.getElementById('clientesLista')
  
    try {
      const res = await fetch('http://localhost:5000/api/clientes')
      const result = await res.json()
  
      if (!res.ok) throw new Error(result.error)
  
      if (result.length === 0) {
        lista.innerHTML = '<p>Nenhum cliente cadastrado.</p>'
        return
      }
  
      lista.innerHTML = result.map(cliente => `
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
    } catch (err) {
      lista.innerHTML = `<p class="erro">${err.message}</p>`
    }
})
  