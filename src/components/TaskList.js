import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { getTasks, reset } from '../features/tasks/taskSlice';
import Spinner from './Spinner';
import TaskItem from './TaskItem';

function TaskList() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { tasks, isLoading, isError, message } = useSelector((state) => state.tasks);

  useEffect(() => {
    if (isError) toast.error(message)
    dispatch(getTasks())
    return () => dispatch(reset())
  }, [navigate, isError, message, dispatch]);

  if (isLoading) return <Spinner />

  return (
    <section className='content'>
      {tasks.length > 0 && (
        <div className='tasks'>
          {tasks.map(task => <TaskItem key={task._id} task={task}
          />)}
        </div>
      )}
    </section>
  )
}

export default TaskList