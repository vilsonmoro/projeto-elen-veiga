document.addEventListener('DOMContentLoaded', function() {
            const elems = document.querySelectorAll('select');
            const instances = M.FormSelect.init(elems);
        });
		
		document.addEventListener('DOMContentLoaded', function() {
			var elems = document.querySelectorAll('.tabs');
			var instances = M.Tabs.init(elems);
		});

        function confirmLogout(event) {
            event.preventDefault();
            const confirmed = confirm("Você deseja realmente sair da aplicação?");
            if (confirmed) {
                window.location.href = "login.html";
            }
        }
		
		document.addEventListener('DOMContentLoaded', function() {
			var instance = M.Tabs.init(el, options);

			  $(document).ready(function(){
				$('.tabs').tabs();
			  });
		});
		
		document.getElementById('addRegistro').addEventListener('click', function() {
			document.getElementById('popup').style.display = 'block';
		});

		document.querySelector('.close-btn').addEventListener('click', function() {
			document.getElementById('popup').style.display = 'none';
		});

		window.addEventListener('click', function(event) {
			const popup = document.getElementById('popup');
			if (event.target === popup) {
				popup.style.display = 'none';
			}
		});

		document.getElementById('produtoForm').addEventListener('submit', function(e) {
			e.preventDefault();
			const nome = document.getElementById('nome').value;
			const quantidade = document.getElementById('quantidade').value;
			const tamanho = document.getElementById('tamanho').value;
			const valor = document.getElementById('valor').value;
			const desconto = document.getElementById('desconto').value;
			const observacao = document.getElementById('observacaopopup').value;
			const newRow = `<tr>
				<td>${nome}</td>
				<td>${quantidade}</td>
				<td>${tamanho}</td>
				<td>${valor}</td>
				<td>${desconto}</td>
				<td>${observacao}</td>
				<td>
					<button class="edit-btn" title="Editar">
						<i class="material-icons">edit</i>
					</button>
					<button class="delete-btn" title="Excluir">
						<i class="material-icons">delete</i>
					</button>
				</td>
			</tr>`;

			document.getElementById('tabelaRegistros').insertAdjacentHTML('beforeend', newRow);
			document.getElementById('popup').style.display = 'none';
			document.getElementById('produtoForm').reset();
		});

		document.getElementById('tabelaRegistros').addEventListener('click', function(e) {
			if (e.target.closest('.edit-btn')) {
				const row = e.target.closest('tr');
				const cells = row.querySelectorAll('td');
				
				document.getElementById('nome').value = cells[0].innerText;
				document.getElementById('quantidade').value = cells[1].innerText;
				document.getElementById('tamanho').value = cells[2].innerText;
				document.getElementById('valor').value = cells[3].innerText;
				document.getElementById('desconto').value = cells[4].innerText;
				document.getElementById('observacao').value = cells[5].innerText;
				document.getElementById('popup').style.display = 'block';
				row.remove();
			}
			if (e.target.closest('.delete-btn')) {
				const row = e.target.closest('tr');
				row.remove(); // Remove a linha da tabela
			}
		});		