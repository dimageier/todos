# todos

A clean, minimal todo app built with **React 19 + TypeScript + Vite + Tailwind CSS v4** and localStorage persistence.

## Features

- ✨ Add new tasks (Enter or + button)
- ✅ Mark tasks complete / incomplete with a beautiful custom checkbox
- 🗑️ Delete tasks (trash icon reveals on hover)
- 🔎 Filters: All / Active / Completed
- 🧹 One-click "Clear completed"
- 💾 Everything persists automatically in localStorage
- 📱 Responsive, accessible, and polished

## Live Demo

Coming soon — deployed version will be linked here.

## Getting Started

```bash
git clone https://github.com/dimageier/todos.git
cd todos
npm install
npm run dev
```

Open http://localhost:5173 and start adding tasks!

## Scripts

| Command          | Description                  |
|------------------|------------------------------|
| `npm run dev`    | Start the dev server         |
| `npm run build`  | Production build (`dist/`)   |
| `npm run preview`| Preview the production build |
| `npm run lint`   | Run ESLint                   |

## Tech

- React 19 + TypeScript
- Vite 8
- Tailwind CSS v4 (`@tailwindcss/vite`)
- lucide-react icons
- 100% client-side with `localStorage`

## Project Layout

```
src/
├── App.tsx
├── components/TodoItem.tsx
├── types.ts
├── index.css
└── main.tsx
```

## Data Shape

```ts
type Todo = {
  id: string;
  text: string;
  completed: boolean;
};
```

Stored as JSON under the `"todos"` key.

---

Built with ❤️ as a clean example of modern React + Tailwind.
