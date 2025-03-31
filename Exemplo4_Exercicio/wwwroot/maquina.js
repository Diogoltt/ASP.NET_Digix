const API = "http://localhost:5000/Maquina";

document.getElementById("maquinaForm").addEventListener("submit", salvarMaquina);
carregarMaquinas();

function carregarMaquinas() {
    fetch(API)
        .then(res => res.json())
        .then(data => {
            const tbody = document.querySelector("#tabelaMaquinas tbody");
            tbody.innerHTML = "";
            data.forEach(maquina => {
                tbody.innerHTML += `
                    <tr>
                        <td>${maquina.id}</td>
                        <td>${maquina.tipo}</td>
                        <td>${maquina.velocidade}</td>
                        <td>${maquina.hardDisk}</td>
                        <td>${maquina.placaRede}</td>
                        <td>${maquina.memoriaRam}</td>
                        <td>${maquina.fkUsuario}</td>
                        <td>
                            <button class="edit" onclick="editarMaquina(${maquina.id})">Editar</button>
                            <button class="delete" onclick="deletarMaquina(${maquina.id})">Deletar</button>
                        </td>
                    </tr>
                `;
            });
        })
        .catch(error => console.error("Erro ao carregar máquinas:", error));
}

function salvarMaquina(event) {
    event.preventDefault();
    
    const idInput = document.getElementById("id").value;
    const id = idInput ? parseInt(idInput) : 0;
    
    const maquina = {
        tipo: document.getElementById("tipo").value,
        velocidade: parseInt(document.getElementById("velocidade").value),
        hardDisk: parseInt(document.getElementById("hardDisk").value),
        placaRede: parseInt(document.getElementById("placaRede").value),
        memoriaRam: parseInt(document.getElementById("memoriaRam").value),
        fkUsuario: parseInt(document.getElementById("fkUsuario").value)
    };
    
    // Se tiver um ID, é uma atualização; caso contrário, é uma inserção
    const metodo = id ? "PUT" : "POST";
    const url = id ? `${API}/${id}` : API;
    
    // Se for atualização, inclui o ID no objeto
    if (id) {
        maquina.id = id;
    }
    
    fetch(url, {
        method: metodo,
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(maquina)
    })
        .then(res => {
            if (!res.ok) {
                throw new Error(`Erro ao ${id ? 'atualizar' : 'criar'} máquina: ${res.status}`);
            }
            return res.json();
        })
        .then(data => {
            console.log(`Máquina ${id ? 'atualizada' : 'criada'}:`, data);
            document.getElementById("maquinaForm").reset();
            document.getElementById("id").value = "";
            carregarMaquinas();
        })
        .catch(error => console.error("Erro:", error));
}

function editarMaquina(id) {
    fetch(`${API}/${id}`)
        .then(res => res.json())
        .then(maquina => {
            document.getElementById("id").value = maquina.id;
            document.getElementById("tipo").value = maquina.tipo;
            document.getElementById("velocidade").value = maquina.velocidade;
            document.getElementById("hardDisk").value = maquina.hardDisk;
            document.getElementById("placaRede").value = maquina.placaRede;
            document.getElementById("memoriaRam").value = maquina.memoriaRam;
            document.getElementById("fkUsuario").value = maquina.fkUsuario;
        })
        .catch(error => console.error("Erro ao carregar máquina para edição:", error));
}

function deletarMaquina(id) {
    if (confirm("Deseja realmente excluir esta máquina?")) {
        fetch(`${API}/${id}`, { method: "DELETE" })
            .then(res => {
                if (!res.ok) throw new Error(`Erro ao deletar: ${res.status}`);
                alert("Máquina excluída com sucesso!");
                carregarMaquinas();
            })
            .catch(error => console.error("Erro:", error));
    }
}