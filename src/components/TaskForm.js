import { useState } from 'react'
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { createTask } from '../features/tasks/taskSlice'

function TaskForm() {
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    dispatch(createTask({ text }));
    setText('');
    navigate('/allTasks')
  }

  return (
    <section className='form'>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
          <label htmlFor='text' style={{ fontWeight: 'bolder' }}>Enter Task</label>
          <input
            type='text'
            id='text'
            value={text}
            onChange={e => setText(e.target.value)}
          />
        </div>
        <div className='form-group'>
          <button
            className='btn btn-block'
            type='submit'
          >
            Add Task
          </button>
        </div>
      </form>
    </section>
  )
}

export default TaskForm