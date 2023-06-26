import { defineStore } from 'pinia'

import type * as interfaces from '../interfaces/app.interfaces'

export const useTodoStore = defineStore('todo', {
  state: () => ({ 
    todoList: [
      { text: 'Vue 3', completed: true },
      { text: 'Pinia', completed: true },
      { text: 'Vue Router', completed: true },
      { text: 'TypeScript', completed: true },
    ] as interfaces.TodoItem[],
    visibility: 'all',
  }),
  getters: {
    visibleTodoList: (state) => {
      let newTodoList
      
      switch (state.visibility) {
        case 'completed':
          newTodoList = state.todoList.filter((todoItem) => todoItem.completed === true )
          break
        case 'active':
          newTodoList = state.todoList.filter((todoItem) => todoItem.completed === false )
          break
        default:
          newTodoList = state.todoList
          break
      }

      return newTodoList
    },
    todosCount: (state) => {
      return state.todoList.filter((todoItem) => todoItem.completed === false ).length
    }
  },
  actions: {
    addTodo(text: string) {
      this.todoList = [...this.todoList, {text: text, completed: false}]
    },
    deleteTodo(index: number) {
      this.todoList = this.todoList.filter((todoItem, todoIndex) => todoIndex !== index )
    },
    editTodo(index: number, text: string, completed: boolean) {
      this.todoList[index] = {
        text: text,
        completed: completed
      }
    },
    clearCompleted() {
      this.todoList = this.todoList.filter((todoItem) => todoItem.completed === false )
    },
    changeVisibility(visibility: string) {      
      if (visibility.length > 0) {
        this.visibility = visibility
      } else {
        this.visibility = visibility = 'all'
      }
    },
    saveLocalData() {
      localStorage.setItem("todo-list", JSON.stringify(this.todoList))
    },
    updateLocalData() {
      const localData = JSON.parse(localStorage.getItem("todo-list") || '[]')

      if (localData.length > 0) {
        this.todoList = localData
      }
    }
  },
})
