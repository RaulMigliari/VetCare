document.addEventListener('DOMContentLoaded', async () => {
  const grid = document.getElementById('consultasGrid')
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  if (!usuario?.id) {
    alert('Você precisa estar logado.')
    window.location.href = 'login.html'
    return
  }

  try {
    const response = await fetch(`http://localhost:5000/api/consultas/cliente/${usuario.id}`)
    const consultas = await response.json()

    if (!Array.isArray(consultas) || consultas.length === 0) {
      grid.innerHTML = '<p>Você ainda não possui consultas agendadas.</p>'
      return
    }

    consultas.forEach((consulta) => {
      const card = document.createElement('div')
      card.className = 'consulta-card'
    
      card.innerHTML = `
        <h3>${consulta.nome_pet} - ${consulta.tipo}</h3>
        <p>Data: ${consulta.data}</p>
        <p>Horário: ${consulta.horario.slice(0, 5)}</p>
        <p class="status ${consulta.status}">Status: ${consulta.status}</p>
        ${
          consulta.status === 'confirmada'
            ? `<button class="btn-cancelar" data-id="${consulta.id}">Cancelar</button>`
            : ''
        }
      `
    
      grid.appendChild(card)
    })
    
    // Lógica para cancelar
    grid.addEventListener('click', async (e) => {
      if (e.target.classList.contains('btn-cancelar')) {
        const consultaId = e.target.dataset.id
    
        const confirmar = confirm('Deseja cancelar esta consulta?')
        if (!confirmar) return
    
        try {
          const response = await fetch(`http://localhost:5000/api/consultas/${consultaId}/cancelar`, {
            method: 'PATCH'
          })
    
          const result = await response.json()
    
          if (!response.ok) throw new Error(result.error)
    
          alert('Consulta cancelada com sucesso!')
          location.reload()
        } catch (error) {
          alert('Erro ao cancelar: ' + error.message)
        }
      }
    })
  } catch (error) {
    console.error('Erro ao buscar consultas:', error)
    grid.innerHTML = '<p>Erro ao carregar suas consultas.</p>'
  }
})
