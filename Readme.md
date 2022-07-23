Ben-vind@s! 

https://tradingrobot.herokuapp.com/

# Essa API é um bot para fazer trader na Binance

- Para utilizar ele tem que criar um arquivo ".env" com os dados do arquivo ".env.example".

<!-- MODO TESTE -->

- Para operar em modo "teste" você pode criar as suas chaves testes nesse link: "https://testnet.binance.vision" e no arquivo ".env" utilizar "API_URL=https://testnet.binance.vision/api", "CRAWLER_INTERVAL=6000" e "SYMBOL=BNBBUSD".


<!-- MODO DADOS PESSOAIS -->

- Caso você precise operar com seus dados reais da sua conta Binance, precisa gerar suas chaves aqui: "https://www.binance.com/pt-BR/my/settings/api-management" e no arquivo ".env" utilizar "API_URL=https://api.binance.com/api", "CRAWLER_INTERVAL=3000" e "SYMBOL=BTCUSDT" (pode ser qualer symbol).


<!-- PARA RODAR A API -->

- Para instalar os pacotes: "npm ci".

- Para rodar a API: "npm run dev" / "npm start".