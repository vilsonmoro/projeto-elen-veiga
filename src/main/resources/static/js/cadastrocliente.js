document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.tabs');
    M.Tabs.init(elems);
    
    const selects = document.querySelectorAll('select');
    M.FormSelect.init(selects);
});

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
}

document.getElementById('cadastrarBtn').addEventListener('click', async function() {
    const confirmed = confirm("Você deseja realmente cadastrar?");
    if (!confirmed) {
        this.style.backgroundColor = '#FFE100'; 
        return;
    }

    this.style.backgroundColor = '#FFE100';

    const token = localStorage.getItem('token'); // Recupera o token do localStorage
    const clienteData = {
        codigo: document.getElementById('codigo').value,
        nome: document.getElementById('nome').value,
        formaPagamento: [
            document.getElementById('pix').checked ? 'Pix' : null,
            document.getElementById('dinheiro').checked ? 'Dinheiro' : null,
            document.getElementById('credito').checked ? 'Crédito' : null,
            document.getElementById('debito').checked ? 'Débito' : null,
            document.getElementById('ted').checked ? 'TED' : null
        ].filter(Boolean), // Remove os valores null
        tipoEntrega: document.getElementById('tipo_entrega').value,
        observacoes: document.getElementById('observacoes').value
    };

    const enderecoData = {
        logradouro: document.getElementById('etqmarca').value,
        cidade: document.getElementById('etqcomp').value,
        estado: document.getElementById('tag').value,
        cep: document.getElementById('refil').value
    };

    try {
        // Cadastrar Cliente
        const clienteResponse = await fetch('/cliente', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(clienteData)
        });

        if (!clienteResponse.ok) {
            throw new Error('Erro ao cadastrar cliente');
        }

        const cliente = await clienteResponse.json();
        console.log('Cliente cadastrado:', cliente);

        // Cadastrar Endereço
        const enderecoResponse = await fetch('/endereco', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(enderecoData)
        });

        if (!enderecoResponse.ok) {
            throw new Error('Erro ao cadastrar endereço');
        }

        const endereco = await enderecoResponse.json();
        console.log('Endereço cadastrado:', endereco);

        alert('Cadastro realizado com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
    }
});
