function confirmLogout(event) {
    event.preventDefault();
    const confirmed = confirm("Você deseja realmente sair da aplicação?");
    if (confirmed) {
        localStorage.clear();
        window.location.href = "/login";
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const addBtn = document.getElementById('addRegistro');
    const popup = document.getElementById('popup');
    const closeBtn = document.querySelector('.close-btn');
    const selectElems = document.querySelectorAll('select');
    const tabElems = document.querySelectorAll('.tabs');
    const produtoForm = document.getElementById('produtoForm');
    const tabelaRegistros = document.querySelector('#tabelaRegistros tbody');
    const tabsInstance = M.Tabs.init(tabElems)[0];

    let produtoIdSelecionado = null;

    M.FormSelect.init(selectElems);

    addBtn.addEventListener('click', () => popup.style.display = 'block');
    closeBtn.addEventListener('click', () => popup.style.display = 'none');
    window.addEventListener('click', (event) => {
        if (event.target === popup) popup.style.display = 'none';
    });

    function salvarProduto() {
        const nome = document.getElementById('nome').value;
        const quantidade = document.getElementById('quantidade').value;
        const tamanho = document.getElementById('tamanho').value;
        const valor = document.getElementById('valor').value;
        const valortotal = document.getElementById('valortotal').value;
        const observacao = document.getElementById('observacao').value;

        if (!nome || !quantidade || !valor || !valortotal) {
            alert("Preencha os campos obrigatórios.");
            return;
        }

        if (produtoIdSelecionado) {
            let ids = JSON.parse(localStorage.getItem("pedido_produto_ids")) || [];
            if (!ids.includes(produtoIdSelecionado)) {
                ids.push(produtoIdSelecionado);
                localStorage.setItem("pedido_produto_ids", JSON.stringify(ids));
            }
        }

        const novaLinha = document.createElement('tr');
        novaLinha.dataset.id = produtoIdSelecionado;
        novaLinha.innerHTML = `
            <td>${nome}</td>
            <td>${quantidade}</td>
            <td>${tamanho}</td>
            <td>${parseFloat(valor).toFixed(2)}</td>
            <td>${parseFloat(valortotal).toFixed(2)}</td>
            <td>${observacao}</td>
            <td>
                <button class="action-button">
                    <span class="material-icons">edit</span>
                </button>
                <button class="action-button">
                    <span class="material-icons">delete</span>
                </button>
            </td>
        `;
        tabelaRegistros.appendChild(novaLinha);

        popup.style.display = 'none';
        produtoForm.reset();
        M.updateTextFields();
        produtoIdSelecionado = null;
        tabsInstance.select('itens');
        atualizarValorTotalPagamento();
    }

    produtoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        salvarProduto();
    });

    const botaoSalvar = document.getElementById("salvarpopup");
    if (botaoSalvar) {
        botaoSalvar.addEventListener("click", salvarProduto);
    }

    tabelaRegistros.addEventListener('click', function (e) {
        const icon = e.target.closest('.material-icons');
        if (!icon) return;

        const action = icon.textContent.trim();
        const tr = icon.closest('tr');
        const produtoId = tr.dataset.id;
        const tds = tr.querySelectorAll('td');

        if (action === 'edit') {
            document.getElementById('nome').value = tds[0].textContent;
            document.getElementById('quantidade').value = tds[1].textContent;
            document.getElementById('tamanho').value = tds[2].textContent;
            document.getElementById('valor').value = tds[3].textContent;
            document.getElementById('valortotal').value = tds[4].textContent;
            document.getElementById('observacao').value = tds[5].textContent;

            produtoIdSelecionado = produtoId;

            // Remove a linha antiga antes de reabrir o popup
            tr.remove();
            atualizarValorTotalPagamento();

            M.updateTextFields();
            popup.style.display = 'block';
        }

        if (action === 'delete') {
            tr.remove();
            let ids = JSON.parse(localStorage.getItem("pedido_produto_ids")) || [];
            ids = ids.filter(id => id !== produtoId);
            localStorage.setItem("pedido_produto_ids", JSON.stringify(ids));
        }
    });

    setupClienteAutocomplete("cliente", "../cliente/buscar", "cliente-suggestions", "nome");
    setupProdutoAutocomplete("nome", "../produto/buscar", "nome-suggestions", "nome");

    function setupProdutoAutocomplete(inputId, url, suggestionId, displayKey) {
        const input = document.getElementById(inputId);
        const suggestionBox = document.getElementById(suggestionId);
        const valorInput = document.getElementById("valor");
        const quantidadeInput = document.getElementById("quantidade");
        const valorTotalInput = document.getElementById("valortotal");
    
        input.addEventListener("focus", () => suggestionBox.style.display = 'block');
        input.addEventListener("blur", () => setTimeout(() => suggestionBox.style.display = 'none', 200));
    
        input.addEventListener("input", async () => {
            const query = input.value.trim();
            if (query.length === 0) {
                suggestionBox.innerHTML = "";
                suggestionBox.style.display = 'none';
                return;
            }
    
            try {
                const token = localStorage.getItem("token"); // ou a origem correta do seu token
                const response = await fetch(`${url}?nome=${encodeURIComponent(query)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao buscar produtos');
                }
    
                let data = await response.json();
                if (!Array.isArray(data)) data = [data];
    
                suggestionBox.innerHTML = data.slice(0, 5).map(item =>
                    `<div data-id="${item.id}" data-valor="${item.valorvarejo}">${item[displayKey]}</div>`
                ).join("");
                suggestionBox.style.display = 'block';
    
                suggestionBox.querySelectorAll("div").forEach(div => {
                    div.addEventListener("click", () => {
                        input.value = div.textContent;
                        const valor = parseFloat(div.dataset.valor);
                        valorInput.value = valor.toFixed(2);
                        M.updateTextFields();
                        produtoIdSelecionado = div.dataset.id;
    
                        const quantidade = parseFloat(quantidadeInput.value);
                        if (!isNaN(quantidade)) {
                            valorTotalInput.value = (quantidade * valor).toFixed(2);
                            M.updateTextFields();
                        }
    
                        suggestionBox.innerHTML = "";
                        suggestionBox.style.display = 'none';
                    });
                });
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
                M.toast({ html: `Erro ao buscar produtos: ${error.message}`, classes: 'red' });
            }
        });
    
        quantidadeInput.addEventListener("input", () => {
            const valor = parseFloat(valorInput.value);
            const quantidade = parseFloat(quantidadeInput.value);
            if (!isNaN(valor) && !isNaN(quantidade)) {
                valorTotalInput.value = (quantidade * valor).toFixed(2);
                M.updateTextFields();
            }
        });
    }
    

    function setupClienteAutocomplete(inputId, url, suggestionId, displayKey) {
        const input = document.getElementById(inputId);
        const suggestionBox = document.getElementById(suggestionId);
    
        input.addEventListener("focus", () => suggestionBox.style.display = 'block');
        input.addEventListener("blur", () => setTimeout(() => suggestionBox.style.display = 'none', 200));
    
        input.addEventListener("input", async () => {
            const query = input.value.trim();
            localStorage.removeItem("venda_cliente_id");
    
            if (query.length === 0) {
                suggestionBox.innerHTML = "";
                suggestionBox.style.display = 'none';
                return;
            }
    
            try {
                const token = localStorage.getItem("token"); // Ajuste conforme a origem real do token
                const response = await fetch(`${url}?nome=${encodeURIComponent(query)}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });
    
                if (!response.ok) {
                    throw new Error('Erro ao buscar clientes');
                }
    
                let data = await response.json();
                if (!Array.isArray(data)) data = [data];
    
                suggestionBox.innerHTML = data.slice(0, 5).map(item =>
                    `<div data-id="${item.id}">${item[displayKey]}</div>`
                ).join("");
                suggestionBox.style.display = 'block';
    
                suggestionBox.querySelectorAll("div").forEach(div => {
                    div.addEventListener("click", () => {
                        input.value = div.textContent;
                        localStorage.setItem("venda_cliente_id", div.dataset.id);
                        suggestionBox.innerHTML = "";
                        suggestionBox.style.display = 'none';
                    });
                });
            } catch (error) {
                console.error("Erro ao buscar dados:", error);
                M.toast({ html: `Erro ao buscar clientes: ${error.message}`, classes: 'red' });
            }
        });
    }
    
    function atualizarValorTotalPagamento() {
        const linhas = tabelaRegistros.querySelectorAll('tr');
        let somaTotal = 0;

        linhas.forEach(linha => {
            const valorCelula = linha.querySelectorAll('td')[4]; // 5ª coluna = "Valor total"
            if (valorCelula) {
                const valor = parseFloat(valorCelula.textContent);
                if (!isNaN(valor)) somaTotal += valor;
            }
        });

        const campoValorTotalPagamento = document.getElementById('valortot'); // Alterado para 'valortot'
        if (!campoValorTotalPagamento) {
            console.warn('Campo valortot não encontrado!');
            return;
        }

        campoValorTotalPagamento.value = somaTotal.toFixed(2);

        // Atualizando o campo "Desconto" para 10% do valor total
        const campoDesconto = document.getElementById('desconto');
        if (campoDesconto) {
            const desconto = somaTotal * 0.10; // 10% do valor total
            campoDesconto.value = desconto.toFixed(2);
        }

        // Atualizando o campo "Valor Restante"
        const campoValorEntrada = document.getElementById('valorentrada');
        if (campoValorEntrada) {
            campoValorEntrada.addEventListener('input', () => {
                const campoValorTotal = document.getElementById('valortot');
                const campoValorRestante = document.getElementById('valorrestante');

                const valorTotal = parseFloat(campoValorTotal?.value) || 0;
                const valorEntrada = parseFloat(campoValorEntrada.value);

                if (!isNaN(valorEntrada) && campoValorRestante) {
                    const valorRestante = valorTotal - valorEntrada;
                    campoValorRestante.value = valorRestante.toFixed(2);
                    M.updateTextFields(); // Se estiver usando Materialize
                }
            });
        }


        M.updateTextFields(); // Atualiza visualmente se estiver usando Materialize
    }

    document.getElementById("exportarPDF").addEventListener("click", async () => {
        const tabela = document.querySelector("#tabelaRegistros");
    
        if (!tabela) {
            alert("Tabela não encontrada.");
            return;
        }
    
        const clone = tabela.cloneNode(true);
        clone.style.width = '100%';
        document.body.appendChild(clone); // necessário para capturar com html2canvas
    
        await html2canvas(clone).then(canvas => {
            const imgData = canvas.toDataURL("image/png");
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            const pdfWidth = doc.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
    
            doc.addImage(imgData, "PNG", 10, 10, pdfWidth - 20, pdfHeight);
    
            let y = pdfHeight + 20;
    
            const valortotal = parseFloat(document.getElementById('valortot').value) || 0;
            const frete = parseFloat(document.getElementById('frete').value) || 0;
            const desconto = parseFloat(document.getElementById('desconto').value) || 0;
            const valorentrada = parseFloat(document.getElementById('valorentrada').value) || 0;
            const valorrestante = parseFloat(document.getElementById('valorrestante').value) || 0;
            const parcelas = parseInt(document.getElementById('parcelas').value) || 0;
            const valortotalpedido = (valortotal + frete - desconto).toFixed(2);
    
            const resumo = [
                `Valor Total dos Itens: R$ ${valortotal.toFixed(2)}`,
                `Frete: R$ ${frete.toFixed(2)}`,
                `Desconto: R$ ${desconto.toFixed(2)}`,
                `Valor de Entrada: R$ ${valorentrada.toFixed(2)}`,
                `Valor Restante: R$ ${valorrestante.toFixed(2)}`,
                `Parcelas: ${parcelas}`,
                `Valor Total do Pedido: R$ ${valortotalpedido}`
            ];
    
            resumo.forEach((linha, i) => {
                doc.text(linha, 14, y + i * 10);
            });
    
            doc.save("itens_pedido.pdf");
        }).catch(err => {
            console.error("Erro ao gerar PDF:", err);
            alert("Erro ao gerar PDF.");
        });
    
        document.body.removeChild(clone); // remove clone após exportação
    });
    
    
});

document.getElementById('cadastrarBtn').addEventListener('click', async function () {
    const clienteId = localStorage.getItem("venda_cliente_id");
    const usuarioId = localStorage.getItem("usuario_id");

    const pedido = {
        data: document.getElementById('data').value,
        desconto_revendedor: parseFloat(document.getElementById('desconto').value) || 0,
        frete: parseFloat(document.getElementById('frete').value) || 0,
        valor_total: parseFloat(document.getElementById('valortot').value),
        valor_entrada: parseFloat(document.getElementById('valorentrada').value),
        qtd_parcela: parseInt(document.getElementById('parcelas').value) || 0,
        data_entrega: document.getElementById('dataentrega').value,
        status_pedido: document.getElementById('status').value,
        forma_pagamento: document.getElementById('formapagamento').value,
        cliente: { id: parseInt(clienteId) },
        usuario: { id: parseInt(usuarioId) },
        tipo_entrega: document.getElementById('tipo_entrega').value
    };

    try {
        const token = localStorage.getItem("token");
        const response = await fetch('../pedido', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (response.ok) {
            const result = await response.json();
            if (result.id) {
                localStorage.setItem("pedido_id", result.id);
                await enviarProdutosDoPedido(); 
            }

            alert("Pedido cadastrado com sucesso!");
            window.location.href = "/buscarpedido";
        } else {
            const error = await response.text();
            alert("Erro ao cadastrar pedido: " + error);
        }
    } catch (err) {
        console.error("Erro na requisição:", err);
        alert("Erro ao tentar cadastrar o pedido.");
    }
});

async function enviarProdutosDoPedido() {
    const pedidoId = localStorage.getItem("pedido_id");
    const usuarioId = localStorage.getItem("usuario_id");

    if (!pedidoId || !usuarioId) {
        alert("Erro: ID do pedido ou do usuário não encontrado.");
        return;
    }

    const linhas = document.querySelectorAll('#tabelaRegistros tbody tr');
    const produtosPayload = [];

    linhas.forEach(linha => {
        const colunas = linha.querySelectorAll('td');
        const nome = colunas[0].textContent.trim();
        const quantidade = parseInt(colunas[1].textContent.trim());
        const tamanho = colunas[2].textContent.trim();
        const valorunitario = parseFloat(colunas[3].textContent.trim());
        const valortotal = parseFloat(colunas[4].textContent.trim());
        const observacao = colunas[5].textContent.trim();
        const produtoId = linha.dataset.id;

        if (!produtoId) {
            console.warn("Produto sem ID encontrado na linha. Ignorando.");
            return;
        }

        produtosPayload.push({
            nome,
            quatidade: quantidade,
            tamanho,
            valorunitario,
            valortotal,
            observacao,
            produto: { id: parseInt(produtoId) },
            pedido: { id: parseInt(pedidoId) },
            usuario: { id: parseInt(usuarioId) }
        });
    });

    if (produtosPayload.length === 0) {
        alert("Nenhum produto válido para enviar.");
        return;
    }

    try {
        const token = localStorage.getItem("token");
        const response = await fetch("../pedidoproduto", {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(produtosPayload)
        });

        if (response.ok) {
            localStorage.removeItem("venda_cliente_id");
            localStorage.removeItem("pedido_produto_ids");
            localStorage.removeItem("pedido_id");

            alert("Produtos do pedido salvos com sucesso!");
        } else {
            const errorText = await response.text();
            alert("Erro ao salvar produtos do pedido: " + errorText);
        }
    } catch (error) {
        console.error("Erro na requisição dos produtos:", error);
        alert("Erro inesperado ao salvar os produtos.");
    }
}


//Função pra forma de pagamento vir do cliente
