import { onAuthStateChanged, signOut } from 'firebase/auth';
import { collection, addDoc } from "firebase/firestore"; 
import React, { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import { db } from '../firebase.js';

const TodoList = () => {

  const [todoContent, setTodoContent] = useState([]);


  const [user, setUser] = useState('');

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
  }, []);

  const navigate = useNavigate();

  const signout = async () => {
    await signOut(auth);
    navigate('/signIn/');
  }


  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoId, setTodoId] = useState(todos.length + 1);
  const [isEditable, setIsEditable] = useState(false);
  const [editId, setEditId] = useState('');

  const [newTitle, setNewTitle] = useState('');

  const handleAddFormChanges = (e) => {
    setTodoTitle(e.target.value)
  };

  const handleAddTodo = () => {
    setTodos([...todos, { id: todoId, title: todoTitle, status: 'notStarted' }]);
    setTodoId(todoId + 1);
    setTodoTitle('');
  }

  const handleDeleteTodo = (targetTodo) => {
    console.log(targetTodo)

    setTodos(todos.filter((todo) => todo !== targetTodo))
  };

  const handleOpenEditForm = (todo) => {
    setIsEditable(true)
    setEditId(todo.id)
    setNewTitle(todo.title)
  }

  const handleCloseEditForm = () => {
    setIsEditable(false)
    setEditId('')
  }

  const handleEditTodo = () => {
    const newArray = todos.map((todo) => 
      todo.id === editId ? {...todo, title: newTitle} : todo
    )
    setTodos(newArray);
    setNewTitle('');
    setEditId('');
    handleCloseEditForm('');
  }

  const handleEditFormChange = (e) => {
    setNewTitle(e.target.value)
  }

  const filterOptions = [
    { value: 'all', label: 'すべて' },
    { value: 'notStarted', label: '未着手' },
    { value: 'inProgress', label: '作業中' },
    { value: 'done', label: '完了' },
  ];
  
  const [filteredTodos, setFilteredTodos] = useState([]);

  const [filter, setFilter] = useState('notStarted');

  const handleStatusChange = ({ id }, e) => {
    const newTodos = todos.map((todo) => ({ ...todo }));

    setTodos(
      newTodos.map((todo) =>
        todo.id === id ? { ...todo, status: e.target.value } : todo
      )
    );
  };

  useEffect(() => {
    const filteringTodos = () => {
      switch (filter) {
        case 'notStarted':
          setFilteredTodos(
            todos.filter((todo) => todo.status === 'notStarted')
          );
          break;
        case 'inProgress':
          setFilteredTodos(
            todos.filter((todo) => todo.status === 'inProgress')
          );
          break;
          case 'done':
            setFilteredTodos(
              todos.filter((todo) => todo.status === 'done')
            );
          break;
        default:
          setFilteredTodos(todos);
      }
    };
    filteringTodos();
  }, [filter, todos])

  return (
    <>
      <h1>TODOリスト</h1>

      {isEditable ? (
      <div>
        <input 
        className='newTodoTitle'
        type='text' 
        label='新しいタイトル'
        value={newTitle}
        onChange={handleEditFormChange}
        />
        <button className='keepEditButton' onClick={handleEditTodo}>編集を保存</button>
        <button className='cancelButton' onClick={handleCloseEditForm}>キャンセル</button>
      </div>
    ) : (
      <div>
        <input 
        className='todoTitle'
        type="text" 
        label="タイトル"
        value={todoTitle} 
        onChange={handleAddFormChanges}
        />
        <button 
        className='addTodoButton'
        onClick={handleAddTodo}>作成</button>
      </div>
    )}
        <>
          <select 
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
           >
            {filterOptions.map(({ value, label }) => (
            <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </>
      <ul>
      {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <span>{todo.title}</span>
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(todo, e)}
            >
              <option value="notStarted">未着手</option>
              <option value="inProgress">作業中</option>
              <option value="done">完了</option>
            </select>
            <button className='EditButton' onClick={() => handleOpenEditForm(todo)}>編集</button>
            <button className='deleteButton' onClick={() => handleDeleteTodo(todo)}>削除</button>
          </li>
        ))}
        <div>
          {todoContent.map(({ id, text }) => {
            <div key={id}>
              <p>{text}</p>
            </div>
          })}
        </div>
      </ul>
      {!loading && (
        <>
        {!user ? (
          <Navigate to={`/signIn/`} />
      ) : (
        <>
        <p className='userEmail'>{user && user.email}</p>
        <button 
        onClick={signout}>
          SignOut
          </button>
        </>
      )}
      </>
      )}
    </>
  )
}

export default TodoList
