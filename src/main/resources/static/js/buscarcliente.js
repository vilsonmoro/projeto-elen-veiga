	let currentPage = 1;
	const itemsPerPage = 10;

	function clearSearch() {
		document.getElementById('codigo').value = '';
		document.getElementById('nome').value = '';
		alert('Campos de pesquisa limpos!');
	}

	async function searchCliente() {
		const codigo = document.getElementById('codigo').value;
		const nome = document.getElementById('nome').value;
		const token = localStorage.getItem('token'); // Pega o token do localStorage
	
		try {
			const response = await fetch(`/buscar?codigo=${codigo}&nome=${nome}`, {
				method: 'GET',
				headers: {
					'Authorization': `Bearer ${token}`, // Adiciona o token no cabeçalho
					'Content-Type': 'application/json'
				}
			});
			
			if (!response.ok) {
				throw new Error('Erro ao buscar clientes');
			}
	
			const filteredclientes = await response.json();
			displayResults(filteredclientes);
		} catch (error) {
			console.error(error);
			alert('Erro ao buscar clientes. Tente novamente.');
		}
	}
		
	function displayResults(filteredclientes) {
		const tbody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];
		tbody.innerHTML = '';

		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		const paginatedclientes = filteredclientes.slice(start, end);

		paginatedclientes.forEach(cliente => {
			const row = tbody.insertRow();
			row.innerHTML = `
				<td>${cliente.codigo}</td>
				<td>${cliente.nome}</td>
				<td>
					<button class="action-button" onclick="editcliente('${cliente.codigo}')">
						<span class="material-icons">edit</span>
					</button>
					<button class="action-button" onclick="confirmDelete('${cliente.codigo}')">
						<span class="material-icons">delete</span>
					</button>
				</td>
			`;
		});

		updatePagination(filteredclientes.length);
	}

	function updatePagination(totalItems) {
		const totalPages = Math.ceil(totalItems / itemsPerPage);
		document.getElementById('pageInfo').innerText = `Página ${currentPage} de ${totalPages}`;
		document.getElementById('prevButton').disabled = currentPage === 1;
		document.getElementById('nextButton').disabled = currentPage === totalPages;
	}

	function changePage(direction) {
		currentPage += direction;
		searchCliente();
	}

	function editcliente(codigo) {
		window.location.href = `alterarcliente.html?codigo=${codigo}`;
	}

	function confirmDelete(codigo) {
		const confirmed = confirm("Você tem certeza que deseja excluir este registro?");
		if (confirmed) {
			alert(`Registro com código ${codigo} excluído com sucesso!`);
			searchCliente();
		}
	}

	function confirmLogout(event) {
		event.preventDefault();
		const confirmed = confirm("Você deseja realmente sair da aplicação?");
		if (confirmed) {
			window.location.href = "login.html";
		}
	}
