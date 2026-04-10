from flask import Flask, render_template, jsonify, send_from_directory
import json
import os

app = Flask(__name__)

IMAGENS_PASTA = os.path.join(app.static_folder, 'imagens')

def carregar_produtos():
    with open('produtos.json', 'r', encoding='utf-8') as f:
        dados = json.load(f)
    return [p for p in dados if p.get('ativo', True)]

@app.route('/')
def index():
    produtos = carregar_produtos()
    produtos = sorted(produtos, key=lambda p: (not p.get('destaque', False)))
    categorias = sorted(set(p['categoria'] for p in produtos))
    return render_template('index.html', produtos=produtos, categorias=categorias)

@app.route('/api/produtos')
def api_produtos():
    produtos = carregar_produtos()
    return jsonify(produtos)

@app.route('/api/produtos/<int:produto_id>')
def api_produto(produto_id):
    produtos = carregar_produtos()
    produto = next((p for p in produtos if p['id'] == produto_id), None)
    if produto:
        return jsonify(produto)
    return jsonify({'erro': 'Produto não encontrado'}), 404

@app.route('/imagens/<path:filename>')
def produto_imagem(filename):
    return send_from_directory(IMAGENS_PASTA, filename)

if __name__ == '__main__':
    os.makedirs(IMAGENS_PASTA, exist_ok=True)
    print("🚀 SS Tech Catálogo rodando em: http://localhost:5000")
    app.run(debug=True, port=5000)