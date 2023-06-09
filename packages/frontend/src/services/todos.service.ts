import { APP_KEYS } from '../modules/common/consts';
import { ITodo, ITodoCreate } from '../modules/common/types';
import HttpService from './http.service';

class TodoService extends HttpService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  getAllTodos(): Promise<ITodo[]> {
    return this.get(
      {
        url: APP_KEYS.BACKEND_KEYS.TODOS
      },
      true
    );
  }

  getOneTodo(todoId: string): Promise<ITodo> {
    return this.get(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${todoId}`
      },
      true
    );
  }

  createTodo(todo: ITodoCreate): Promise<ITodo> {
    return this.post(
      {
        url: APP_KEYS.BACKEND_KEYS.TODOS,
        data: todo
      },
      true
    );
  }

  editTodo(todo: ITodo): Promise<ITodo> {
    return this.put(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}/${todo.id}`,
        data: { ...todo, id: undefined }
      },
      true
    );
  }

  deleteTodo(todoId: string): Promise<ITodo> {
    return this.delete(
      {
        url: `todos/${todoId}`
      },
      true
    );
  }
}

const todoService = new TodoService();
export default todoService;
