let saldo = 100;
const simbolos = ["🍒", "🍋", "🍇", "🔔", "💎", "💰"];

// Atualiza o saldo na tela
function atualizarSaldo() {
    document.getElementById("saldo").textContent = saldo.toFixed(2);
}

// Gira os slots
function girar() {
    if (saldo <= 0) {
        document.getElementById("mensagem").textContent = "💥 Você perdeu tudo! Recarga para continuar.";
        return;
    }

    let s1 = Math.floor(Math.random() * simbolos.length);
    let s2 = Math.floor(Math.random() * simbolos.length);
    let s3 = Math.floor(Math.random() * simbolos.length);

    document.getElementById("slot1").textContent = simbolos[s1];
    document.getElementById("slot2").textContent = simbolos[s2];
    document.getElementById("slot3").textContent = simbolos[s3];

    if (s1 === s2 && s2 === s3) {
        let premio = 50;
        saldo += premio;
        document.getElementById("mensagem").textContent = `🎉 Parabéns! Você ganhou R$${premio.toFixed(2)}!`;
    } else {
        saldo -= 10;
        document.getElementById("mensagem").textContent = `😢 Você perdeu R$10. Tente novamente!`;
    }

    atualizarSaldo();
}

// Copia a chave Pix e libera o botão "Já paguei"
function copiarPix() {
    const input = document.getElementById("chavePix");
    input.select();
    input.setSelectionRange(0, 99999);
    document.execCommand("copy");

    alert("🔗 Chave Pix copiada!");

    // Liberar botão "Já paguei"
    const btnLiberar = document.getElementById("btnLiberar");
    btnLiberar.style.display = "inline-block";
}

// Libera a tela do jogo
function liberarJogo() {
    document.getElementById("tela-pagamento").style.display = "none";
    document.getElementById("tela-jogo").style.display = "block";
}


