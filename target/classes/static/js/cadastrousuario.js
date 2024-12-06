function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
}

document.querySelector('.btn').addEventListener('click', function(e) {
    e.preventDefault(); // Previne o comportamento padrão do botão

    const usuario = document.getElementById('usuario').value;
    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmar-senha').value;

    // Validações
    if (usuario.length < 3 || usuario.length > 25) {
        alert('O usuário deve ter entre 3 e 25 caracteres.');
        return;
    }
    if (usuario.includes(' ')) {
        alert('O usuário não pode conter espaços.');
        return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }
    const senhaPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).{8,}$/;
    if (!senhaPattern.test(senha)) {
        alert('A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um caractere especial e ter no mínimo 8 caracteres.');
        return;
    }
    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem.');
        return;
    }

    // Criação do objeto usuário
    const novoUsuario = {
        nome: nome,
        sobrenome: sobrenome,
        usuario: usuario,
        email: email,
        senha: senha
    };

    // Obter o token do local storage
    const token = localStorage.getItem('token');

    // Fazer a requisição para a API
    fetch('/usuario/cadastro', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Adicionando o token ao cabeçalho
        },
        body: JSON.stringify(novoUsuario)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao cadastrar usuário');
        }
        return response.json();
    })
    .then(data => {
        alert('Usuário cadastrado com sucesso!');
        
        // Limpar os campos do formulário após a confirmação
        document.getElementById('usuario').value = '';
        document.getElementById('nome').value = '';
        document.getElementById('sobrenome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('senha').value = '';
        document.getElementById('confirmar-senha').value = '';
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um problema ao cadastrar o usuário.');
    });
});


function togglePasswordVisibility(inputId) {
    const input = document.getElementById(inputId);
    const eyeIcon = input.nextElementSibling.querySelector('.material-icons');

    if (input.type === 'password') {
        input.type = 'text';
        eyeIcon.textContent = 'visibility';
    } else {
        input.type = 'password';
        eyeIcon.textContent = 'visibility_off';
    }
}
