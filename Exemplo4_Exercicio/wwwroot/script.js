// vou criar uma variavel que vai receber o endereço da Apliação ASP.Net
const API = "http://localhost:5000/Usuario";

// A gente vai atribuir os valores dos campos do formulário para um objeto
// document é um objeto que representa a página HTML
// getElementById é um método que retorna um elemento HTML com base no ID
document.getElementById("usuarioform").addEventListener("submit", salvarUsuario);
carregarUsuarios(); // Carregar os usuários que é uma função que vamos criar


function carregarUsuarios() {
    // fetch é uma função que faz uma requisição HTTP

    fetch(API)
        .then(res => res.json()) // res.json() é uma função que converte o conteúdo da resposta para JSON
        .then(data => {
            const tbody = document.querySelector("#tabelaUsuarios tbody");
            tbody.innerHTML = ""; // innerHTML é uma propriedade que define ou retorna o conteúdo HTML de um elemento
            data.forEach(usuario => {
                tbody.innerHTML += `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.ramal}</td>
                        <td>${usuario.especialidade}</td>
                        <td>
                            <button class="edit" onclick="editarUsuario(${usuario.id})">Editar</button>
                            <button class="delete" onclick='deletarUsuario(${usuario.id})'>Deletar</button>
                        </td>
                    </tr>
                `;
            }
            )
        })
}

// function salvarUsuario(event) {
//     event.preventDefault(); // previne o comportamento padrão do formulário (que é enviar os dados e recarregar a página)
//     const id = document.getElementById("id").value; // pega o valor do campo id
//     const usuario = {
//         id: pareInt(id || 0), // se id for vazio, atribui 0, e também converte para inteiro
//         nome: document.getElementById("nome").value, // pega o valor do campo nome
//         password: document.getElementById("password").value, // pega o valor do campo password
//         ramal: document.getElementById("ramal").value, // pega o valor do campo ramal
//         especialidade: document.getElementById("especialidade").value // pega o valor do campo especialidade
//     }

//     // Aqui ele vai tratar das operações de criar e atualizar o usuário
//     const metodo = id ? "PUT" : "POST"; // se id existir, o método é PUT (atualizar), senão é POST (criar)
//     // Agora tratr a url para essas operações
//     const url = id ? `${API}/${id}` : API; // se id existir, a url é a API + id, senão é só a API 
//     // Exemplo: http://localhost:5000/Usuario/1 ou se não a gente Post com esse caminho http://localhost:5000/Usuario

//     // Vamos a funçã fetch para fazer a requisição HTTP
//     fetch(url, {
//         method: metodo, // operação que vai ser feita (POST ou PUT)
//         headers: { // cabeçalho da requisição, que é um objeto que contém informações sobre a requisição
//             "Content-Type": "application/json" // tipo de conteúdo que estamos enviando (JSON)
//         },
//         body: JSON.stringify(usuario) // corpo da requisição, que é o objeto usuario convertido para JSON
//     })
//         .then(res => res.json()) // converte a resposta para JSON
//         .then(() => {
//             document.getElementById("usuarioform").reset(); // reseta o formulário
//             carregarUsuarios(); // chama a função para carregar a lista de usuários
//         });
// }


function salvarUsuario(e) {
    e.preventDefault();
  
    const id = document.getElementById("id").value;
  
    const usuario = {
      id: parseInt(id),
      nome: document.getElementById("nome").value,
      password: document.getElementById("senha").value,
      ramal: parseInt(document.getElementById("ramal").value),
      especialidade: document.getElementById("especialidade").value
    };
  
    const method = id ? "PUT" : "POST";
    const url = id ? `${API}/${id}` : API;
  
    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(usuario)
    })
      .then(res => res.json())
      .then(data => {
        console.log("Salvo:", data);
        document.getElementById("usuarioform").reset();
        carregarUsuarios();
      })
      .catch(error => console.error("Erro ao salvar:", error));
  }
  

function editarUsuario(id){
    fetch(`${API}/${id}`) // faz uma requisição GET para pegar o usuário pelo id
        .then(res => res.json()) // converte a resposta para JSON
        .then(usuario => { // aqui ele vai preencher os campos do formulário com os dados do usuário
            document.getElementById("id").value = usuario.id; // preenche o campo id
            document.getElementById("nome").value = usuario.nome; // preenche o campo nome
            document.getElementById("senha").value = usuario.password; // preenche o campo password
            document.getElementById("ramal").value = usuario.ramal; // preenche o campo ramal
            document.getElementById("especialidade").value = usuario.especialidade; // preenche o campo especialidade
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
  