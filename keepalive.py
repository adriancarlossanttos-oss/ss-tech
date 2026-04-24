import requests
import time
from datetime import datetime

URL = "https://ss-tech-l1rz.onrender.com"
INTERVALO = 600  # 10 minutos
TIMEOUT   = 60   # aumentado pra aguentar o site acordando

print(f"🟢 Keep-alive iniciado para {URL}")

while True:
    try:
        resposta = requests.get(URL, timeout=TIMEOUT)
        hora = datetime.now().strftime("%H:%M:%S")
        print(f"[{hora}] ✅ Site acordado! Status: {resposta.status_code}")
    except requests.exceptions.Timeout:
        hora = datetime.now().strftime("%H:%M:%S")
        print(f"[{hora}] ⏳ Timeout — site demorando pra acordar, tentando de novo em 2 min...")
        time.sleep(120)
        continue
    except Exception as e:
        hora = datetime.now().strftime("%H:%M:%S")
        print(f"[{hora}] ❌ Erro: {e}")

    time.sleep(INTERVALO)