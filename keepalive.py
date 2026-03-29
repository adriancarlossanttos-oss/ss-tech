import requests
import time
from datetime import datetime

URL = "https://ss-tech-l1rz.onrender.com"  # troca pelo seu link do Render
INTERVALO = 300  # 5 minutos em segundos

print(f"🟢 Keep-alive iniciado para {URL}")

while True:
    try:
        resposta = requests.get(URL, timeout=30)
        hora = datetime.now().strftime("%H:%M:%S")
        print(f"[{hora}] ✅ Site acordado! Status: {resposta.status_code}")
    except Exception as e:
        hora = datetime.now().strftime("%H:%M:%S")
        print(f"[{hora}] ❌ Erro ao acessar o site: {e}")

    time.sleep(INTERVALO)