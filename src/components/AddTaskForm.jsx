import React, { useState } from 'react';

function AddTaskForm({ addTask }) {
  const [newTask, setNewTask] = useState('');
  const [showInput, setShowInput] = useState(false);

  const handleInputChange = (e) => {
    setNewTask(e.target.value);
  };

  const handleAddClick = () => {
    setShowInput(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (newTask.trim() === '') {
      // Prevent adding empty tasks
      return;
    }

    addTask(newTask);
    setNewTask('');
    setShowInput(false);
  };

  return (
    <div className='add-task-container'>
      {showInput ? (
        <form className='add-task-form' onSubmit={handleSubmit}>
          <input
            className='form-input'
            type='text'
            placeholder='Add a new task'
            value={newTask}
            onChange={handleInputChange}
          />
          <button className='form-btn' type='submit'>
            Add
          </button>
        </form>
      ) : (
        <button className='add-task-btn' onClick={handleAddClick}>
          <b>+ Add Task</b>
        </button>
      )}
    </div>
  );
}

export default AddTaskForm;
