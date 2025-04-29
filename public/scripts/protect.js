document.addEventListener('DOMContentLoaded', () => {
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'))

  if (!usuario) {
    alert('Você precisa estar logado para acessar esta página.')
    window.location.href = 'login.html'
    return
  }

  const urlAtual = window.location.href.toLowerCase()

  // Rotas específicas
  const clientePages = ['dashboard-cliente', 'perfil', 'consultas', 'agendar']
  const clinicaPages = ['dashboard-clinica', 'agenda', 'prontuarios', 'clientes']

  const acessandoCliente = clientePages.some(page => urlAtual.includes(page))
  const acessandoClinica = clinicaPages.some(page => urlAtual.includes(page))

  if (acessandoCliente && usuario.tipo !== 'cliente') {
    alert('Acesso negado. Área exclusiva para clientes.')
    window.location.href = 'login.html'
    return
  }

  if (acessandoClinica && usuario.tipo !== 'clinica') {
    alert('Acesso negado. Área exclusiva para a clínica.')
    window.location.href = 'login.html'
    return
  }
})
