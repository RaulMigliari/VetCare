document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('perfilForm')
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
  
    if (!usuario) {
      alert('Você precisa estar logado.')
      window.location.href = 'login.html'
      return
    }
  
    // Preenche os campos com dados do usuário
    document.getElementById('nome').value = usuario.nome
    document.getElementById('email').value = usuario.email
    document.getElementById('telefone').value = usuario.telefone || ''
  
    form.addEventListener('submit', async (e) => {
      e.preventDefault()
  
      const nome = document.getElementById('nome').value.trim()
      const email = document.getElementById('email').value.trim()
      const telefone = document.getElementById('telefone').value.trim()
  
      try {
        const response = await fetch(`http://localhost:5000/api/clientes/${usuario.id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nome, email, telefone })
        })
  
        const result = await response.json()
        if (!response.ok) throw new Error(result.error)
  
        alert('Dados atualizados com sucesso!')
  
        // Atualiza localStorage
        localStorage.setItem('usuarioLogado', JSON.stringify({
          ...usuario,
          nome,
          email,
          telefone
        }))
  
        window.location.href = 'dashboard-cliente.html'
      } catch (err) {
        alert('Erro ao atualizar: ' + err.message)
      }
    })
})
  