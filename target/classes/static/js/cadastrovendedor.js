document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
}

document.querySelector('.btn').addEventListener('click', async function(e) {
    e.preventDefault(); // Previne o comportamento padrão do botão

    const nome = document.getElementById('nome').value;
    const sobrenome = document.getElementById('sobrenome').value;
    const email = document.getElementById('email').value;
    const desconto = document.getElementById('desconto').value;
    const status = document.getElementById('status').value;
    const observacoes = document.getElementById('observacoes').value;

    if (desconto < 0 || desconto > 100) {
        alert('O desconto deve ser um valor entre 0 e 100.');
        this.style.backgroundColor = '#FFE100'; 
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        this.style.backgroundColor = '#FFE100'; 
        return;
    }
    
    if (observacoes.length > 250) {
        alert('As observações devem ter no máximo 250 caracteres.');
        this.style.backgroundColor = '#FFE100'; 
        return; 
    }

    const confirmed = confirm("Você deseja realmente cadastrar o vendedor?");
    if (!confirmed) {
        this.style.backgroundColor = '#FFE100'; 
        return;
    }

    const token = localStorage.getItem('token'); // Recupera o token do localStorage
    const vendedorData = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        desconto: parseInt(desconto, 10),
        status: status,
        observacoes: observacoes
    };

    try {
        const response = await fetch('/vendedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(vendedorData)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar vendedor');
        }

        const vendedor = await response.json();
        console.log('Vendedor cadastrado:', vendedor);
        alert('Cadastro realizado com sucesso!');
        // Limpar os campos do formulário se necessário
        document.getElementById('nome').value = '';
        document.getElementById('sobrenome').value = '';
        document.getElementById('email').value = '';
        document.getElementById('desconto').value = '';
        document.getElementById('status').value = '';
        document.getElementById('observacoes').value = '';
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
    }
});
