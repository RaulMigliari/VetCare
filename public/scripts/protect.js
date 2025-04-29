document.addEventListener('DOMContentLoaded', () => {
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))
  
    if (!usuario) {
      alert('Você precisa estar logado para acessar esta página.')
      window.location.href = 'login.html'
    }
  })
  