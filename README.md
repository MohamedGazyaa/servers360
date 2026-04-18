# Servers360

A real-time server monitoring dashboard built with Next.js. This project is my submission for the frontend task provided by Xorithm.

## Running the Application

**1. Install dependencies**

```bash
npm install
```

**2. Set up environment variables**

Create a `.env.local` file in the project root with the following:

```env
AUTH_SECRET=your_auth_secret        # generate with: openssl rand -base64 32
AUTH_GOOGLE_ID=your_google_client_id
AUTH_GOOGLE_SECRET=your_google_client_secret
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
MOCKAPI_BASE_URL=https://your-mockapi-url/api
```

**3. Start the development server**

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser. You will be redirected to the login page.

**4. Build for production**

```bash
npm run build
npm start
```

## MockAPI Endpoints

Base URL: `https://69e3aa6e3327837a1553650d.mockapi.io/api`

### Servers

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/servers` | Get all servers. Supports `?status=`, `?sortBy=`, `?order=` query params |
| `GET` | `/servers/:id` | Get a single server by ID |
| `POST` | `/servers` | Create a new server |

### Users

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/users?email=` | Find a user by email (used for credentials login) |
| `POST` | `/users` | Create a new user (signup) |

## Implementation Overview

### Tech Stack

- **Next.js** 
- **NextAuth** 
- **Tailwind CSS**
- **MockAPI** 

### Architecture

The app uses Next.js route groups to separate concerns:

- `(auth)` — login and signup pages with their own minimal layout
- `(dashboard)` — all protected pages sharing a layout with sidebar navigation

Authentication is enforced at the layout level: the dashboard layout checks the session on the server and redirects unauthenticated users to `/login`.

### Key Design Choices

**Server components by default.** Data fetching (server list, server detail) happens on the server via `lib/api.js`, keeping API calls and environment variables out of the client bundle. Only interactive components (forms, sidebar, filters) are client components.

**Server Actions for mutations.** The Add Server form uses a Next.js Server Action with `useActionState` for inline validation errors and loading state without a separate API route.

**Location validation.** When adding a server, the city and country fields are validated against the OpenStreetMap Nominatim API server-side to confirm a real location before saving.

**Responsive layout.** On desktop the sidebar is always visible. On mobile it collapses into a fixed top navbar with a burger menu that opens a slide-in drawer.

**Accessibility.** All interactive elements include appropriate ARIA attributes: `role="alert"` on errors, `aria-pressed` on filter buttons, `role="dialog"` on the mobile drawer, `aria-current="page"` on active nav links, `aria-hidden` on decorative SVGs, and proper `<label>`/`id` associations on all form inputs. Stat cards use `<dl>/<dt>/<dd>` and server lists use `<ul>/<li>` for semantic markup.

### Project Structure

```
src/
├── app/
│   ├── (auth)/          
│   ├── (dashboard)/     
│   │   ├── dashboard/   
│   │   └── servers/     
│   └── api/             
├── auth.js              
├── components/
│   ├── auth/            
│   ├── dashboard/       
│   └── ui/              
└── lib/
    └── api.js           
```
