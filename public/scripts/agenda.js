document.addEventListener('DOMContentLoaded', async () => {
    const agendaGrid = document.getElementById('agendaGrid')
  
    const hoje = new Date().toISOString().split('T')[0] // Formato yyyy-mm-dd
  
    try {
      const res = await fetch(`http://localhost:5000/api/consultas?data=${hoje}`)
      const consultas = await res.json()
  
      if (!res.ok) throw new Error(consultas.error)
  
      if (consultas.length === 0) {
        agendaGrid.innerHTML = '<p>Nenhuma consulta agendada para hoje.</p>'
        return
      }
  
      agendaGrid.innerHTML = consultas.map(consulta => `
        <div class="consulta-card">
          <h3>${consulta.nome_pet} - ${consulta.tipo}</h3>
          <p><strong>Horário:</strong> ${consulta.horario.slice(0, 5)}</p>
          <p><strong>Tutor:</strong> ${consulta.nome_tutor}</p>
          <p><strong>Status:</strong> ${consulta.status}</p>
        </div>
      `).join('')
    } catch (err) {
      console.error(err)
      agendaGrid.innerHTML = '<p class="erro">Erro ao carregar a agenda.</p>'
    }
  })
  