document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('loginForm')
  
    form.addEventListener('submit', async (event) => {
      event.preventDefault()
  
      const email = document.getElementById('email').value.trim()
      const senha = document.getElementById('password').value.trim()
      const tipo = document.getElementById('userType')?.value || 'cliente'
  
      if (!email || !senha) {
        alert('Preencha todos os campos.')
        return
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, senha })
        })
  
        const result = await response.json()
  
        if (!response.ok) {
          throw new Error(result.error || 'Erro ao fazer login.')
        }
  
        alert(result.message)
  
        // Redirecionar com base no tipo de usuário
        if (result.tipo === 'cliente') {
          window.location.href = 'dashboard-cliente.html'
        } else if (result.tipo === 'clinica') {
          window.location.href = 'dashboard-clinica.html'
        }

      // Salvar dados do usuário logado
      localStorage.setItem('usuarioLogado', JSON.stringify({
        nome: result.nome,
        tipo: result.tipo,
        email: email
      }))
      
      } catch (error) {
        console.error('Erro no login:', error)
        alert(error.message)
      }
    })
  })
  