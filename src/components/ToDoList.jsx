import React from 'react';
import Task from './Task';

function ToDoList({ tasks, updateTaskStatus, deleteTask }) {
  return (
    <div className='todo-list-container'>
      <div className='todo-list'>
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            updateTaskStatus={updateTaskStatus}
            deleteTask={deleteTask}
          />
        ))}
      </div>
    </div>
  );
}

export default ToDoList;
