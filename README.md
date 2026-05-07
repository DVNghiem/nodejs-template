# Node Template

A production-ready Node.js + TypeScript backend template built on **Express 5**, **TypeORM**, **Redis**, and **Inversify**. It ships with a layered architecture (`@core` / `api`), opinionated tooling (ESLint, Prettier, Husky, commitlint, lint-staged), Docker support, and scaffolding scripts to speed up day-to-day development.

## Features

- **Express 5** HTTP server with `helmet`, `cors`, `cookie-parser`, and `morgan` preconfigured
- **TypeScript** with path aliases (`@core/*`, `@api/*`, `@env/*`)
- **TypeORM** (PostgreSQL) as the default ORM, with optional **Mongoose**, **Knex**, and **Objection.js**
- **Redis** integration out of the box
- **Inversify** for dependency injection
- **JWT** authentication (`jsonwebtoken`) and **bcrypt** password hashing
- **Joi** request validation
- **Swagger** (`swagger-jsdoc` + `swagger-ui-express`) for API docs
- **Winston** structured logging
- File handling via **Multer** + **Cloudinary**, email via **Nodemailer**, Excel via **xlsx**
- **ESLint + Prettier + Husky + commitlint + lint-staged** preconfigured
- **Docker** ready (`Dockerfile`, `.dockerignore`)
- Code-generation scripts for repositories (Mongoose core / API extends)

## Requirements

- **Node.js** `>= 24.0.0`
- **npm** `>= 11.0.0`
- **PostgreSQL** (default) and **Redis** running locally or remotely

## Project Structure

```text
.
├── env/                    # Per-environment .env files (local, develop, production)
├── src/
│   ├── @core/              # Shared core layer
│   │   ├── application/    # Middlewares, routes, controllers shared across modules
│   │   ├── database/       # TypeORM DataSource + migrations
│   │   ├── domain/         # Entities, DTOs, enums shared across modules
│   │   └── infrastructure/ # bcrypt, jwt, logger, redis, swagger, multer, etc.
│   ├── api/                # Feature modules (clean-architecture style)
│   │   ├── application/    # controllers, handlers, middlewares, routes
│   │   ├── domain/
│   │   └── infrastructure/
│   ├── index.ts            # App bootstrap (Express + DataSource + Redis)
│   └── router.ts           # Top-level route composition
├── tools/scripts/          # Build + scaffolding scripts
├── Dockerfile
├── tsconfig.json
└── package.json
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

This also runs `husky` via the `prepare` script to install Git hooks.

### 2. Configure environment

Environment files live in `env/` and are selected via `NODE_ENV` (defaults to `local`):

- `env/local.env`
- `env/develop.env`
- `env/production.env`

Update database, Redis, and JWT secrets to match your setup. Example (`env/local.env`):

```env
PROJECT_NAME=node
PORT=3000

DB_CLIENT=postgres
DB_HOST=localhost
DB_PORT=5432
DB_USER=your_user
DB_PASSWORD=your_password
DB_NAME=your_db

REDIS_URL=redis://localhost:6379
JWT_SECRECT_ACCESS_TOKEN=replace-me
JWT_SECRECT_REFRESH_TOKEN=replace-me
```

> Secrets in the committed `env/local.env` are placeholders. Rotate them before deploying anywhere real.

### 3. Run the app

```bash
npm run local      # nodemon + ts-node, watches src/
npm run develop    # NODE_ENV=develop
npm run build      # compile TypeScript to dist/
npm run start      # run compiled output from dist/
npm run deploy     # alias for npm run start
```

By default the server listens on `http://localhost:3000`.

## Database (TypeORM)

The default DataSource is PostgreSQL, configured in `src/@core/database/index.ts`. Migrations live in `src/@core/database/migrations/`.

```bash
npm run migrate:generate    # generate a migration from entity diffs
npm run migrate:run         # apply pending migrations
npm run migrate:show        # list migration status
npm run migrate:revert      # revert last migration
npm run migrate:export      # dry-run / export SQL
npm run seed:run            # run tools/scripts/seed.ts
```

Mongoose, Knex, and Objection.js are also installed and can be enabled by uncommenting the relevant imports in `src/index.ts`.

## Code Generation

Scaffolding scripts (under `tools/scripts/`) help create repositories quickly:

```bash
npm run core:repository:create -- <RepositoryName>
npm run api:repository:create  -- <RepositoryName>
```

## Linting, Formatting & Commits

```bash
npm run lint           # ESLint (max-warnings 0)
npm run lint:fix       # ESLint with autofix
npm run prettier       # Prettier write across the repo
npm run lint:staged    # run lint-staged manually
```

Git hooks are managed by Husky:

- `pre-commit` &rarr; `lint-staged` (Prettier + ESLint on staged `.ts` files)
- `commit-msg` &rarr; `commitlint` (Conventional Commits enforced via `commitlint.config.js`)
- `prepare-commit-msg` &rarr; commit message helper

## Docker

Build and run the production image:

```bash
docker build -t node-template .
docker run --rm -p 3000:3000 --env-file env/production.env node-template
```

The image uses `node:24-alpine`, runs `npm ci`, builds TypeScript, and starts via `npm run start` with `NODE_ENV=production`.

## API Routing

Routes are composed in `src/router.ts`:

- `/` &rarr; feature modules under `src/api/application/routes`
- `/core` &rarr; shared endpoints under `src/@core/application/routes`
- A central `errorHandler` middleware terminates the chain.

Add a new feature module by creating a folder under `src/api/<module>/` mirroring the `application / domain / infrastructure` layout, then register its routes in `src/api/application/routes`.

## Scripts Reference

| Script                   | Description                                          |
| ------------------------ | ---------------------------------------------------- |
| `build`                  | Compile TypeScript via `tools/scripts/build.js`      |
| `start`                  | Run compiled app from `dist/` with path-alias loader |
| `local` / `develop`      | Dev mode with `nodemon` + `ts-node`                  |
| `lint` / `lint:fix`      | ESLint check / autofix                               |
| `prettier`               | Format the entire repo                               |
| `migrate:*`              | TypeORM migration commands                           |
| `seed:run`               | Run the seed script                                  |
| `core:repository:create` | Generate a Mongoose core repository                  |
| `api:repository:create`  | Generate a Mongoose API repository (extends core)    |
| `commitlint`             | Validate the current commit message                  |

## License

ISC
