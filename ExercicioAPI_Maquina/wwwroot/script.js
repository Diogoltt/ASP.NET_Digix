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
            const tbody = document.querySelector("tabelaUsuarios tbody");
            tbody.innerHTML = ""; // innerHTML é uma propriedade que define ou retorna o conteúdo HTML de um elemento
            data.forEach(usuario => {
                tbody.innerHTML += `
                    <tr>
                        <td>${usuario.id}</td>
                        <td>${usuario.nome}</td>
                        <td>${usuario.ramal}</td>
                        <td>${usuario.especialidade}</td>
                        <td>
                            <button class="edit" onclick="editarUsuario(${usuario.id})"></button>
                            <button class="delete" onclick='deletarUsuario(${usuario.id})'>Deletar</button>
                        </td>
                    </tr>
                `;
            }
            )
        })

}