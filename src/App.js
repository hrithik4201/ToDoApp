import React, { useState, useEffect } from 'react';
import ToDoList from './components/ToDoList';
import AddTaskForm from './components/AddTaskForm';
import { fetchTasks, addTask, updateTask, deleteTask } from './api/todoApi';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [tasks, setTasks] = useState([]);
  const [taskIdCounter, setTaskIdCounter] = useState(1);

  // Function to update tasks in local storage
  const updateLocalStorageTasks = (updatedTasks) => {
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  useEffect(() => {
    // Always fetch tasks from the API
    const fetchData = async () => {
      try {
        const fetchedTasks = await fetchTasks();
        const combinedTasks = [...tasks, ...fetchedTasks];
        setTasks(combinedTasks);
        // Update local storage with combined tasks
        updateLocalStorageTasks(combinedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    // Fetch tasks from local storage
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    } else {
      // If local storage is empty, fetch tasks from the API
      fetchData();
    }
  }, [tasks]);

  const addNewTask = async (title) => {
    try {
      const newTask = await addTask(title);
      newTask.id = taskIdCounter;
      setTaskIdCounter(taskIdCounter + 1);

      const updatedTasks = [...tasks, newTask];
      setTasks(updatedTasks);
      // Update local storage with the new task
      updateLocalStorageTasks(updatedTasks);
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const updateTaskStatus = async (taskId, completed) => {
    try {
      // Update the task's completion status in the tasks array
      const updatedTasks = tasks.map((task) =>
        task.id === taskId ? { ...task, completed } : task
      );
      setTasks(updatedTasks);

      // Call the API to update the task's completion status
      await updateTask(taskId, completed);

      // Update local storage with the updated tasks
      updateLocalStorageTasks(updatedTasks);
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  const deleteTaskItem = async (taskId) => {
    try {
      await deleteTask(taskId);

      // Remove the deleted task from the tasks array
      const updatedTasks = tasks.filter((task) => task.id !== taskId);
      setTasks(updatedTasks);

      // Update local storage with the updated tasks
      updateLocalStorageTasks(updatedTasks);
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className='App'>
      <Header />
      <AddTaskForm addTask={addNewTask} />
      <h2 className='task-header'>All Tasks</h2>
      <ToDoList
        tasks={tasks}
        updateTaskStatus={updateTaskStatus}
        deleteTask={deleteTaskItem}
      />
      <Footer />
    </div>
  );
}

export default App;
