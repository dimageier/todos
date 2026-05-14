import { Trash2 } from 'lucide-react';
import type { Todo } from '../types';

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <li className="todo-item group flex items-center gap-3 px-4 py-3.5 border-b border-slate-100 last:border-b-0">
      <input
        type="checkbox"
        className="todo-checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
        aria-label={`Mark "${todo.text}" as ${todo.completed ? 'incomplete' : 'complete'}`}
      />

      <span
        className={`flex-1 text-[15px] leading-snug select-none ${
          todo.completed ? 'line-through text-slate-400' : 'text-slate-700'
        }`}
      >
        {todo.text}
      </span>

      <button
        type="button"
        onClick={() => onDelete(todo.id)}
        className="delete-btn p-1.5 text-slate-400 hover:text-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-400 rounded"
<<<<<<< HEAD
        aria-label={`Delete "${todo.text}" `}
=======
        aria-label={`Delete "${todo.text}"`}
>>>>>>> 80379a0 (Initial commit: clean React + Tailwind todo app with localStorage)
      >
        <Trash2 size={17} strokeWidth={2.25} />
      </button>
    </li>
  );
}
