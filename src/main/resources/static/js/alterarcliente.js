async function updateCliente() {
    const clienteId = document.getElementById('codigo').value; // ID do cliente
    const enderecoId = document.getElementById('enderecoId').value; // ID do endereço (oculto)

    if (!clienteId || !enderecoId) {
        alert('IDs do cliente e do endereço são necessários.');
        return;
    }

    const token = localStorage.getItem('token'); // Obtendo o token do localStorage

    try {
        // Primeiro, obter os dados do cliente
        const responseCliente = await fetch(`/cliente/${clienteId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}` // Adicionando o token no header
            }
        });

        if (!responseCliente.ok) {
            throw new Error('Erro ao obter dados do cliente');
        }

        const clienteData = await responseCliente.json();

        // Atualizar os dados do cliente com os novos valores
        const nome = document.getElementById('nome').value;
        const tipoEntrega = document.getElementById('tipo_entrega').value;
        const observacoes = document.getElementById('observacoes').value;

        const formaPagamento = [];
        ['pix', 'dinheiro', 'credito', 'debito', 'ted'].forEach(paymentMethod => {
            if (document.getElementById(paymentMethod).checked) {
                formaPagamento.push(paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1));
            }
        });

        const cliente = {
            ...clienteData,
            nome,
            formaPagamento,
            tipoEntrega,
            observacoes
        };

        // Atualizando o cliente
        const updateResponseCliente = await fetch(`/cliente/${clienteId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(cliente)
        });

        if (!updateResponseCliente.ok) {
            throw new Error('Erro ao atualizar cliente');
        }

        // Atualizando o endereço
        const endereco = {
            logradouro: document.getElementById('etqmarca').value,
            cidade: document.getElementById('etqcomp').value,
            estado: document.getElementById('tag').value,
            cep: document.getElementById('refil').value
        };

        const updateResponseEndereco = await fetch(`/endereco/${enderecoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(endereco)
        });

        if (!updateResponseEndereco.ok) {
            throw new Error('Erro ao atualizar endereço');
        }

        alert('Cliente e endereço atualizados com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert(error.message);
    }
}

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
}