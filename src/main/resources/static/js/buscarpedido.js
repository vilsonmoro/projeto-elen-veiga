let currentPage = 1;
        const itemsPerPage = 10;

        function clearSearch() {
            document.getElementById('codigo').value = '';
            document.getElementById('dataInicio').value = '';
            document.getElementById('dataFim').value = '';
            currentPage = 1;
            updatePagination();
            searchPedido();
        }

        async function searchPedido() {
            const codigo = document.getElementById('codigo').value || null;
            const dataInicio = document.getElementById('dataInicio').value || null;
            const dataFim = document.getElementById('dataFim').value || null;

            const token = localStorage.getItem('token'); // Recupera o token do localStorage
            const response = await fetch(`/buscar?codigo=${codigo}&startDate=${dataInicio}&endDate=${dataFim}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });

            if (!response.ok) {
                alert('Erro ao buscar pedidos');
                return;
            }

            const pedidos = await response.json();
            displayResults(pedidos);
        }

        function displayResults(pedidos) {
            const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
            tbody.innerHTML = '';

            const start = (currentPage - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const paginatedPedidos = pedidos.slice(start, end);

            paginatedPedidos.forEach(pedido => {
                const row = tbody.insertRow();
                row.innerHTML = `
                    <td>${pedido.codigo}</td>
                    <td>${pedido.data}</td>
                    <td>
                        <button class="action-button" onclick="editPedido('${pedido.codigo}')">
                            <span class="material-icons">edit</span>
                        </button>
                        <button class="action-button" onclick="confirmDelete('${pedido.codigo}')">
                            <span class="material-icons">delete</span>
                        </button>
                    </td>
                `;
            });

            updatePagination(pedidos.length);
        }

        function updatePagination(totalItems) {
            const totalPages = Math.ceil(totalItems / itemsPerPage);
            document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${totalPages}`;

            document.getElementById('prevButton').disabled = currentPage === 1;
            document.getElementById('nextButton').disabled = currentPage === totalPages;
        }

        function changePage(direction) {
            currentPage += direction;
            searchPedido();
        }

        function editPedido(codigo) {
            window.location.href = `alterarpedido.html?codigo=${codigo}`;
        }

        function confirmDelete(codigo) {
            const confirmed = confirm("Você tem certeza que deseja excluir este registro?");
            if (confirmed) {
                alert(`Registro com código ${codigo} excluído com sucesso!`);
                searchPedido();
            }
        }

        function confirmLogout(event) {
            event.preventDefault();
            const confirmed = confirm("Você deseja realmente sair da aplicação?");
            if (confirmed) {
                window.location.href = "login.html";
            }
        }