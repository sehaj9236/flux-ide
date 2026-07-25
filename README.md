# Flux IDE
 
Flux is a cloud code editor that runs entirely in the browser. It gives developers instant cloud workspaces, ready-made project templates, and an integrated set of development tools (editor, terminal, live preview) — no local setup required.
 

 
## Features
 
- 🗂️ **Cloud workspaces** — create, star, and manage isolated coding workspaces tied to your account
- ⚡ **Project templates** — spin up a new workspace from a curated set of starters (React, Next.js, Express, Vue, Hono, Angular, and more)
- 🖥️ **In-browser dev environment** — powered by WebContainers, so Node.js apps install dependencies and run entirely client-side
- ✍️ **Monaco-based editor** — the same editor that powers VS Code, with a configurable theme, font, tab size, and autosave strategy
- ⌨️ **Integrated terminal** — full terminal access via xterm.js inside the workspace
- 🔐 **Authentication** — user accounts and session management via Clerk
## Tech Stack
 
**Frontend (`/flux`)**
- [Next.js 16](https://nextjs.org/) + React 19
- [Clerk](https://clerk.com/) for authentication
- [Monaco Editor](https://microsoft.github.io/monaco-editor/) (`@monaco-editor/react`)
- [WebContainers API](https://webcontainers.io/) for in-browser Node.js execution
- [xterm.js](https://xtermjs.org/) for the integrated terminal
- Tailwind CSS 4, Radix UI primitives, styled-components
**Backend (`/backend`)**
- Node.js + [Express 5](https://expressjs.com/)
- [Prisma ORM](https://www.prisma.io/) with PostgreSQL
- [Clerk](https://clerk.com/) SDK + webhooks (via Svix) for auth and user sync
- Vendored [StackBlitz project starters](https://github.com/stackblitz/starters) used as workspace templates
## Project Structure
 
```
flux-ide/
├── backend/                # Express API server
│   ├── src/
│   │   ├── controller/     # Request handlers (workspace, template, webhook, ...)
│   │   ├── route/          # Express routers
│   │   ├── service/        # Business logic
│   │   ├── middleware/     # Auth middleware (Clerk)
│   │   ├── db/              # Prisma client
│   │   └── server.js       # App entrypoint
│   ├── prisma/
│   │   └── schema.prisma   # Data models (User, Workspace, TemplateFile, ...)
│   └── starters-main/       # Vendored project starter templates
│
└── flux/                    # Next.js frontend
    └── src/
        ├── app/             # App Router pages (dashboard, playground, sign-in/up)
        ├── components/
        ├── context/
        ├── hooks/
        └── lib/
```
 
## Data Model
 
Defined in `backend/prisma/schema.prisma`:
 
- **User** — synced from Clerk, owns workspaces and personal settings
- **UserSettings** — editor preferences (theme, font, tab size, autosave strategy)
- **Workspace** — a project instance created from a `Template` (React, Next.js, Express, Vue.js, Hono, Angular)
- **TemplateFile** — the file tree/content snapshot for a workspace
- **StarredWorkspace** — lets users star/favorite workspaces
## Getting Started
 
### Prerequisites
 
- Node.js (LTS recommended)
- A PostgreSQL database
- A [Clerk](https://clerk.com/) application (for auth keys and webhook secrets)
### 1. Clone the repo
 
```bash
git clone https://github.com/sehaj9236/flux-ide.git
cd flux-ide
```
 
### 2. Backend setup
 
```bash
cd backend
npm install
```
 
Create a `.env` file in `backend/`:
 
```env
PORT=8000
NODE_ENV=development
DATABASE_URL="postgresql://user:password@localhost:5432/flux_ide"
FRONTEND_URL="http://localhost:3000"
 
# Clerk
CLERK_SECRET_KEY=
CLERK_PUBLISHABLE_KEY=
CLERK_WEBHOOK_SECRET_C=      # webhook secret: user.created
CLERK_WEBHOOK_SECRET_D=      # webhook secret: user.deleted
CLERK_WEBHOOK_SECRET_UPDATE= # webhook secret: user.updated
```
 
Run Prisma migrations and start the dev server:
 
```bash
npx prisma migrate dev
npm run dev
```
 
### 3. Frontend setup
 
```bash
cd flux
npm install
```
 
Create a `.env.local` file in `flux/`:
 
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
NEXT_PUBLIC_BACKEND_URL="http://localhost:8000"
```
 
Start the dev server:
 
```bash
npm run dev
```
 
Open [http://localhost:3000](http://localhost:3000) in your browser.
 
## Contributing
 
This project is under active development. Issues and pull requests are welcome.
 
## License
 
No license has been specified yet for this repository. Until one is added, all rights are reserved by the author.
