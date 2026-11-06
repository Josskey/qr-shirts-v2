# QR Shirts 2.0

Сервис активации футболок с QR-кодами.

## Технологии

- React + Vite
- TypeScript
- Node.js + Express
- PostgreSQL
- Docker Compose

## Запуск через Docker

Сборка и запуск:

```bash
docker compose up -d --build
```

Frontend:

http://localhost:5173

Backend:

http://localhost:4001

Health Check:

http://localhost:4001/health
```

## Остановка

```bash
docker compose down
```

## Перезапуск после изменений

```bash
docker compose up -d --build
```

## Локальная разработка

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## Сборка

### Frontend

```bash
cd frontend
npm run build
```

### Backend

```bash
cd backend
npm run build
```

## Структура проекта

```text
qr-shirts-v2
├── backend
├── frontend
├── database
├── docs
├── docker-compose.yml
└── README.md
```