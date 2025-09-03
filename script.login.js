function cadastrar() {
    let email = document.getElementById("cadastro-email").value;
    let senha = document.getElementById("cadastro-senha").value;
    if (email === "" || senha === "") {
        document.getElementById("mensagem-cadastro").innerText = "⚠️ Preencha todos os campos!";
        return;
    }
    localStorage.setItem("email", email);
    localStorage.setItem("senha", senha);
    document.getElementById("mensagem-cadastro").innerText = "✅ Cadastro realizado! Faça login.";
    document.getElementById("form-cadastro").style.display = "none";
    document.getElementById("form-login").style.display = "block";
    document.getElementById("titulo-login").innerText = "🚀 Bem-vindo de volta!";
    document.getElementById("frase-login").innerText = "Você está a um clique de começar a ganhar!";
}

function logar() {
    let email = document.getElementById("login-email").value;
    let senha = document.getElementById("login-senha").value;
    let emailSalvo = localStorage.getItem("email");
    let senhaSalva = localStorage.getItem("senha");
    if (email === emailSalvo && senha === senhaSalva) {
        document.getElementById("mensagem-login").innerText = "🎉 Login realizado!";
        setTimeout(() => {
            window.location.href = "jogo.html"; 
        }, 1000);
    } else {
        document.getElementById("mensagem-login").innerText = "❌ E-mail ou senha incorretos!";
    }
}
