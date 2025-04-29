document.addEventListener('DOMContentLoaded', () => {
  const agendarForm = document.getElementById('agendarForm')

  agendarForm.addEventListener('submit', async (e) => {
    e.preventDefault()

    const petNome = document.getElementById('petNome').value.trim()
    const data = document.getElementById('data').value
    const horario = document.getElementById('horario').value
    const tipo = document.getElementById('tipo').value

    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
    const clienteEmail = usuario?.email?.trim().toLowerCase()

    if (!usuario) {
      alert('Você precisa estar logado.')
      window.location.href = 'login.html'
      return
    }

    console.log("Enviando dados:", {
      petNome, data, horario, tipo, clienteEmail: usuario.email
    })
    
    try {
      const response = await fetch('http://localhost:5000/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          petNome,
          data,
          horario,
          tipo,
          clienteEmail
        })
      })

      let result
      try {
        result = await response.json()
      } catch (parseError) {
        throw new Error('Resposta inválida do servidor.')
      }

      if (!response.ok) throw new Error(result.error || 'Erro ao agendar.')


      alert('Consulta agendada com sucesso!')
      window.location.href = 'dashboard-cliente.html'
    } catch (error) {
      console.error('Erro ao agendar:', error)
      alert('Erro ao agendar consulta: ' + error.message)
    }
  })
})
