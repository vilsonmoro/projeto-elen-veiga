document.addEventListener('DOMContentLoaded', function() {
	const elems = document.querySelectorAll('select');
	const instances = M.FormSelect.init(elems);
});

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear(); 
        window.location.href = "/login";
    }
}

window.onload = function() {
    const vendedorData = localStorage.getItem('vendedorParaEditar');

    if (!vendedorData) {
        alert('Nenhum vendedor selecionado para edição.');
        window.location.href = '/buscarvendedor';
        return;
    }

    const vendedor = JSON.parse(vendedorData);

    document.getElementById('nome').value = vendedor.nome;
    document.getElementById('sobrenome').value = vendedor.sobrenome;
    document.getElementById('email').value = vendedor.email;
    document.getElementById('desconto').value = vendedor.desconto || 0;
    document.getElementById('observacoes').value = vendedor.observacao || '';

    const statusElement = document.getElementById('status');
    const statusValue = vendedor.statusVendedor ? vendedor.statusVendedor.toLowerCase() : 'ativo';
    
    if (statusValue === 'ativo' || statusValue === 'inativo') {
        statusElement.value = statusValue;
    } else {
        statusElement.value = 'ativo';
    }

    M.FormSelect.init(statusElement);

    M.updateTextFields();
};

document.querySelector('.btn').addEventListener('click', async function(e) {
    e.preventDefault();

    const nome = document.getElementById('nome').value.trim();
    const sobrenome = document.getElementById('sobrenome').value.trim();
    const email = document.getElementById('email').value.trim();
    const desconto = parseFloat(document.getElementById('desconto').value);
    const status = document.getElementById('status').value;
    const observacao = document.getElementById('observacoes').value.trim();

    // Validações
    if (desconto < 0 || desconto > 100) {
        alert('O desconto deve ser um valor entre 0 e 100.');
        return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert('Por favor, insira um e-mail válido.');
        return;
    }

    if (observacao.length > 250) {
        alert('A observação deve ter no máximo 250 caracteres.');
        return;
    }

    const vendedorData = localStorage.getItem('vendedorParaEditar');
    if (!vendedorData) {
        alert('Vendedor não encontrado.');
        return;
    }

    const vendedorOriginal = JSON.parse(vendedorData);
    const id = vendedorOriginal.id;

    const usuarioId = localStorage.getItem('userId');
    if (!usuarioId) {
        alert('ID do usuário não encontrado. Faça login novamente.');
        return;
    }

    const vendedorAtualizado = {
        id,
        nome,
        sobrenome,
        email,
        desconto,
        observacao,
        statusVendedor: status.toUpperCase(),
        usuario: {
            id: parseInt(usuarioId)
        }
    };

    try {
        const token = localStorage.getItem('token');

        const response = await fetch(`/vendedor/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(vendedorAtualizado)
        });

        if (response.ok) {
            M.toast({ html: 'Vendedor atualizado com sucesso!', classes: 'green' });
            window.location.href = '/buscarvendedor';
        } else {
            const errorData = await response.json();
            const errorMsg = errorData.message || errorData.error || 'Erro desconhecido.';
            M.toast({ html: `Erro ao atualizar vendedor: ${errorMsg}`, classes: 'red' });
        }
    } catch (error) {
        M.toast({ html: `Erro inesperado ao atualizar vendedor: ${error}`, classes: 'red' });
    }
});

window.addEventListener('beforeunload', function () {
    localStorage.removeItem('vendedorParaEditar');
});
