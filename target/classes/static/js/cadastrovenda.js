document.addEventListener('DOMContentLoaded', function() {
    const selectElems = document.querySelectorAll('select');
    M.FormSelect.init(selectElems);

    const tabElems = document.querySelectorAll('.tabs');
    M.Tabs.init(tabElems);
});

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
}

// Função para buscar cliente
async function buscarCliente() {
    const response = await fetch('/cliente');
    return await response.json();
}

// Função para buscar pedido
async function buscarPedido() {
    const response = await fetch('/pedido');
    return await response.json();
}

// Função para buscar produtos pelo nome
async function buscarProdutos(nomeProduto) {
    const response = await fetch(`/search?nomeProduto=${encodeURIComponent(nomeProduto)}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
    }
    return await response.json();
}

// Função para cadastrar venda
async function cadastrarVenda() {
    const cliente = document.getElementById('cliente').value;
    const pedido = document.getElementById('pedido').value;
    const data = document.getElementById('data').value;
    const observacao = document.getElementById('observacao').value;
    const valortot = document.getElementById('valortot').value;
    const vendedor = document.getElementById('vendedor').value;
    const comissao = document.getElementById('comissao').value;

    const token = localStorage.getItem('token'); // Recuperando o token do localStorage

    const vendaData = {
        cliente,
        pedido,
        data,
        observacao,
        valortot,
        vendedor,
        comissao
    };

    const vendaResponse = await fetch('/venda', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(vendaData)
    });

    const venda = await vendaResponse.json();

    // Agora registrar os itens da venda
    await cadastrarProdutoVenda(venda.id);
}

// Função para cadastrar produto venda
async function cadastrarProdutoVenda(vendaId) {
    const rows = document.querySelectorAll('#tabelaRegistros tr');

    const produtosVenda = [];

    rows.forEach(row => {
        const cells = row.querySelectorAll('td');
        const produto = {
            vendaId,
            nome: cells[0].innerText,
            quantidade: cells[1].innerText,
            tamanho: cells[2].innerText,
            valor: cells[3].innerText,
            desconto: cells[4].innerText,
            observacao: cells[5].innerText
        };
        produtosVenda.push(produto);
    });

    const token = localStorage.getItem('token'); // Recuperando o token do localStorage

    await Promise.all(produtosVenda.map(produto => {
        return fetch('/produtovenda', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(produto)
        });
    }));
}

document.getElementById('cadastrarBtn').addEventListener('click', async function() {
    const nomeProduto = document.getElementById('produto').value; // Supondo que você tenha um campo para o nome do produto
    const produtos = await buscarProdutos(nomeProduto); // Busca produtos antes de cadastrar a venda

    if (produtos.length === 0) {
        alert('Nenhum produto encontrado com esse nome.');
        return; // Interrompe o cadastro se não encontrar produtos
    }

    const confirmed = confirm("Você deseja realmente cadastrar?");
    if (confirmed) {
        await cadastrarVenda();
        alert("Venda cadastrada com sucesso!");
    }
});

// Função para preencher campos de cliente e pedido
async function preencherCliente() {
    const clientes = await buscarCliente();
    // Implementar lógica para mostrar os clientes em um dropdown ou autocomplete
}

async function preencherPedido() {
    const pedidos = await buscarPedido();
    // Implementar lógica para mostrar os pedidos em um dropdown ou autocomplete
}

document.getElementById('cliente').addEventListener('focus', preencherCliente);
document.getElementById('pedido').addEventListener('focus', preencherPedido);
