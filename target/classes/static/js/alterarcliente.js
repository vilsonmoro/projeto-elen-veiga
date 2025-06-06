function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear(); 
        window.location.href = "/login";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const clienteData = localStorage.getItem('clienteParaEditar');

    if (!clienteData) {
        alert('Nenhum cliente selecionado para edição.');
        window.location.href = '/buscarcliente';
        return;
    }

    const cliente = JSON.parse(clienteData);
    const endereco = cliente.endereco ?? {};

    // Campos simples
    document.getElementById('codigo').value = cliente.id ?? '';
    document.getElementById('nome').value = cliente.nome ?? '';
    document.getElementById('observacoes').value = cliente.observacao ?? '';

    // Campos de endereço
    document.getElementById('logadouro').value = endereco.logadouro ?? '';
    document.getElementById('cidade').value = endereco.cidade ?? '';
    document.getElementById('estado').value = endereco.estado ?? '';
    document.getElementById('cep').value = endereco.cep ?? '';

    // Forma de pagamento e tipo de entrega estão fora do endereço!
    const formaPagamentoSelect = document.getElementById('formapagamento');
    const tipoEntregaSelect = document.getElementById('tipo_entrega');

    if (cliente.forma_pagamento) {
        formaPagamentoSelect.value = cliente.forma_pagamento;
    }

    if (cliente.tipo_entrega) {
        tipoEntregaSelect.value = cliente.tipo_entrega;
    }

    // Re-inicializar os selects com Materialize
    M.FormSelect.init(formaPagamentoSelect);
    M.FormSelect.init(tipoEntregaSelect);

    // Atualizar campos de texto e tabs
    M.updateTextFields();
    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs);
});

document.getElementById('salvarBtn').addEventListener('click', async function (event) {
    event.preventDefault();

    const clienteData = localStorage.getItem('clienteParaEditar');
    const userID = localStorage.getItem('userId');

    if (!clienteData || !userID) {
        alert('Erro: Cliente ou usuário não encontrado.');
        return;
    }

    const cliente = JSON.parse(clienteData);
    const endereco = cliente.endereco ?? {};
    const enderecoId = endereco.id;

    if (!enderecoId) {
        alert('Erro: ID do endereço não encontrado.');
        return;
    }

    const enderecoAtualizado = {
        logadouro: document.getElementById('logadouro').value,
        cidade: document.getElementById('cidade').value,
        estado: document.getElementById('estado').value,
        cep: document.getElementById('cep').value,
        usuario: {
            id: parseInt(userID)
        }
    };
        
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/endereco/${enderecoId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(enderecoAtualizado)
            });
    
            if (response.ok) {
                M.toast({ html: 'Endereço atualizado com sucesso!', classes: 'green' });
            } else {
                const erro = await response.json();
                const errorMsg = errorData.message || errorData.error || 'Erro desconhecido (cliente).';
                M.toast({ html: `Erro ao atualizar endereço: ${errorMsg}`, classes: 'red' });
            }
        } catch (error) {
            M.toast({ html: `Erro de conexão (endereço): ${error.message}`, classes: 'red' });
        }

        const clienteId = cliente.id;
        console.log(clienteId);
        if (!clienteId) {
            alert("Erro: ID do cliente não encontrado.");
            return;
        }

        const clienteEditado = {
            nome: document.getElementById('nome').value,
            observacao: document.getElementById('observacoes').value,
            tipo_entrega: document.getElementById('tipo_entrega').value,
            forma_pagamento: document.getElementById('formapagamento').value,
            usuario: {
                id: parseInt(userID)
            },
            endereco: {
                id: enderecoId
            }
        };

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`/cliente/${clienteId}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(clienteEditado)
            });
            const responseBody = await response.json();
            console.log(responseBody);

            if (response.ok) {
                M.toast({ html: 'Cliente atualizado com sucesso!', classes: 'green' });
                window.location.href = "/buscarcliente";
            } else {
                const errorMsg = responseBody.message || responseBody.error || 'Erro desconhecido (cliente).';
                M.toast({ html: `Erro ao atualizar cliente: ${errorMsg}`, classes: 'red' });
            }
        } catch (error) {
            M.toast({ html: `Erro de conexão (cliente): ${error.message}`, classes: 'red' });
        }
});

window.addEventListener('beforeunload', function () {
    localStorage.removeItem('clienteParaEditar');
});
