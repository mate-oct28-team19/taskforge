import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import './MainPage.scss'

import { ToDo } from '../components/ToDo';
import { ModalAddTodo } from '../components/ModalAddTodo';
import { ModalChangeTodo } from '../components/ModalChangeTodo';
import { Settings } from '../components/Settings';

import { ThemeContext } from '../../../contexts/ThemeContext';
import { LangContext } from '../../../contexts/LangContext';
import { TokenContext } from '../../../contexts/TokenContext';
import { AuthContext } from '../../../contexts/AuthContext';

import { ToDoMethods } from '../classes/ToDoMethods';
import { translator } from '../../../translator';
import { TodoService } from '../api/TodoService';

import { Todo } from '../types/Todo';
import { Task } from '../types/Task';
import { Board } from '../types/Board';
import { Status } from '../types/Status';

interface Props {
  settingsWinIsOpened: boolean;
  closeSettings: () => void;
}

export const MainPage: React.FC<Props> = ({ settingsWinIsOpened, closeSettings }) => {
  const [boards, setBoards] = useState<Board[]>([
    { board_id: 1, board_title: 'To Do', items: [] as Task[] },
    { board_id: 2, board_title: 'In Process', items: [] as Task[] },
    { board_id: 3, board_title: 'Done', items: [] as Task[] }
  ]);

  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
  const [modalChangeTodoIsOpened, setModalChangeTodoIsOpened] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');
  const [changedTodoTitle, setChangedTodoTitle] = useState<string>('');
  const [statusOfTodo, setStatusOfTodo] = useState(Status.TODO)

  const [currentBoard, setCurrentBoard] = useState<Board | null>(null);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [selectedIdTodo, setSelectedIdTodo] = useState<Task['id']>(0);

  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);
  const { token, setToken } = useContext(TokenContext);
  const { setAuth } = useContext(AuthContext);

  const translate = translator[lang].dashboard;

  useEffect(() => {
    TodoService.get(token, setBoards, setAuth, setToken);
  }, [setAuth, setToken, token]);

  const deleteTodoHandler = (todoId: Todo['id']) => {
    const deleteTodoLocal = (todoId: Todo['id']) => {
      const boardsCopy = [...boards];
      const updatedTasksTodo = boardsCopy[0].items.filter(todo => todo.id !== todoId);
      const updatedTasksInProcess = boardsCopy[1].items.filter(todo => todo.id !== todoId);
      const updatedTasksDone = boardsCopy[2].items.filter(todo => todo.id !== todoId);
      
      boardsCopy[0].items = updatedTasksTodo;
      boardsCopy[1].items = updatedTasksInProcess;
      boardsCopy[2].items = updatedTasksDone;

      setBoards(boardsCopy);
    }

    TodoService.delete(token, todoId, deleteTodoLocal, setAuth, setToken);
  }

  const createNewTodo = () => {
    if (newTodoTitle.length < 5) {
      return;
    }

    const newTodo = {
      title: newTodoTitle,
    };

    const addToDoLocal = (createdTodo: Omit<Todo, 'status'>) => {
      const newBoardsState = [...boards];
      newBoardsState[0].items.push(createdTodo);

      setBoards(newBoardsState);
    }

    setNewTodoTitle('');
    setModalIsOpened(false);

    TodoService.post(token, newTodo, addToDoLocal, setAuth, setToken)
  }

  const changeTodo = async () => {
    if (changedTodoTitle.length < 5 && selectedIdTodo > 0) {
      return;
    }

    const findedTodo = ToDoMethods.findTodo(selectedIdTodo, boards) as Todo;
    const updatedTodo = { ...findedTodo, title: changedTodoTitle, status: statusOfTodo }

    const updatedTodoFromServer = await TodoService.put(token, updatedTodo, setAuth, setToken);
    const updatedTasks = ToDoMethods.updateTodoInBoards(updatedTodoFromServer, boards)

    setBoards(ToDoMethods.convertTodos(updatedTasks));
    setModalChangeTodoIsOpened(false);
  }

  const changeTodoHandler = (todoId: Todo['id']) => {
    const findedTodo = ToDoMethods.findTodo(todoId, boards) as Todo;
    setModalChangeTodoIsOpened(true);
    setChangedTodoTitle(findedTodo.title);
    setSelectedIdTodo(findedTodo.id);
    setStatusOfTodo(findedTodo.status);
  }

  class DragAndDrop {
    static dragLeaveHandler(e: React.DragEvent<HTMLDivElement>) {
      const target = e.target as HTMLElement;
      target.style.boxShadow = 'none';
    }

    static dragStartHandler(board: Board, item: Task) {
      setCurrentBoard(board);
      setCurrentTask(item);
    }

    static dragEndHandler(e: React.DragEvent<HTMLDivElement>) {
      const target = e.target as HTMLElement;
      target.style.boxShadow = 'none';
    }

    static dropHandler(e: React.DragEvent<HTMLDivElement>, board: Board, item: Task): void {
      e.preventDefault()
      e.stopPropagation()
      const currentIndex = currentBoard?.items.indexOf(currentTask as Task);
      currentBoard?.items.splice(currentIndex as number, 1);
      const dropIndex = board.items.indexOf(item as Task);
      board.items.splice(dropIndex + 1, 0, currentTask as Task);
      setBoards(boards.map(b => {
        if (b.board_id === board.board_id) {
          return board;
        }
  
        if (b.board_id === (currentBoard as Board).board_id) {
          return currentBoard as Board;
        }
  
        return b;
      }))
    }

    static dropCardHandler(e: React.DragEvent<HTMLDivElement>, board: Board) {
      e.stopPropagation()
      board.items.push(currentTask as Task);
      const currentIndex = currentBoard?.items.indexOf(currentTask as Task);
      currentBoard?.items.splice(currentIndex as number, 1);
  
      setBoards(boards.map(b => {
        if (b.board_id === board.board_id) {
          return board;
        }
  
        if (b.board_id === (currentBoard as Board).board_id) {
          return currentBoard as Board;
        }
  
        return b;
      }))

      const todoToUpdate = ToDoMethods.findTodo(currentTask?.id as number, boards) as Todo;
      TodoService.put(token, todoToUpdate, setAuth, setToken);
    }
  }

  return (
    <div className="dashboard">
      <div className="dashboard__columns">
        <div
          className={classNames(
            "dashboard__todo-column",
            {"dashboard__todo-column--dark": theme === 'DARK'}
          )}
          onDragOver={e => e.preventDefault()}
          onDrop={(e) => DragAndDrop.dropCardHandler(e, boards[0])}
        >
          <h1 className={classNames(
            "dashboard__label",
            { "dashboard__label--dark": theme === 'DARK' }
          )}>{ translate.boards.todoLabel }</h1>

          {boards[0].items.map(todo => {
            return (<ToDo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              onDelete={deleteTodoHandler}
              changeHandler={changeTodoHandler}
              board={boards[0]}
              dragAndDropClass={DragAndDrop}
              item={todo}
            />)
          })}
        </div>

        <div 
          className={classNames(
            "dashboard__inprocess-column",
            { "dashboard__inprocess-column--dark": theme === 'DARK' }
          )}
          onDragOver={e => e.preventDefault()}
          onDrop={(e) => DragAndDrop.dropCardHandler(e, boards[1])}
        >
          <h1 className={classNames(
            "dashboard__label",
            { "dashboard__label--dark": theme === 'DARK' }
          )}>
            { translate.boards.inProcessLabel }
          </h1>

          {boards[1].items.map(todo => {
            return (<ToDo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              onDelete={deleteTodoHandler}
              changeHandler={changeTodoHandler}
              board={boards[1]}
              dragAndDropClass={DragAndDrop}
              item={todo}
            />)
          })}
        </div>

        <div
          className={classNames(
            "dashboard__finished-column",
            { "dashboard__finished-column--dark": theme === 'DARK' }
          )}
          onDragOver={e => e.preventDefault()}
          onDrop={(e) => DragAndDrop.dropCardHandler(e, boards[2])}
        >
          <h1 className={classNames(
            "dashboard__label",
            { "dashboard__label--dark": theme === 'DARK' }
          )}>
            { translate.boards.doneLabel }
          </h1>

          {boards[2].items.map(todo => {
            return (<ToDo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              onDelete={deleteTodoHandler}
              changeHandler={changeTodoHandler}
              board={boards[2]}
              dragAndDropClass={DragAndDrop}
              item={todo}
            />)
          })}
        </div>
      </div>

      <button
        className={classNames(
          "dashboard__create-todo",
          { "dashboard__create-todo--dark": theme === 'DARK' }
        )}
        onClick={() => setModalIsOpened(true)}
      >
        { translate.newTaskLabel }
      </button>

      {modalIsOpened && (
        <ModalAddTodo
          closeModalWin={() => setModalIsOpened(false)}
          newTodoTitle={newTodoTitle}
          setNewTodoTitle={setNewTodoTitle}
          createNewTodo={createNewTodo}
        />
      )}

      {modalChangeTodoIsOpened && (
        <ModalChangeTodo
          closeModalWin={() => setModalChangeTodoIsOpened(false)}
          changedTodoTitle={changedTodoTitle}
          statusOfTodo={statusOfTodo}
          setChangedTodoTitle={setChangedTodoTitle}
          setStatusOfTodo={setStatusOfTodo}
          changeTodo={changeTodo}
        />
      )}

      {settingsWinIsOpened && (
        <Settings 
          closeModalWin={closeSettings}
        />
      )}
    </div>
  );
};
