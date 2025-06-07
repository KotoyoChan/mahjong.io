# Backend

This is the backend server for the mahjong.io project, built with [Express](https://expressjs.com/) and [Socket.IO](https://socket.io/). It provides HTTP APIs and real-time communication for the application.

## Features

- REST API with Express
- Real-time communication using Socket.IO
- TypeScript support
- Linting and formatting with ESLint and Prettier

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [pnpm](https://pnpm.io/)

### Installation

```sh
pnpm install
```

### Development

Start the development server with hot-reloading:

```sh
pnpm dev
```

### Build

Compile the TypeScript source:

```sh
pnpm build
```

### Production

Start the compiled server:

```sh
pnpm start
```

### Linting & Formatting

- Lint code: `pnpm lint`
- Fix lint issues: `pnpm lint:fix`
- Format code: Format on save is enabled via Prettier
