# Favela Data

O **Favela Data** é um projeto em desenvolvimento baseado nos dados coletados pela pesquisa do laboratório LEC/Prourb. O objetivo é organizar e apresentar informações relacionadas às favelas, com ênfase no uso de dados geoespaciais, para fornecer insights e visualizações úteis.

## Backend

O backend do projeto é construído com **Node.js** e utiliza o banco de dados **PostgreSQL**. Para garantir o suporte a dados geoespaciais, o PostgreSQL requer a extensão **PostGIS**.

### Banco de Dados

- O banco de dados utilizado é **PostgreSQL** com a extensão **PostGIS**.
- O arquivo `.env` do backend deve conter as seguintes variáveis de ambiente:

```env
    DB_HOST=...
    DB_USER=...
    DB_PASSWORD=...
    DB_NAME=faveladata
    DB_PORT=...
```

## Frontend

O frontend do projeto foi construído com **Vite** e **React**. Ele oferece uma interface interativa para visualizar os dados e insights sobre as favelas. Para a visualização do mapa com os dados, foi utilizada a biblioteca **MapLibre**.

### Rodando o Frontend

1. Para rodar o frontend em desenvolvimento, execute o seguinte comando:

   ```bash
   npm run dev

   ```

1. Para gerar o build de produção, use:

   ```bash
   npm run build
   ```
