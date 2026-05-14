import { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import type { Todo, Filter } from './types';
import { TodoItem } from './components/TodoItem';

function App() {
  // Initialize from localStorage (lazy initializer avoids effect + setState lint warning)
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const saved = localStorage.getItem('todos');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          return parsed;
        }
      }
    } catch {
      // Ignore corrupted localStorage data
    }
    return [];
  });

  const [filter, setFilter] = useState<Filter>('all');
  const [inputValue, setInputValue] = useState('');

  // Persist todos to localStorage whenever the list changes
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const text = inputValue.trim();
    if (!text) return;

    const newTodo: Todo = {
      id: crypto.randomUUID(),
      text,
      completed: false,
    };

    setTodos((prev) => [...prev, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  // Derived data
  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeCount = todos.filter((t) => !t.completed).length;
  const completedCount = todos.length - activeCount;

  const isEmpty = todos.length === 0;

  const getEmptyMessage = () => {
    if (filter === 'active') return 'No active tasks';
    if (filter === 'completed') return 'No completed tasks yet';
    return 'No tasks yet';
  };

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4 flex items-start justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="flex items-center justify-between mb-6 px-1">
          <h1 className="text-4xl font-semibold tracking-tight text-slate-800">
            todos
          </h1>
          <div className="text-xs font-medium text-slate-400 px-2.5 py-1 bg-white rounded-full border border-slate-200">
            React + Tailwind
          </div>
        </div>

        {/* Main Card */}
        <div className="todo-card bg-white rounded-3xl border border-slate-200 overflow-hidden">
          {/* Add Task Form */}
          <form onSubmit={addTodo} className="flex items-center gap-2 px-4 py-4 border-b border-slate-100">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="What needs to be done?"
              className="flex-1 bg-transparent text-[15px] placeholder:text-slate-400 focus:outline-none px-1 py-1"
              autoFocus
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="flex items-center justify-center w-9 h-9 rounded-2xl bg-indigo-600 text-white disabled:bg-slate-200 disabled:text-slate-400 transition-colors active:scale-[0.985]"
              aria-label="Add task"
            >
              <Plus size={18} strokeWidth={3} />
            </button>
          </form>

          {/* Filters */}
          <div className="flex items-center gap-1 px-4 pt-3 pb-2 bg-slate-50/70 border-b border-slate-100">
            {(['all', 'active', 'completed'] as const).map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={`filter-btn px-3.5 py-1 text-xs font-medium rounded-2xl capitalize transition-all ${
                  filter === f
                    ? 'active bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:bg-white hover:text-slate-800'
                }`}
              >
                {f}
              </button>
            ))}

            <div className="flex-1" />

            {completedCount > 0 && (
              <button
                type="button"
                onClick={clearCompleted}
                className="text-xs font-medium text-slate-500 hover:text-red-600 px-2 py-1 rounded-xl hover:bg-white transition-colors"
              >
                Clear completed
              </button>
            )}
          </div>

          {/* Todo List */}
          <ul className="divide-y divide-slate-100 min-h-[220px]">
            {filteredTodos.length > 0 ? (
              filteredTodos.map((todo) => (
                <TodoItem
                  key={todo.id}
                  todo={todo}
                  onToggle={toggleTodo}
                  onDelete={deleteTodo}
                />
              ))
            ) : (
              <li className="flex flex-col items-center justify-center py-14 px-6 text-center empty-state">
                <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mb-3">
                  {isEmpty ? (
                    <Plus size={22} className="text-slate-300" />
                  ) : (
                    <span className="text-2xl">🎉</span>
                  )}
                </div>
                <p className="font-medium text-slate-400">{getEmptyMessage()}</p>
                {isEmpty && (
                  <p className="text-xs text-slate-400 mt-1">Add your first task above</p>
                )}
              </li>
            )}
          </ul>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3.5 text-xs border-t border-slate-100 bg-white text-slate-500">
            <span>
              {activeCount} {activeCount === 1 ? 'item' : 'items'} left
            </span>

            <span className="text-[10px] text-slate-400">
              {todos.length > 0 && `${completedCount} done`}
            </span>
          </div>
        </div>

        {/* Subtle hint */}
        <p className="text-center text-[10px] text-slate-400 mt-6 tracking-wide">
          Tasks are saved automatically in your browser
        </p>
      </div>
    </div>
  );
}

export default App;
