/* Aplicação Principal */

/* Processa login */
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById("email").value.trim();
  const senha = document.getElementById("senha").value;

  limparErros();

  const resultadoValidacao = validarCampos(email, senha);
  
  if (!resultadoValidacao.valido) {
    exibirErro(
      resultadoValidacao.mensagem,
      resultadoValidacao.camposInvalidos
    );
    return;
  }

  const resultadoAutenticacao = autenticar(email, senha);

  if (!resultadoAutenticacao.autenticado) {
    exibirErro(
      resultadoAutenticacao.mensagem,
      ["email", "senha"]
    );
    return;
  }

  salvarSessao(email);
  exibirPainel(email);
}

/* Exibe painel após login */
function exibirPainel(email) {
  document.getElementById("loginBox").classList.add("hidden");
  document.getElementById("painel").classList.remove("hidden");
  document.getElementById("userEmail").textContent = email;
}

/* Efetua logout */
function handleLogout() {
  document.getElementById("email").value = "";
  document.getElementById("senha").value = "";

  limparErros();
  limparSessao();

  document.getElementById("painel").classList.add("hidden");
  document.getElementById("loginBox").classList.remove("hidden");

  document.getElementById("email").focus();
}

/* Inicializa app */
document.addEventListener("DOMContentLoaded", function() {
  const formulario = document.getElementById("loginForm");
  
  if (formulario) {
    formulario.addEventListener("submit", handleLogin);
  }

  document.getElementById("email").addEventListener("input", function() {
    document.getElementById("email").classList.remove("campo-invalido");
  });

  document.getElementById("senha").addEventListener("input", function() {
    document.getElementById("senha").classList.remove("campo-invalido");
  });

  if (existeSessao()) {
    const emailUsuario = obterSessao();
    exibirPainel(emailUsuario);
  } else {
    document.getElementById("email").focus();
  }
});