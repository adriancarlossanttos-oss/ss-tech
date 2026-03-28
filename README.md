# 🛍️ SS Tech — Catálogo de Produtos

Site catálogo para a loja SS Tech, feito com Python + Flask.

---

## 📁 Estrutura do projeto

```
ss_tech/
├── app.py               ← servidor Flask
├── produtos.json        ← seus produtos ficam aqui
├── requirements.txt
├── templates/
│   └── index.html
└── static/
    ├── css/style.css
    ├── js/main.js
    └── imagens/         ← coloque as fotos dos produtos aqui
```

---

## 🚀 Como rodar

### 1. Instale as dependências
```bash
pip install -r requirements.txt
```

### 2. Rode o servidor
```bash
python app.py
```

### 3. Acesse no navegador
```
http://localhost:5000
```

---

## 📦 Como adicionar produtos

Edite o arquivo `produtos.json`. Cada produto tem este formato:

```json
{
  "id": 7,
  "nome": "Nome do Produto",
  "categoria": "Fones de Ouvido",
  "preco": 199.90,
  "descricao": "Descrição completa do produto...",
  "detalhes": ["Característica 1", "Característica 2", "Característica 3"],
  "imagem": "imagens/nome-da-foto.jpg",
  "destaque": false
}
```

---

## 🖼️ Como adicionar fotos

1. Coloque as fotos na pasta `static/imagens/`
2. No `produtos.json`, aponte o campo `"imagem"` para o arquivo:
   ```json
   "imagem": "imagens/meu-fone.jpg"
   ```
3. Formatos suportados: `.jpg`, `.jpeg`, `.png`, `.webp`

> **Dica:** Se não tiver foto ainda, o site mostra um placeholder automaticamente.

---

## 📲 WhatsApp

No arquivo `templates/index.html`, troque o número no botão de contato:
```html
<a href="https://wa.me/55SEU_NUMERO_AQUI" ...>
```
Exemplo: `https://wa.me/5577999998888`

---

## 🗂️ Categorias disponíveis

As categorias aparecem automaticamente baseadas no que está no `produtos.json`.
Exemplos usados: `Fones de Ouvido`, `Relógios`, `Caixinhas`

Você pode criar qualquer categoria nova só adicionando produtos com ela!
