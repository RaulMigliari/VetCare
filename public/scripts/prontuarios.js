document.addEventListener('DOMContentLoaded', () => {
    const buscarForm = document.getElementById('buscarForm')
    const resultadoDiv = document.getElementById('resultadoBusca')
    const novoForm = document.getElementById('formNovoProntuario')
    const secaoNovo = document.querySelector('.novo-prontuario')

    let petIdAtual = null

    buscarForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        resultadoDiv.innerHTML = 'Buscando...'
        const nomePet = document.getElementById('nomePet').value.trim().toLowerCase()

        try {
        const response = await fetch(`http://localhost:5000/api/prontuarios/${nomePet}`)
        const result = await response.json()

        if (!response.ok) throw new Error(result.error)
        if (!result.petId) throw new Error('Pet não encontrado.')

        petIdAtual = result.petId
        secaoNovo.style.display = 'block'

        if (result.prontuarios.length === 0) {
            resultadoDiv.innerHTML = '<p>Sem prontuários ainda.</p>'
            return
        }

        resultadoDiv.innerHTML = result.prontuarios.map(p => `
            <div class="prontuario-card">
            <p><strong>Data:</strong> ${p.data}</p>
            <p><strong>Veterinário:</strong> ${p.veterinario}</p>
            <p><strong>Descrição:</strong> ${p.descricao}</p>
            </div>
        `).join('')
        } catch (err) {
        resultadoDiv.innerHTML = `<p class="erro">${err.message}</p>`
        secaoNovo.style.display = 'none'
        }
    })

    novoForm.addEventListener('submit', async (e) => {
        e.preventDefault()
        const descricao = document.getElementById('descricao').value.trim()
        const veterinario = document.getElementById('veterinario').value.trim()

        try {
        const res = await fetch('http://localhost:5000/api/prontuarios', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ pet_id: petIdAtual, descricao, veterinario })
        })

        const result = await res.json()
        if (!res.ok) throw new Error(result.error)

        alert('Prontuário adicionado com sucesso!')
        buscarForm.dispatchEvent(new Event('submit'))
        novoForm.reset()
        } catch (err) {
        alert('Erro: ' + err.message)
        }
    })
})
  