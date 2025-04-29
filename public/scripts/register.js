document.addEventListener('DOMContentLoaded', function () {
    const registerForm = document.getElementById('registerForm');

    registerForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o envio padrão do formulário

        // Capturando os dados preenchidos
        const nome = document.getElementById('nome').value.trim();
        const email = document.getElementById('email').value.trim();
        const telefone = document.getElementById('telefone').value.trim();
        const senha = document.getElementById('senha').value.trim();

        const nomePet = document.getElementById('nomePet').value.trim();
        const racaPet = document.getElementById('racaPet').value.trim();
        const idadePet = document.getElementById('idadePet').value.trim();

        // Simulação de envio de dados (apenas console.log por enquanto)
        console.log("Cliente:", { nome, email, telefone, senha });
        console.log("Pet:", { nomePet, racaPet, idadePet });

        // Simular sucesso no cadastro
        alert('Cadastro realizado com sucesso! Agora você pode fazer login.');

        // Redirecionar para login cliente (padrão)
        window.location.href = 'login.html?tipo=cliente';
    });
});
