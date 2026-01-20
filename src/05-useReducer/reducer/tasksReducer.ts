import * as z from 'zod';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TaskState {
  todos: Todo[];
  length: number;
  completed: number;
  pending: number;
}

export type TaskAction =
  | { type: 'ADD_TODO'; payload: string }
  | { type: 'DELETE_TODO'; payload: number }
  | { type: 'TOGGLE_TODO'; payload: number };

const TodoSchema = z.object({
  id: z.number(),
  text: z.string(),
  completed: z.boolean(),
});

const TaskStateSchema = z.object({
  todos: z.array(TodoSchema),
  length: z.number(),
  completed: z.number(),
  pending: z.number(),
});

export const getTasksInitialState = (): TaskState => {
  const localStorageState = localStorage.getItem('tasks-state');

  if (!localStorageState) {
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  // Validar el estado con Zod
  const result = TaskStateSchema.safeParse(JSON.parse(localStorageState));
  if (result.error) {
    console.log(result.error);
    return {
      todos: [],
      length: 0,
      completed: 0,
      pending: 0,
    };
  }

  // !OJO: Tener cuidado, porque el objeto puede haber sido manipulado manualmente en el localStorage
  // return JSON.parse(localStorageState);
  return result.data;
};

export const tasksReducer = (
  state: TaskState,
  action: TaskAction,
): TaskState => {
  switch (action.type) {
    case 'ADD_TODO': {
      const newTodo: Todo = {
        id: Date.now(),
        text: action.payload,
        completed: false,
      };

      // !OJO: Nunca se debe mutar el estado, no hacer esto:
      // state.todos.push(newTodo);

      return {
        ...state,
        todos: [...state.todos, newTodo],
        length: state.todos.length + 1,
        pending: state.pending + 1,
      };
    }

    case 'DELETE_TODO': {
      const currentTodos = state.todos.filter(
        (todo) => todo.id !== action.payload,
      );

      const completedTodos = currentTodos.filter(
        (todo) => todo.completed,
      ).length;

      return {
        ...state,
        todos: currentTodos,
        completed: completedTodos,
        pending: currentTodos.length - completedTodos,
        length: state.todos.length - 1,
      };
    }

    case 'TOGGLE_TODO': {
      const updatedTodos = state.todos.map((todo) => {
        if (todo.id === action.payload) {
          return { ...todo, completed: !todo.completed };
        }
        return todo;
      });

      return {
        ...state,
        todos: updatedTodos,
        completed: updatedTodos.filter((todo) => todo.completed).length,
        pending: updatedTodos.filter((todo) => !todo.completed).length,
      };
    }

    default:
      return state;
  }
};
