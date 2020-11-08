const initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'A' },
      'task-2': { id: 'task-2', content: 'L' },
      'task-3': { id: 'task-3', content: 'P' },
      'task-4': { id: 'task-4', content: 'E' },
      'task-5': { id: 'task-5', content: 'P' },

    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4','task-5'],
      }
    },
    // Facilitate reordering of the columns
    columnOrder: [ 'column-1']
  };
  
  export default initialData;