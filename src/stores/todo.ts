import { defineStore } from 'pinia'

interface todoItem {
  text: string,
  completed: boolean
}

export const useTodoStore = defineStore('todo', {
  state: () => ({ 
    todoList: [
      { text: '1', completed: true },
      { text: '2', completed: false },
      { text: '3', completed: false },
    ] as todoItem[],
    visibility: 'all'
  }),
  getters: {
    visibleTodoList: (state) => {
      let newTodoList;
      switch (state.visibility) {
        case 'completed':
          newTodoList = state.todoList.filter((todoItem) => todoItem.completed === true )
          break
        case 'active':
          newTodoList = state.todoList.filter((todoItem) => todoItem.completed === false )
          break
        default:
          newTodoList = state.todoList;
          break
      }
      return newTodoList;
    },
    todosCount: (state) => {
      return state.todoList.filter((todoItem) => todoItem.completed === false ).length
    }
  },
  actions: {
    changeCompletion(index: number) {
      this.todoList[index].completed = !this.todoList[index].completed
    },
    deleteTodo(index: number) {
      this.todoList = this.todoList.filter((todoItem, todoIndex) => todoIndex !== index )
    },
    clearCompleted() {
      this.todoList = this.todoList.filter((todoItem) => todoItem.completed === false )
    },
    changeText(index: number, text: string) {
      this.todoList[index].text = text
    },
    changeVisibility(visibility: string) {      
      if (visibility.length > 0) {
        this.visibility = visibility
      } else {
        this.visibility = visibility = 'all'
      }
    }
  },
})
