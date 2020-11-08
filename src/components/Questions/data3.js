const initialData = {
    tasks: {
      'task-1': { id: 'task-1', content: 'Banana' },
      'task-2': { id: 'task-2', content: 'Cucumber' },
      'task-3': { id: 'task-3', content: 'Apple' },
      'task-4': { id: 'task-4', content: 'Carrot' },
      'task-5': { id: 'task-5', content: 'Strawberry' },

    },
    columns: {
      'column-1': {
        id: 'column-1',
        title: 'To do',
        taskIds: ['task-1', 'task-2', 'task-3', 'task-4','task-5'],
      },
      'column-2': {
        id: 'column-2',
        title: 'In progress',
        taskIds: [],
      }
    },
    columnOrder: [ 'column-1', 'column-2']
  };
  
  export default initialData;