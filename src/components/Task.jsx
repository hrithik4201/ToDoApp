import React from 'react';
import { AiFillDelete } from 'react-icons/ai';

function Task({ task, updateTaskStatus, deleteTask }) {
  const handleStatusChange = () => {
    // Toggle the completion status when the checkbox is clicked
    updateTaskStatus(task.id, !task.completed, task.title);
  };

  const handleDeleteClick = () => {
    deleteTask(task.id);
  };

  let taskClass = task.completed ? 'completed' : 'incomplete';

  return (
    <div className={`task ${taskClass}`}>
      <input
        type='checkbox'
        checked={task.completed}
        onChange={handleStatusChange}
      />

      <span className={task.completed ? 'completed' : ''}>{task.title}</span>
      <button className='delete-btn' onClick={handleDeleteClick}>
        <AiFillDelete />
      </button>
    </div>
  );
}

export default Task;
