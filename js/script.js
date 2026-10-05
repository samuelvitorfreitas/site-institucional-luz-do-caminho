/* Comunidade Luz do Caminho - interatividade. Cada bloco só roda se o elemento existir na página. */

// 1) Modo claro / escuro, lembrado no navegador
(function () {
  const botao = document.getElementById('tema');
  const raiz = document.documentElement;
  let salvo = null;
  try { salvo = localStorage.getItem('tema'); } catch (e) {}

  function aplicar(tema) {
    if (tema === 'escuro') raiz.setAttribute('data-tema', 'escuro');
    else raiz.removeAttribute('data-tema');
    if (botao) botao.textContent = tema === 'escuro' ? 'Modo claro' : 'Modo escuro';
  }
  aplicar(salvo);

  if (botao) {
    botao.addEventListener('click', function () {
      const novo = raiz.getAttribute('data-tema') === 'escuro' ? 'claro' : 'escuro';
      aplicar(novo);
      try { localStorage.setItem('tema', novo); } catch (e) {}
    });
  }
})();

// 2) Faixa de aviso: pode ser fechada e não volta durante a visita
(function () {
  const faixa = document.getElementById('alerta');
  const fechar = document.getElementById('fechar');
  if (!faixa || !fechar) return;
  try { if (sessionStorage.getItem('alerta') === 'fechado') faixa.hidden = true; } catch (e) {}
  fechar.addEventListener('click', function () {
    faixa.hidden = true;
    try { sessionStorage.setItem('alerta', 'fechado'); } catch (e) {}
  });
})();

// 3) Validação do formulário de contato
(function () {
  const form = document.getElementById('formulario');
  if (!form) return;

  const campos = ['nome', 'email', 'mensagem'];
  const sucesso = document.getElementById('sucesso');

  function mostrarErro(id, texto) {
    document.getElementById('erro-' + id).textContent = texto;
    document.getElementById(id).classList.toggle('invalido', texto !== '');
  }

  function emailValido(email) {
    const arroba = email.indexOf('@');
    const ponto = email.lastIndexOf('.');
    return arroba > 0 && ponto > arroba + 1 && ponto < email.length - 1 && !email.includes(' ');
  }

  form.addEventListener('submit', function (evento) {
    evento.preventDefault();
    sucesso.textContent = '';
    let ok = true;
    campos.forEach(function (id) { mostrarErro(id, ''); });

    const nome = document.getElementById('nome').value.trim();
    const email = document.getElementById('email').value.trim();
    const mensagem = document.getElementById('mensagem').value.trim();

    if (nome === '') { mostrarErro('nome', 'Digite seu nome.'); ok = false; }
    if (email === '') { mostrarErro('email', 'Digite seu e-mail.'); ok = false; }
    else if (!emailValido(email)) { mostrarErro('email', 'Digite um e-mail válido, como nome@exemplo.com.'); ok = false; }
    if (mensagem === '') { mostrarErro('mensagem', 'Escreva sua mensagem.'); ok = false; }

    if (ok) {
      sucesso.textContent = 'Recebemos sua mensagem, ' + nome + '. Que Deus abençoe você!';
      form.reset();
    }
  });
})();

// 4) Botão "Voltar ao topo" (index.html)
(function () {
  const botao = document.getElementById('voltar-topo');
  if (!botao) return;
  window.addEventListener('scroll', function () {
    botao.classList.toggle('visivel', window.scrollY > 300);
  });
  botao.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();

// 5) Banner rotativo (index.html)
(function () {
  const carrossel = document.querySelector('.carrossel');
  if (!carrossel) return;

  const slides = carrossel.querySelectorAll('.slide');
  const pontos = carrossel.querySelector('.pontos');
  let atual = 0;
  let timer;

  slides.forEach(function (_, i) {
    const b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    b.addEventListener('click', function () { ir(i); reiniciar(); });
    pontos.appendChild(b);
  });

  function ir(i) {
    atual = (i + slides.length) % slides.length;
    slides.forEach(function (s, n) { s.classList.toggle('ativo', n === atual); });
    pontos.querySelectorAll('button').forEach(function (b, n) { b.classList.toggle('ativo', n === atual); });
  }
  function reiniciar() {
    clearInterval(timer);
    timer = setInterval(function () { ir(atual + 1); }, 7000);
  }

  ir(0);
  reiniciar();
})();

// 6) Versículo do dia com botão "Outro versículo"
(function () {
  const botao = document.getElementById('outro');
  const texto = document.getElementById('verso');
  const ref = document.getElementById('ref');
  if (!botao || !texto || !ref) return;

  const versiculos = [
    ['Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.', 'Mateus 11:28'],
    ['O Senhor é o meu pastor, nada me faltará.', 'Salmos 23:1'],
    ['Posso todas as coisas em Cristo que me fortalece.', 'Filipenses 4:13'],
    ['Lâmpada para os meus pés é tua palavra, e luz para o meu caminho.', 'Salmos 119:105'],
    ['Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.', '1 Pedro 5:7'],
    ['Não temas, porque eu sou contigo; não te assombres, porque eu sou o teu Deus.', 'Isaías 41:10'],
    ['O amor é sofredor, é benigno; o amor não é invejoso.', '1 Coríntios 13:4']
  ];
  let i = 0;

  botao.addEventListener('click', function () {
    i = (i + 1) % versiculos.length;
    texto.textContent = '"' + versiculos[i][0] + '"';
    ref.textContent = versiculos[i][1];
  });
})();