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

async function buscarCliente() {
    const clienteId = document.getElementById('cliente').value;
    try {
        const response = await fetch(`/cliente/${clienteId}`);
        if (!response.ok) {
            throw new Error('Cliente não encontrado');
        }
        const cliente = await response.json();
        console.log('Cliente encontrado:', cliente);
        alert('Cliente encontrado: ' + JSON.stringify(cliente));
    } catch (error) {
        console.error('Erro ao buscar cliente:', error);
        alert('Erro ao buscar cliente. Verifique o ID e tente novamente.');
    }
}

async function buscarPedido() {
    const pedidoId = document.getElementById('pedido').value;
    try {
        const response = await fetch(`/pedido/${pedidoId}`);
        if (!response.ok) {
            throw new Error('Pedido não encontrado');
        }
        const pedido = await response.json();
        console.log('Pedido encontrado:', pedido);
        alert('Pedido encontrado: ' + JSON.stringify(pedido));
    } catch (error) {
        console.error('Erro ao buscar pedido:', error);
        alert('Erro ao buscar pedido. Verifique o ID e tente novamente.');
    }
}

document.getElementById('cliente').addEventListener('blur', buscarCliente);
document.getElementById('pedido').addEventListener('blur', buscarPedido);

document.getElementById('cadastrarBtn').addEventListener('click', async function() {
    const confirmed = confirm("Você deseja realmente cadastrar?");
    if (!confirmed) {
        this.style.backgroundColor = '#FFE100';
        return;
    }

    this.style.backgroundColor = '#FFE100';

    const token = localStorage.getItem('token'); // Recupera o token do localStorage
    const pagamentoData = {
        codigo: document.getElementById('codigo').value,
        data: document.getElementById('data').value,
        cliente: document.getElementById('cliente').value,
        pedido: document.getElementById('pedido').value,
        valor: parseFloat(document.getElementById('valor').value),
        parcela: parseInt(document.getElementById('parcela').value, 10),
        formaPagamento: [
            document.getElementById('pix').checked ? 'Pix' : null,
            document.getElementById('dinheiro').checked ? 'Dinheiro' : null,
            document.getElementById('credito').checked ? 'Crédito' : null,
            document.getElementById('debito').checked ? 'Débito' : null,
            document.getElementById('ted').checked ? 'TED' : null
        ].filter(Boolean) // Remove os valores null
    };

    try {
        // Cadastrar Pagamento
        const response = await fetch('/pagamento', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(pagamentoData)
        });

        if (!response.ok) {
            throw new Error('Erro ao cadastrar pagamento');
        }

        const pagamento = await response.json();
        console.log('Pagamento cadastrado:', pagamento);
        alert('Cadastro realizado com sucesso!');
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro ao realizar cadastro. Verifique os dados e tente novamente.');
    }
});
