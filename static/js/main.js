// =====================
//  SS Tech — Catálogo JS
// =====================

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

// ----- MODAL -----
async function abrirModal(id) {
  try {
    const res = await fetch(`/api/produtos/${id}`);
    const p = await res.json();

    document.getElementById('modal-img').src = `/${p.imagem}`;
    document.getElementById('modal-img').onerror = function() {
      this.src = 'https://placehold.co/400x400/111827/4ade80?text=📦+Foto+em+breve';
    };
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
