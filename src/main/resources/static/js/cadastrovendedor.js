document.addEventListener('DOMContentLoaded', function () {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
});

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear();
        window.location.href = "/login";
    }
}

document.querySelector('.btn').addEventListener('click', async function (e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim();
    const desconto = document.getElementById('desconto').value.trim();
    const status = document.getElementById('status').value;
    const observacoes = document.getElementById('observacoes').value.trim();

    // Validações obrigatórias
    let camposInvalidos = [];

    if (!nome) camposInvalidos.push("Nome");
    if (!email) camposInvalidos.push("E-mail");
    if (!desconto) camposInvalidos.push("Desconto");
    if (!status) camposInvalidos.push("Status");

    if (camposInvalidos.length > 0) {
        M.toast({
            html: `Os campos obrigatórios não foram preenchidos: ${camposInvalidos.join(', ')}`,
            classes: 'red'
        });
        this.style.backgroundColor = '#FFE100';
        return;
    }

    // Validação do valor do desconto
    const descontoValor = parseFloat(desconto);
    if (descontoValor < 0 || descontoValor > 100) {
        alert('O desconto deve ser um valor entre 0 e 100.');
        this.style.backgroundColor = '#FFE100';
        return;
    }

    // Validação do e-mail
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        this.style.backgroundColor = '#FFE100';
        return;
    }

    // Validação do tamanho das observações
    if (observacoes.length > 250) {
        alert('As observações devem ter no máximo 250 caracteres.');
        this.style.backgroundColor = '#FFE100';
        return;
    }

    // Dados do vendedor
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const vendedorData = {
        nome: nome,
        sobrenome: sobrenome,
        email: email,
        desconto: descontoValor,
        observacao: observacoes,
        statusVendedor: status,
        usuario: {
            id: parseInt(userId, 10)
        }
    };

    // Envio para o backend
    try {
        const response = await fetch('/vendedor', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(vendedorData)
        });

        if (response.ok) {
            M.toast({ html: 'Vendedor cadastrado com sucesso!', classes: 'green' });
            document.getElementById('nome').value = '';
            document.getElementById('sobrenome').value = '';
            document.getElementById('email').value = '';
            document.getElementById('desconto').value = '';
            document.getElementById('status').value = '';
            document.getElementById('observacoes').value = '';
        } else {
            const errorData = await response.json();
            const errorMsg = errorData.message || errorData.error || 'Erro desconhecido.';
            M.toast({ html: `Erro ao cadastrar vendedor: ${errorMsg}`, classes: 'red' });
        }
    } catch (error) {
        M.toast({ html: `Erro de conexão: ${error.message}`, classes: 'red' });
    }
});
