let saldo = parseFloat(localStorage.getItem("saldo")) || 100;
const simbolos = ["🍒", "🍋", "🍇", "🔔", "💎", "💰"];
const slots = [
    document.getElementById("slot1"),
    document.getElementById("slot2"),
    document.getElementById("slot3")
];

function atualizarSaldo() {
    document.getElementById("saldo").textContent = saldo.toFixed(2);
    localStorage.setItem("saldo", saldo.toFixed(2));
}

function girar() {
    if (saldo <= 0) {
        document.getElementById("mensagem").textContent = "💥 Você perdeu tudo! Recarga para continuar.";
        return;
    }

    // Inicia a animação
    let rodadas = 20;
    let velocidade = 60;

    let resultados = [];

    const animarSlot = (slotIndex, callback) => {
        let count = 0;
        const interval = setInterval(() => {
            const randomIndex = Math.floor(Math.random() * simbolos.length);
            slots[slotIndex].textContent = simbolos[randomIndex];
            count++;

            if (count >= rodadas + slotIndex * 5) {
                clearInterval(interval);
                resultados[slotIndex] = randomIndex;
                if (slotIndex === 2 && callback) callback(); // Último slot terminou
            }
        }, velocidade);
    };

    animarSlot(0);
    animarSlot(1);
    animarSlot(2, () => {
        const [s1, s2, s3] = resultados;

        if (s1 === s2 && s2 === s3) {
            const premio = 50;
            saldo += premio;
            document.getElementById("mensagem").textContent = `🎉 Parabéns! Você ganhou R$${premio.toFixed(2)}!`;
            adicionarAoHistorico(`+R$${premio.toFixed(2)} — Vitória!`);
        } else {
            saldo -= 10;
            document.getElementById("mensagem").textContent = `😢 Você perdeu R$10. Tente novamente!`;
            adicionarAoHistorico(`-R$10.00 — Derrota.`);
        }

        atualizarSaldo();
    });
}

function copiarPix() {
    const input = document.getElementById("chavePix");
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");

    alert("🔗 Chave Pix copiada!");
    document.getElementById("btnLiberar").style.display = "inline-block";
}

function liberarJogo() {
    document.getElementById("tela-pagamento").style.display = "none";
    document.getElementById("tela-jogo").style.display = "block";
}

function alternarTema() {
    document.body.classList.toggle("claro");
    localStorage.setItem("tema", document.body.classList.contains("claro") ? "claro" : "escuro");
}

function adicionarAoHistorico(texto) {
    const ul = document.getElementById("historico-lista");
    if (!ul) return;

    const li = document.createElement("li");
    li.textContent = texto;
    ul.prepend(li);

    if (ul.children.length > 10) {
        ul.removeChild(ul.lastChild);
    }

    const historico = Array.from(ul.children).map(li => li.textContent);
    localStorage.setItem("historico", JSON.stringify(historico));
}

function criarBotaoTema() {
    if (!document.getElementById("btnTema")) {
        const botao = document.createElement("button");
        botao.id = "btnTema";
        botao.textContent = "🌙 Tema";
        botao.style.position = "fixed";
        botao.style.top = "10px";
        botao.style.right = "10px";
        botao.onclick = alternarTema;
        document.body.appendChild(botao);
    }
}

function criarHistorico() {
    const telaJogo = document.getElementById("tela-jogo");

    const div = document.createElement("div");
    div.className = "historico";
    div.innerHTML = `
        <h3>🧾 Histórico</h3>
        <ul id="historico-lista"></ul>
    `;
    telaJogo.appendChild(div);

    const salvo = localStorage.getItem("historico");
    if (salvo) {
        const arr = JSON.parse(salvo);
        arr.reverse().forEach(item => adicionarAoHistorico(item));
    }
}

window.onload = () => {
    const temaSalvo = localStorage.getItem("tema");
    if (temaSalvo === "claro") {
        document.body.classList.add("claro");
    }
    atualizarSaldo();
    criarBotaoTema();
    criarHistorico();
};
