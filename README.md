# INCHAPIN

Маркетинговый (lead-gen) сайт жилого комплекса бизнес-класса на **Next.js 16 (App Router) + React 19 + TypeScript**. Стили — SCSS-модули + дизайн-система на CSS-переменных. Деплой — standalone-образ Docker.

## Требования

- Node.js **20.9+** (см. `engines` в `package.json`)
- npm (проект использует `package-lock.json`; менеджеры yarn/pnpm/bun не поддерживаются)

## Быстрый старт

```bash
cp .env.example .env.local   # заполнить переменные (см. ниже)
npm install
npm run dev                  # http://localhost:3000
```

## Скрипты

| Команда             | Назначение                                  |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Дев-сервер с HMR                            |
| `npm run build`     | Прод-сборка (`output: standalone`)          |
| `npm run start`     | Запуск собранного приложения               |
| `npm run lint`      | ESLint (flat config, `eslint.config.mjs`)   |
| `npm run typecheck` | Проверка типов (`tsc --noEmit`)             |
| `npm run check`     | `lint` + `typecheck` (используется в CI)     |

## Переменные окружения

Валидируются через zod в `config/env.ts` — приложение **падает при старте**, если обязательная переменная отсутствует или некорректна (fail-fast). Полный список — в `.env.example`.

| Переменная          | Обяз. | Формат            | Назначение                                             |
| ------------------- | ----- | ----------------- | ------------------------------------------------------ |
| `SITE_URL`          | да    | полный URL        | Базовый origin для metadata, `sitemap.ts`, `robots.ts` |
| `SITE_NAME`         | да    | непустая строка   | Имя сайта в метаданных                                 |
| `LEADS_WEBHOOK_URL` | нет   | полный URL        | Приёмник заявок формы (CRM/webhook)                    |

> **Важно:** `SITE_URL`/`SITE_NAME` **впекаются в пререндер** (metadata/sitemap/robots) на этапе `build`. Смена origin требует пересборки образа, а не только рантайм-переопределения. В Docker передавайте их через `--build-arg` / `build.args` в compose.

> **Заявки:** если `LEADS_WEBHOOK_URL` не задан, форма не доставляет заявку. Задавайте переменную в проде. Rate-limit формы (`lib/rate-limit.ts`) — in-memory и рассчитан на один инстанс; для нескольких инстансов замените на Redis/Upstash.

## Структура проекта

```
app/                     App Router: страницы, layout, robots.ts, sitemap.ts,
  @modal/(.)form/        intercepting-route модал формы (parallel slot)
  api/health/            health-эндпоинт для контейнера
components/
  blocks/                секции страниц (hero, about, form)
  layout/                каркас (header, burger-menu)
  ui/                    примитивы (button, input, select, modal, text, video, ...)
  icons/                 SVG-иконки
config/                  env.ts (zod), routes.ts, site.ts
data/                    статический контент (apartments, contacts, home, ui)
lib/                     утилиты (cn, rate-limit)
styles/                  дизайн-система (SCSS: variables → :root, mixins, reset)
```

Ключевые настройки `next.config.ts`: `output: "standalone"`, `reactCompiler`, `typedRoutes`, AVIF/WebP-оптимизация изображений, security-заголовки (CSP, HSTS, X-Frame-Options и др.).

## Docker

```bash
# сборка + запуск через compose (передаёт build.args и environment)
SITE_URL=https://inchapin.ru SITE_NAME=INCHAPIN docker compose up --build

# либо напрямую
docker build --build-arg SITE_URL=https://inchapin.ru --build-arg SITE_NAME=INCHAPIN -t inchapin .
docker run -p 3000:3000 -e SITE_URL=https://inchapin.ru -e SITE_NAME=INCHAPIN inchapin
```

Образ: multi-stage, non-root пользователь `nextjs`, `HEALTHCHECK` на `/api/health`. Compose задаёт healthcheck и лимиты ресурсов.

## CI

`.github/workflows/ci.yml`: `npm ci` → `lint` → `typecheck`, затем гейт сборки Docker-образа. Тесты пока не настроены — при добавлении включите `npm test` в job `quality`.
