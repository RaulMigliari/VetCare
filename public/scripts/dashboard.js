document.addEventListener('DOMContentLoaded', () => {
  const dadosUsuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  if (!dadosUsuario) {
    window.location.href = 'login.html'
    return
  }

  const boasVindas = document.getElementById('boasVindas')
  if (boasVindas) {
    boasVindas.textContent = `Bem-vindo(a), ${dadosUsuario.nome}!`
  }

  // Lógica do logout
  const logoutBtn = document.getElementById('logoutBtn')
  if (logoutBtn) {
    logoutBtn.addEventListener('click', (e) => {
      e.preventDefault()
      localStorage.clear()
      window.location.href = 'login.html'
    })
  }
})
