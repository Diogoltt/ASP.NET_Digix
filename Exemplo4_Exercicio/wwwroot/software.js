const API = "http://localhost:5000/Software";

document.getElementById("softwareForm").addEventListener("submit", salvarSoftware);
carregarSoftwares();

function carregarSoftwares() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#tabelaSoftwares tbody");
            tbody.innerHTML = "";
            data.forEach(software => {
                tbody.innerHTML += `
                    <tr>
                        <td>${software.id}</td>
                        <td>${software.produto}</td>
                        <td>${software.hardDisk} GB</td>
                        <td>${software.memoriaRam} GB</td>
                        <td>${software.fkMaquina}</td>
                        <td>
                            <button class="edit" onclick="editarSoftware(${software.id})">Editar</button>
                            <button class="delete" onclick="deletarSoftware(${software.id})">Deletar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Erro ao carregar softwares:", error));
}

function salvarSoftware(event) {
    event.preventDefault();

    const idInput = document.getElementById("id").value;
    const id = idInput ? parseInt(idInput) : 0;

    const software = {
        produto: document.getElementById("produto").value,
        hardDisk: parseInt(document.getElementById("hardDisk").value),
        memoriaRam: parseInt(document.getElementById("memoriaRam").value),
        fkMaquina: parseInt(document.getElementById("fkMaquina").value)
    };

    // Se tiver um ID, é uma atualização; caso contrário, é uma inserção
    const metodo = id ? "PUT" : "POST";
    const url = id ? `${API}/${id}` : API;

    // Se for atualização, inclui o ID no objeto
    if (id) {
        software.id = id;
    }

    fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(software)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Erro ao ${id ? 'atualizar' : 'criar'} software: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(`Software ${id ? 'atualizado' : 'criado'}:`, data);
            document.getElementById("softwareForm").reset();
            document.getElementById("id").value = "";
            carregarSoftwares();
        })
        .catch(error => console.error("Erro:", error));
}

function editarSoftware(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(software => {
            document.getElementById("id").value = software.id;
            document.getElementById("produto").value = software.produto;
            document.getElementById("hardDisk").value = software.hardDisk;
            document.getElementById("memoriaRam").value = software.memoriaRam;
            document.getElementById("fkMaquina").value = software.fkMaquina;
        })
        .catch(error => console.error("Erro ao carregar software para edição:", error));
}