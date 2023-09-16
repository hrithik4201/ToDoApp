import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

// Function to fetch tasks from the API
export const fetchTasks = async () => {
  try {
    const response = await axios.get(BASE_URL);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to add a new task to the API
export const addTask = async (title) => {
  try {
    const response = await axios.post(BASE_URL, {
      title,
      completed: false, // You can set the initial completion status here
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to update the completion status of a task
export const updateTask = async (taskId, completed) => {
  try {
    const response = await axios.put(`${BASE_URL}/${taskId}`, { completed });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Function to delete a task from the API
export const deleteTask = async (taskId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/${taskId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
