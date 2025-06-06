document.addEventListener('DOMContentLoaded', function() {
    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);

    const tabs = document.querySelectorAll('.tabs');
    M.Tabs.init(tabs, { swipeable: false });
});


function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear();
        window.location.href = "/login";
    }
}

function limparCampos() {
    document.getElementById('logadouro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('estado').value = '';
    document.getElementById('cep').value = '';
    document.getElementById('nome').value = '';
    document.getElementById('observacoes').value = '';
    document.getElementById('tipo_entrega').selectedIndex = 0;
    document.getElementById('formapagamento').selectedIndex = 0;

    const elems = document.querySelectorAll('select');
    M.FormSelect.init(elems);
}

document.getElementById('cadastrarBtn').addEventListener('click', async function (event) {
    event.preventDefault();

    const logadouro = document.getElementById('logadouro').value.trim();
    const cidade = document.getElementById('cidade').value.trim();
    const estado = document.getElementById('estado').value.trim();
    const cep = document.getElementById('cep').value.trim();

    if (!logadouro || !cidade || !estado) {
        M.toast({ html: 'Os campos logadouro, cidade e estado de endereço são obrigatórios.', classes: 'red darken-2' });
        return;
    }


    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        M.toast({ html: 'Usuário não autenticado!', classes: 'red darken-2' });
        return;
    }

    const enderecoData = {
        logadouro: logadouro,
        cidade: cidade,
        estado: estado,
        cep: cep
    };    

    let enderecoId;

    try {
        const enderecoResponse = await fetch('/endereco', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(enderecoData)
        });

        if (!enderecoResponse.ok) {
            const errorData = await enderecoResponse.json();
            throw new Error(errorData.message || 'Erro ao cadastrar endereço');
        }

        const enderecoResult = await enderecoResponse.json();
        enderecoId = enderecoResult.id;

        localStorage.setItem('enderecoId', enderecoId);
    } catch (error) {
        M.toast({ html: `Erro: ${error.message}`, classes: 'red darken-2' });
        return;
    }

    const formaPagamentoMap = {
        'dinheiro': 'DINHEIRO',
        'credito': 'CARTAO_CREDITO',
        'debito': 'CARTAO_DEBITO',
        'pix': 'PIX',
        'ted': 'TED_DOC'
    };

    const tipoEntregaMap = {
        'retirada': 'RETIRADA',
        'sedex': 'SEDEX',
        'transportadora': 'TRANSPORTADORA',
        'carro': 'CARRO'
    };

    const clienteData = {
        nome: document.getElementById('nome').value,
        observacao: document.getElementById('observacoes').value,
        usuario: {
            id: parseInt(userId)
        },
        endereco: {
            id: parseInt(enderecoId)
        },
        tipo_entrega: tipoEntregaMap[document.getElementById('tipo_entrega').value],
        forma_pagamento: formaPagamentoMap[document.getElementById('formapagamento').value]
    };

    try {
        const clienteResponse = await fetch('/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(clienteData)
        });

        if (!clienteResponse.ok) {
            const errorData = await clienteResponse.json();
            throw new Error(errorData.message || 'Erro ao cadastrar cliente');
        }

        const clienteResult = await clienteResponse.json();
        M.toast({ html: 'Cliente cadastrado com sucesso!', classes: 'green' });

        limparCampos();

        const instance = M.Tabs.getInstance(document.querySelector('.tabs'));
        instance.select('cliente');

        localStorage.removeItem('enderecoId');

    } catch (error) {
        M.toast({ html: `Erro: ${error.message}`, classes: 'red darken-2' });

        // Se o cliente não foi cadastrado, remove o endereço criado
        if (enderecoId) {
            try {
                await fetch(`/endereco/${enderecoId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                localStorage.removeItem('enderecoId');
                console.log(`Endereço com ID ${enderecoId} deletado com sucesso.`);
            } catch (deleteError) {
                console.error('Erro ao deletar endereço após falha no cadastro do cliente:', deleteError);
            }
        }
    }
});
