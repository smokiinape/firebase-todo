import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Hämta uppgifter från Firebase-databasen
    const tasksRef = firebase.database().ref('tasks');
    tasksRef.on('value', (snapshot) => {
      const tasksData = snapshot.val();
      const tasksArray = Object.entries(tasksData || {}).map(([id, task]) => ({
        id,
        ...task
      }));
      setTasks(tasksArray);
    });

    // Stäng lyssnaren vid komponentens avmontering
    return () => {
      tasksRef.off();
    };
  }, []);

  return (
    <div>
      {/* Rendera uppgifterna här */}
      {tasks.map((task) => (
        <div key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.text}</p>
          <button onClick={() => toggleTaskStatus(task.id, !task.completed)}>
            {task.completed ? 'Markera som ej klar' : 'Markera som klar'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default TaskManager;
