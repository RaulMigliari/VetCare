document.addEventListener('DOMContentLoaded', async () => {
    const consultasHoje = document.getElementById('consultasHoje')
    const clientesTotal = document.getElementById('clientesTotal')
    const petsTotal = document.getElementById('petsTotal')
  
    try {
      const hoje = new Date().toISOString().split('T')[0]
  
      // Consultas do dia
      const resConsultas = await fetch(`http://localhost:5000/api/consultas?data=${hoje}`)
      const consultas = await resConsultas.json()
      consultasHoje.textContent = consultas.length
  
      // Total de clientes
      const resClientes = await fetch('http://localhost:5000/api/clientes')
      const clientes = await resClientes.json()
      clientesTotal.textContent = clientes.length
  
      // Total de pets
      const resPets = await fetch('http://localhost:5000/api/pets')
      const pets = await resPets.json()
      petsTotal.textContent = pets.length
  
    } catch (error) {
      console.error('Erro ao carregar resumo:', error)
      consultasHoje.textContent = clientesTotal.textContent = petsTotal.textContent = 'Erro'
    }
})
  