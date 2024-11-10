async function carregarPagamento() {
    const id = document.getElementById("codigo").value; // Obtendo o ID do pagamento
    if (!id) {
        alert("Por favor, insira o ID do pagamento.");
        return;
    }

    const token = localStorage.getItem('token'); // Obtendo o token do localStorage

    try {
        const response = await fetch(`/pagamento/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            const pagamento = await response.json();
            // Preencher os campos com os dados do pagamento
            document.getElementById("data").value = pagamento.data;
            document.getElementById("cliente").value = pagamento.cliente;
            document.getElementById("pedido").value = pagamento.pedido;
            document.getElementById("valor").value = pagamento.valor;
            document.getElementById("parcela").value = pagamento.parcela;

            // Preencher as formas de pagamento
            pagamento.formasPagamento.forEach(forma => {
                if (document.getElementById(forma.toLowerCase())) {
                    document.getElementById(forma.toLowerCase()).checked = true;
                }
            });
        } else {
            alert("Erro ao carregar pagamento. Verifique o ID.");
        }
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar o pagamento.");
    }
}

async function salvarPagamento() {
    const id = document.getElementById("codigo").value; // Assumindo que o código é o ID do pagamento
    if (!id) {
        alert("O ID do pagamento é necessário.");
        return;
    }

    const token = localStorage.getItem('token'); // Obtendo o token do localStorage

    // Primeiro, buscar os dados atuais do pagamento
    let pagamentoAtual;
    try {
        const response = await fetch(`/pagamento/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.ok) {
            pagamentoAtual = await response.json();
        } else {
            alert("Erro ao carregar os dados do pagamento. Verifique o ID.");
            return;
        }
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao carregar os dados do pagamento.");
        return;
    }

    // Preparar o objeto de pagamento para atualização
    const data = document.getElementById("data").value || pagamentoAtual.data;
    const cliente = document.getElementById("cliente").value || pagamentoAtual.cliente;
    const pedido = document.getElementById("pedido").value || pagamentoAtual.pedido;
    const valor = document.getElementById("valor").value || pagamentoAtual.valor;
    const parcela = document.getElementById("parcela").value || pagamentoAtual.parcela;

    const formasPagamento = [
        { forma: 'Pix', selecionado: document.getElementById("pix").checked },
        { forma: 'Dinheiro', selecionado: document.getElementById("dinheiro").checked },
        { forma: 'Crédito', selecionado: document.getElementById("credito").checked },
        { forma: 'Débito', selecionado: document.getElementById("debito").checked },
        { forma: 'TED', selecionado: document.getElementById("ted").checked }
    ].filter(f => f.selecionado).map(f => f.forma);

    const pagamento = {
        data,
        cliente,
        pedido,
        valor,
        parcela,
        formasPagamento
    };

    try {
        const response = await fetch(`/pagamento/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Adicionando o token no cabeçalho
            },
            body: JSON.stringify(pagamento)
        });

        if (response.ok) {
            alert("Pagamento atualizado com sucesso!");
        } else {
            throw new Error('Erro ao atualizar pagamento.');
        }
    } catch (error) {
        console.error(error);
        alert("Ocorreu um erro ao atualizar o pagamento.");
    }
}

function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        window.location.href = "login.html";
    }
  }
