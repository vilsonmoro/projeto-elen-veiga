document.addEventListener('DOMContentLoaded', function() {
            M.AutoInit();
        });

        function confirmLogout(event) {
            event.preventDefault();
            const confirmed = confirm("Você deseja realmente sair da aplicação?");
            if (confirmed) {
                window.location.href = "login.html";
            }
        }

		function exportPdf() {
			window.open('/export-pdf', '_blank');
		}

        function buscar() {
			const dataInicial = document.getElementById('dataInicial').value;
			const dataFinal = document.getElementById('dataFinal').value;
			const feedback = document.getElementById('feedback');
			const button = document.querySelector('button[type="submit"]');

			if (new Date(dataInicial) > new Date(dataFinal)) {
				feedback.innerHTML = '<span style="color: red;">A data inicial deve ser anterior à data final.</span>';
				return false;
			}

			feedback.innerHTML = `<span style="color: green;">Busca realizada para o período de ${dataInicial} a ${dataFinal}.</span>`;
			
			button.classList.add('btn-amarelo');

			return false;
		}