// =====================
//  SS Tech — Catálogo JS
// =====================

// ----- SAUDAÇÃO -----
function saudacao() {
  const hora = new Date().getHours();
  if (hora >= 5 && hora < 12) return 'Bom dia';
  if (hora >= 12 && hora < 18) return 'Boa tarde';
  return 'Boa noite';
}

// ----- FILTROS -----
document.querySelectorAll('.filtro-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const cat = btn.dataset.categoria;
    document.querySelectorAll('.card').forEach(card => {
      if (cat === 'todos' || card.dataset.categoria === cat) {
        card.classList.remove('oculto');
      } else {
        card.classList.add('oculto');
      }
    });
  });
});

// ----- GALERIA -----
let fotoAtual = 0;
let fotosGaleria = [];

function atualizarFoto(index) {
  fotoAtual = index;
  const img = document.getElementById('modal-img');
  img.src = '/' + fotosGaleria[fotoAtual];
  img.onerror = function() {
    this.src = 'https://placehold.co/400x400/111827/4ade80?text=📦+Foto+em+breve';
  };

  // Atualiza miniaturas ativas
  document.querySelectorAll('.thumb').forEach((t, i) => {
    t.classList.toggle('thumb-ativa', i === fotoAtual);
  });

  // Mostra/esconde setas
  document.getElementById('galeria-prev').style.display = fotosGaleria.length > 1 ? 'flex' : 'none';
  document.getElementById('galeria-next').style.display = fotosGaleria.length > 1 ? 'flex' : 'none';
}

function mudarFoto(direcao) {
  const total = fotosGaleria.length;
  const novo = (fotoAtual + direcao + total) % total;
  atualizarFoto(novo);
}

function montarThumbs() {
  const container = document.getElementById('galeria-thumbs');
  container.innerHTML = '';

  if (fotosGaleria.length <= 1) return;

  fotosGaleria.forEach((foto, i) => {
    const img = document.createElement('img');
    img.src = '/' + foto;
    img.className = 'thumb' + (i === 0 ? ' thumb-ativa' : '');
    img.onclick = (e) => { e.stopPropagation(); atualizarFoto(i); };
    img.onerror = function() {
      this.src = 'https://placehold.co/80x80/111827/4ade80?text=📦';
    };
    container.appendChild(img);
  });
}

// ----- MODAL -----
async function abrirModal(id) {
  try {
    const res = await fetch(`/api/produtos/${id}`);
    const p = await res.json();

    // Suporte a "imagens" (lista) e "imagem" (string) para compatibilidade
    fotosGaleria = p.imagens || (p.imagem ? [p.imagem] : []);
    fotoAtual = 0;

    atualizarFoto(0);
    montarThumbs();

    document.getElementById('modal-cat').textContent = p.categoria;
    document.getElementById('modal-nome').textContent = p.nome;
    document.getElementById('modal-preco').textContent = `R$ ${p.preco.toFixed(2).replace('.', ',')}`;
    document.getElementById('modal-desc').textContent = p.descricao;

    const lista = document.getElementById('modal-detalhes');
    lista.innerHTML = '';
    p.detalhes.forEach(d => {
      const li = document.createElement('li');
      li.textContent = d;
      lista.appendChild(li);
    });

    // Mensagem pré-definida no WhatsApp
    const mensagem = `${saudacao()}, estou interessado no item ${p.nome} - R$ ${p.preco.toFixed(2).replace('.', ',')}`;
    const linkWhats = `https://wa.me/5577998073775?text=${encodeURIComponent(mensagem)}`;
    document.querySelector('.btn-whatsapp').href = linkWhats;

    document.getElementById('modal-overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  } catch (e) {
    console.error('Erro ao carregar produto:', e);
  }
}

function fecharModal() {
  document.getElementById('modal-overlay').classList.remove('open');
  document.body.style.overflow = '';
}

// Fechar com ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') fecharModal();
});

// ----- BUSCA EM TEMPO REAL -----
document.getElementById('busca').addEventListener('input', function() {
  const termo = this.value.toLowerCase().trim();

  document.querySelectorAll('.card').forEach(card => {
    const nome = card.querySelector('.card-nome').textContent.toLowerCase();
    const cat = card.querySelector('.card-cat').textContent.toLowerCase();

    if (nome.includes(termo) || cat.includes(termo)) {
      card.classList.remove('oculto');
    } else {
      card.classList.add('oculto');
    }
  });

  if (termo.length > 0) {
    document.querySelectorAll('.filtro-btn').forEach(b => b.classList.remove('active'));
  } else {
    document.querySelector('[data-categoria="todos"]').classList.add('active');
  }
});