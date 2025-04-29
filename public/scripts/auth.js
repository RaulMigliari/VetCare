document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('loginForm');

    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault(); // Impede o envio padrão

        // Captura dos campos
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value.trim();
        const userType = document.getElementById('userType').value; // cliente ou clinica

        // Validação simples
        if (!email || !password) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        console.log('Tentando login com:');
        console.log('Email:', email);
        console.log('Senha:', password);
        console.log('Tipo de usuário:', userType);

        try {
            // Simulação de login (futuramente, substituir pela chamada ao Supabase)

            // Simular pequena verificação (apenas exemplo)
            if (email === "cliente@vetcare.com" && userType === "cliente") {
                alert('Login realizado com sucesso como Cliente!');
                window.location.href = 'dashboard-cliente.html';
            } else if (email === "clinica@vetcare.com" && userType === "clinica") {
                alert('Login realizado com sucesso como Clínica!');
                window.location.href = 'dashboard-clinica.html';
            } else {
                throw new Error('Usuário ou senha inválidos.');
            }

        } catch (error) {
            console.error('Erro no login:', error.message);
            alert('Erro ao fazer login: ' + error.message);
        }
    });
});
