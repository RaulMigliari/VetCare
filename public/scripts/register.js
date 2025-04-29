document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm')
  
    registerForm.addEventListener('submit', async function (event) {
      event.preventDefault()
  
      const nome = document.getElementById('nome').value.trim()
      const email = document.getElementById('email').value.trim()
      const telefone = document.getElementById('telefone').value.trim()
      const senha = document.getElementById('senha').value.trim()
  
      const nomePet = document.getElementById('nomePet').value.trim()
      const racaPet = document.getElementById('racaPet').value.trim()
      const idadePet = parseInt(document.getElementById('idadePet').value)
  
      if (!nome || !email || !senha || !nomePet || !racaPet || isNaN(idadePet)) {
        alert('Por favor, preencha todos os campos obrigatórios.')
        return
      }
  
      try {
        const response = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nome,
            email,
            telefone,
            senha,
            tipo: 'cliente', // por padrão o form registra um cliente
            pet: {
              nome: nomePet.trim().toLowerCase(),
              raca: racaPet,
              idade: idadePet
            }
          })
        })
  
        const result = await response.json()
  
        if (!response.ok) {
          throw new Error(result.error || 'Erro ao cadastrar.')
        }
  
        alert('Cadastro realizado com sucesso!')
        window.location.href = 'login.html?tipo=cliente'
      } catch (error) {
        console.error('Erro no cadastro:', error)
        alert(error.message)
      }
    })
  })
  