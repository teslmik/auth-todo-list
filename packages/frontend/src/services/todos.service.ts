import { APP_KEYS } from '../modules/common/consts';
import { ButtonType } from '../modules/common/enums';
import { ITodoQueries, ITodo, ITodoCreate, IAllTodosData } from '../modules/common/types';
import HttpService from './http.service';

class TodoService extends HttpService {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    super();
  }

  getAllTodos({ search, status, page, pageSize }: ITodoQueries): Promise<IAllTodosData> {
    const queryParams: string[] = [];

    if (status !== ButtonType.ALL) {
      queryParams.push(`status=${status}`);
    }
    if (search) {
      queryParams.push(`search=${encodeURIComponent(search)}`);
    }
    if (page) {
      queryParams.push(`page=${encodeURIComponent(page)}`);
    }
    if (pageSize) {
      queryParams.push(`pageSize=${encodeURIComponent(pageSize)}`);
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';

    return this.get(
      {
        url: `${APP_KEYS.BACKEND_KEYS.TODOS}${queryString}`
      },
      true
    );
  }

  getOneTodo(todoId: string): Promise<ITodo & { userId: string }> {
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
