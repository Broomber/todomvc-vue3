import { ref, reactive, computed } from 'vue'
import { defineStore } from 'pinia'

interface todoItem {
  text: string,
  completed: boolean
}

export const useTodoStore = defineStore('todo', () => {
  const todoList = reactive([
    { text: '1', completed: true },
    { text: '2', completed: false },
    { text: '3', completed: false },
  ] as todoItem[])
  const visibility = ref('all')

  function changeCompletion(index: number) {
    todoList[index].completed = !todoList[index].completed
  }

  function changeText(index: number, text: string) {
    todoList[index].text = text
  }

  function changeVisibility(newValue: string) {
    visibility.value = newValue
  }

  return { todoList, visibility, changeCompletion, changeText, changeVisibility }
})
