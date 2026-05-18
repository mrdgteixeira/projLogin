/* Módulo de Autenticação */

/* Credenciais válidas */
const CREDENCIAIS_VALIDAS = {
  email: "qualidade.ufr@gmail.com",
  senha: "12345678"
};

/* Valida formato de email */
function validarEmail(email) {
  const padraoEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return padraoEmail.test(email);
}

/* Valida campos vazios e formato */
function validarCampos(email, senha) {
  const erros = {
    valido: true,
    mensagem: "",
    camposInvalidos: []
  };

  if (!email && !senha) {
    erros.valido = false;
    erros.mensagem = "Preencha todos os campos.";
    erros.camposInvalidos = ["email", "senha"];
    return erros;
  }

  if (!email) {
    erros.valido = false;
    erros.mensagem = "O campo e-mail é obrigatório.";
    erros.camposInvalidos = ["email"];
    return erros;
  }

  if (!senha) {
    erros.valido = false;
    erros.mensagem = "O campo senha é obrigatório.";
    erros.camposInvalidos = ["senha"];
    return erros;
  }

  if (!validarEmail(email)) {
    erros.valido = false;
    erros.mensagem = "Digite um e-mail válido. Ex: usuario@dominio.com";
    erros.camposInvalidos = ["email"];
    return erros;
  }

  return erros;
}

/* Autentica com credenciais válidas */
function autenticar(email, senha) {
  if (email === CREDENCIAIS_VALIDAS.email && 
      senha === CREDENCIAIS_VALIDAS.senha) {
    return {
      autenticado: true,
      mensagem: ""
    };
  }

  return {
    autenticado: false,
    mensagem: "Credenciais incorretas. Verifique seu e-mail e senha."
  };
}

/* Exibe mensagem de erro */
function exibirErro(mensagem, camposInvalidos = []) {
  const elementoErro = document.getElementById("erro");
  elementoErro.textContent = mensagem;

  ["email", "senha"].forEach(function(idCampo) {
    const campo = document.getElementById(idCampo);
    if (camposInvalidos.includes(idCampo)) {
      campo.classList.add("campo-invalido");
    } else {
      campo.classList.remove("campo-invalido");
    }
  });
}

/* Remove erros */
function limparErros() {
  exibirErro("", []);
}

/* Salva sessão (apenas email) */
function salvarSessao(email) {
  sessionStorage.setItem("usuarioLogado", email);
}

/* Recupera email da sessão */
function obterSessao() {
  return sessionStorage.getItem("usuarioLogado");
}

/* Verifica se há sessão ativa */
function existeSessao() {
  return obterSessao() !== null;
}

/* Limpa a sessão */
function limparSessao() {
  sessionStorage.removeItem("usuarioLogado");
}