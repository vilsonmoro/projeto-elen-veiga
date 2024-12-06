// Função para buscar cliente
async function buscarCliente() {
    const response = await fetch('/cliente');
    const clientes = await response.json();
    const clienteInput = document.getElementById('cliente');

    // Preenchendo o campo Cliente com as informações retornadas
    clienteInput.value = clientes[0]?.nome || ''; // Exemplo: preenchendo com o primeiro cliente encontrado
}

// Função para buscar produtos pelo nome
async function buscarProdutos(nomeProduto) {
    const response = await fetch(`/buscar?nomeProduto=${encodeURIComponent(nomeProduto)}`);
    if (!response.ok) {
        throw new Error('Erro ao buscar produtos');
    }
    return await response.json(); // Retorna a lista de produtos encontrados
}

// Função para cadastrar pedido
async function cadastrarPedido(pedidoData) {
    const token = localStorage.getItem('token'); // Pega o token do localStorage
    const response = await fetch('/pedido', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Envia o token no header
        },
        body: JSON.stringify(pedidoData)
    });
    return response.json(); // Retorna o pedido criado
}

// Função para cadastrar itens do pedido
async function cadastrarPedidoProduto(pedidoProdutoData) {
    const token = localStorage.getItem('token');
    const response = await fetch('/pedidoproduto', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(pedidoProdutoData)
    });
    return response.json();
}

// Evento de click para cadastrar pedido
document.getElementById('cadastrarBtn').addEventListener('click', async function() {
    const nomeProduto = document.getElementById('produto').value; // Supondo que haja um campo para nome do produto
    const produtos = await buscarProdutos(nomeProduto); // Busca produtos pelo nome

    if (produtos.length === 0) {
        alert('Nenhum produto encontrado com esse nome.');
        return; // Para o cadastro se não encontrar produtos
    }

    const pedido = {
        data: document.getElementById('data').value,
        cliente: document.getElementById('cliente').value,
        status: document.getElementById('status').value,
        desconto: document.getElementById('descrevend').value,
        dataEntrega: document.getElementById('dataentrega').value,
        valorTotal: document.getElementById('valortot').value,
        frete: document.getElementById('frete').value,
        // Adicione mais campos conforme necessário
    };

    const pedidoCriado = await cadastrarPedido(pedido);
    
    // Aqui você pode pegar o código do pedido criado e usar para cadastrar os itens
    const pedidoId = pedidoCriado.id; // Supondo que o ID do pedido criado seja retornado assim

    // Obter os itens da tabela (precisamos de um jeito de coletá-los)
    const itens = []; // Aqui deve-se coletar os itens que foram adicionados à tabela
    // Adicione lógica para coletar itens do DOM e montar o array de itens

    for (const item of itens) {
        const pedidoProduto = {
            pedidoId: pedidoId,
            nome: item.nome,
            quantidade: item.quantidade,
            tamanho: item.tamanho,
            valor: item.valor,
            desconto: item.desconto,
            observacao: item.observacao,
        };
        
        await cadastrarPedidoProduto(pedidoProduto);
    }

    alert('Pedido cadastrado com sucesso!');
});

function exportPdf() {
    window.open('/export-pdf', '_blank');
}

// Chama a função para buscar cliente ao carregar a página
document.addEventListener('DOMContentLoaded', buscarCliente);

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
  }
