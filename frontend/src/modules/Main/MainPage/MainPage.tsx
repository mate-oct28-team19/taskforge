import { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import './MainPage.scss'

import { getAllTodosAPI } from '../api/getAllTodosAPI';
import { Todo } from '../types/Todo';
import { ToDo } from '../components/ToDo';
import { ModalAddTodo } from '../components/ModalAddTodo';

import { ThemeContext } from '../../../contexts/ThemeContext';
import { LangContext } from '../../../contexts/LangContext';
import { translator } from '../../../translator';
import { Settings } from '../components/Settings';

enum status {
  TODO, IN_PROCESS, DONE
}

const initTodos = [
  {
    id: 0,
    title: 'haha',
    status: status.TODO,
  },
  {
    id: 1,
    title: 'haha2',
    status: status.IN_PROCESS,
  },
  {
    id: 2,
    title: 'haha3',
    status: status.DONE,
  },
  {
    id: 3,
    title: 'haha4',
    status: status.TODO,
  },
  {
    id: 4,
    title: 'haha4',
    status: status.TODO,
  },
  {
    id: 5,
    title: 'haha4',
    status: status.TODO,
  },
  {
    id: 6,
    title: 'haha4',
    status: status.TODO,
  },
  {
    id: 7,
    title: 'haha4',
    status: status.TODO,
  },
  {
    id: 8,
    title: 'haha4',
    status: status.TODO,
  },
];

interface Props {
  settingsWinIsOpened: boolean;
  closeSettings: () => void;
}

export const MainPage: React.FC<Props> = ({ settingsWinIsOpened, closeSettings }) => {
  const [todos, setTodos] = useState<Todo[]>(initTodos);
  const [modalIsOpened, setModalIsOpened] = useState<boolean>(false);
  const [newTodoTitle, setNewTodoTitle] = useState<string>('');

  const { theme } = useContext(ThemeContext);
  const { lang } = useContext(LangContext);

  const translate = translator[lang].dashboard;

  // useEffect(() => {
  //   getAllTodosAPI(token, setTodos);
  // }, [token]);

  const deleteTodoHandler = (todoId: Todo['id']) => {
    setTodos(todosInner => todosInner.filter(todo => todo.id !== todoId));
  }

  const createNewTodo = () => {
    if (!newTodoTitle.length) {
      return;
    }

    const newTodo = {
      id: todos[todos.length - 1].id + 1,
      title: newTodoTitle,
      status: status.TODO
    };

    setNewTodoTitle('');
    setModalIsOpened(false);

    setTodos(todosInner => [ ...todosInner, newTodo]);
  }

  return (
    <div className="dashboard">
      <div className="dashboard__columns">
        <div className={classNames(
          "dashboard__todo-column",
          {"dashboard__todo-column--dark": theme === 'DARK'}
        )}>
          <h1 className={classNames(
            "dashboard__label",
            { "dashboard__label--dark": theme === 'DARK' }
          )}>TO DO</h1>

          { todos.map(todo => {
            return todo.status === status.TODO
            && 
            <ToDo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              onDelete={deleteTodoHandler}
            />
          })}
        </div>

        <div className={classNames(
          "dashboard__inprocess-column",
          { "dashboard__inprocess-column--dark": theme === 'DARK' }
        )}>
          <h1 className={classNames(
            "dashboard__label",
            { "dashboard__label--dark": theme === 'DARK' }
          )}>
            IN PROCESS
          </h1>

          { todos.map(todo => {
            return todo.status === status.IN_PROCESS
            && 
            <ToDo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              onDelete={deleteTodoHandler}
            />
          })}
        </div>

        <div className={classNames(
          "dashboard__finished-column",
          { "dashboard__finished-column--dark": theme === 'DARK' }
        )}>
          <h1 className={classNames(
            "dashboard__label",
            { "dashboard__label--dark": theme === 'DARK' }
          )}>
            DONE
          </h1>

          { todos.map(todo => {
            return todo.status === status.DONE
            && 
            <ToDo
              key={todo.id}
              id={todo.id}
              title={todo.title}
              onDelete={deleteTodoHandler}
            />
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

      { settingsWinIsOpened && (
        <Settings 
          closeModalWin={closeSettings}
        />
      )}
    </div>
  );
};
