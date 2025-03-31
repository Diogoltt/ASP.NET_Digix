const API = "http://localhost:5000/Usuario";

document.getElementById("usuarioform").addEventListener("submit", salvarUsuario);
carregarUsuarios();

function carregarUsuarios() {
  fetch(API)
    .then(res => res.json())
    .then(data => {
      // Ordenar os usuários por ID em ordem crescente
      data.sort((a, b) => a.id - b.id);
      
      const tbody = document.querySelector("#tabelaUsuarios tbody");
      tbody.innerHTML = "";
      data.forEach(usuario => {
        tbody.innerHTML += `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.password}</td>
                        <td>${usuario.ramal}</td>
                        <td>${usuario.especialidade}</td>
                        <td>
                            <button class="edit" onclick="editarUsuario(${usuario.id})">Editar</button>
                            <button class="delete" onclick='deletarUsuario(${usuario.id})'>Deletar</button>
                        </td>
                    </tr>
                `;
      });
    });
}

function salvarUsuario(event) {
  event.preventDefault();

  const usuario = {
    id: parseInt(document.getElementById("id").value),
    nome: document.getElementById("nome").value, // corrigido
    password: document.getElementById("senha").value,
    ramal: parseInt(document.getElementById("ramal").value),
    especialidade: document.getElementById("especialidade").value
  };


  fetch("http://localhost:5000/Usuario", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(usuario)
  })
    .then(res => res.json())
    .then(data => {
      console.log("Usuário salvo:", data);
      carregarUsuarios();
      document.getElementById("usuarioform").reset();
    })
    .catch(error => console.error("Erro ao salvar:", error));
}


function editarUsuario(id) {
  fetch(`${API}/${id}`)
    .then(res => res.json())
    .then(usuario => {
      document.getElementById("id").value = usuario.id;
      document.getElementById("nome").value = usuario.nome;
      document.getElementById("senha").value = usuario.password;
      document.getElementById("ramal").value = usuario.ramal;
      document.getElementById("especialidade").value = usuario.especialidade;
    });
}

function deletarUsuario(id) {
  if (confirm("Deseja realmente excluir este usuário?")) {
    fetch(`${API}/${id}`, { method: "DELETE" })
      .then(res => {
        if (!res.ok) throw new Error("Erro ao deletar");
        carregarUsuarios();
      })
      .catch(error => console.error("Erro:", error));
  }
}