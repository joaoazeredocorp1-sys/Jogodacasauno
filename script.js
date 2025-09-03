let saldo = parseFloat(localStorage.getItem("saldo")) || 0;
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

function gerarPix() {
    const valor = parseFloat(document.getElementById("valorDeposito").value);
    if (isNaN(valor) || valor < 0.5) {
        alert("O depósito mínimo é de R$0,50.");
        return;
    }
    const chave = "pewzacatelco078@gmail.com";
    document.getElementById("chavePix").value = `${chave} | Valor: R$${valor.toFixed(2)}`;
    document.getElementById("areaPix").style.display = "block";
    document.getElementById("btnLiberar").style.display = "inline-block";
    let saldoAtual = parseFloat(localStorage.getItem("saldo")) || 0;
    localStorage.setItem("saldo", (saldoAtual + valor).toFixed(2));
    saldo = saldoAtual + valor;
}

function copiarPix() {
    const input = document.getElementById("chavePix");
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");
    alert("Chave Pix copiada!");
}

function liberarJogo() {
    const saldoAtual = parseFloat(localStorage.getItem("saldo")) || 0;
    if (saldoAtual < 5) {
        alert("Você precisa ter pelo menos R$5,00 de saldo para apostar.");
        return;
    }
    document.getElementById("tela-pagamento").style.display = "none";
    document.getElementById("tela-jogo").style.display = "block";
    atualizarSaldo();
}

function girar() {
    if (saldo < 5) {
        document.getElementById("mensagem").textContent = "Saldo insuficiente para jogar.";
        return;
    }
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
                if (slotIndex === 2 && callback) callback();
            }
        }, velocidade);
    };
    animarSlot(0);
    animarSlot(1);
    animarSlot(2, () => {
        const [s1, s2, s3] = resultados;
        saldo -= 10;
        if (s1 === s2 && s2 === s3) {
            const premio = 50;
            saldo += premio;
            document.getElementById("mensagem").textContent = `🎉 Parabéns! Você ganhou R$${premio.toFixed(2)}!`;
            adicionarAoHistorico(`+R$${premio.toFixed(2)} — Vitória!`);
        } else {
            document.getElementById("mensagem").textContent = "😢 Você perdeu R$10. Tente novamente!";
            adicionarAoHistorico(`-R$10.00 — Derrota.`);
        }
        atualizarSaldo();
    });
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

function criarHistorico() {
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
    criarHistorico();
};

