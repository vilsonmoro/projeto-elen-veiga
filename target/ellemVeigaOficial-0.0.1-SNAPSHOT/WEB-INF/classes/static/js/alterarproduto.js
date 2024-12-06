document.addEventListener('DOMContentLoaded', function() {
  const elems = document.querySelectorAll('.tabs');
  M.Tabs.init(elems);
});

function confirmLogout(event) {
  event.preventDefault();
  const confirmed = confirm("Você deseja realmente sair da aplicação?");
  if (confirmed) {
      window.location.href = "login.html";
  }
}

async function carregarProduto() {
  const id = document.getElementById("codigo").value; // Obtendo o ID do produto
  if (!id) {
      alert("Por favor, insira o código do produto.");
      return;
  }

  const token = localStorage.getItem('token'); // Obtendo o token do localStorage

  try {
      const response = await fetch(`/produto/${id}`, {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${token}`
          }
      });

      if (response.ok) {
          const produto = await response.json();
          // Preencher os campos com os dados do produto
          document.getElementById("nome").value = produto.nome;
          document.getElementById("peso").value = produto.peso;
          document.getElementById("modelagem").value = produto.modelagem;
          // Continue preenchendo os campos restantes...

      } else {
          alert("Erro ao carregar produto. Verifique o código.");
      }
  } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao carregar o produto.");
  }
}

async function salvarProduto() {
  const id = document.getElementById("codigo").value;
  if (!id) {
      alert("O código do produto é necessário.");
      return;
  }

  const nome = document.getElementById("nome").value;
  const peso = document.getElementById("peso").value;
  // Obtenha outros valores conforme necessário...

  const produto = {
      nome,
      peso,
      // Adicione outros campos conforme necessário...
  };

  const token = localStorage.getItem('token');

  try {
      const response = await fetch(`/produto/${id}`, {
          method: 'PUT',
          headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(produto)
      });

      if (response.ok) {
          alert("Produto atualizado com sucesso!");
      } else {
          throw new Error('Erro ao atualizar produto.');
      }
  } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao atualizar o produto.");
  }
}