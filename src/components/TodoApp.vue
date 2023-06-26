<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input
          class="new-todo"
          placeholder="What needs to be done?"
          autofocus
          v-model="newTodoText"
          @keyup.enter="addTodoEvent()"
        />
      </header>

      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <li
            v-for="(todoItem, index) in visibleTodoList"
            :key="index"
            :class="{ completed: todoItem.completed, editing: todoItem == editedTodo }"
          >
            <div class="view">
              <input
                class="toggle"
                type="checkbox"
                :checked="todoItem.completed"
                @change.prevent="editTodo(index, todoItem.text, !todoItem.completed)"
              />
              <label @dblclick="startEditing(index)">{{ todoItem.text }}</label>
              <button class="destroy" @click="deleteTodo(index)"></button>
            </div>
            <input
              class="edit"
              v-model="editedTodoText"
              @keyup.enter="editTodoEvent(index, editedTodoText, todoItem.completed)"
              @keyup.esc="cancelEditing"
              @blur="cancelEditing"
            />
          </li>
        </ul>
      </section>

      <footer class="footer">
        <span class="todo-count"
          ><strong>{{ todosCount }}</strong> item left</span
        >
        <ul class="filters">
          <li>
            <RouterLink :class="{ selected: $route.hash === '' }" to="/"> All </RouterLink>
          </li>
          <li>
            <RouterLink :class="{ selected: $route.hash === '#active' }" to="/#active">
              Active
            </RouterLink>
          </li>
          <li>
            <RouterLink :class="{ selected: $route.hash === '#completed' }" to="/#completed">
              Completed
            </RouterLink>
          </li>
        </ul>
        <button class="clear-completed" @click="clearCompleted">Clear completed</button>
      </footer>
    </section>

    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    </footer>
  </div>
</template>

<script lang="ts">
import { mapState, mapActions } from 'pinia'
import { useTodoStore } from '@/stores/todo'

import type * as interfaces from '../interfaces/app.interfaces'

export default {
  data() {
    return {
      newTodoText: '',
      editedTodoText: '',
      editedTodo: null as interfaces.TodoItem | null
    }
  },
  computed: {
    ...mapState(useTodoStore, ['todoList', 'visibility', 'visibleTodoList', 'todosCount']),
    route() {
      return this.$route
    }
  },
  mounted() {
    this.updateLocalData()
  },
  methods: {
    ...mapActions(useTodoStore, [
      'addTodo',
      'editTodo',
      'deleteTodo',
      'changeVisibility',
      'clearCompleted',
      'saveLocalData',
      'updateLocalData'
    ]),
    addTodoEvent() {
      this.addTodo(this.newTodoText)
      this.newTodoText = ''
    },
    editTodoEvent(index: number, text: string, completed: boolean) {
      if (text.length === 0) {
        this.deleteTodo(index)
      } else {
        this.editTodo(index, text, completed)
      }

      this.cancelEditing()
    },
    startEditing(index: number) {
      this.editedTodo = this.todoList[index]
      this.editedTodoText = this.todoList[index].text
    },
    cancelEditing() {
      this.editedTodo = null
      this.editedTodoText = ''
    }
  },
  watch: {
    route(newValue) {
      this.changeVisibility(newValue.hash.substring(1))
    },
    todoList: {
      handler() {
        this.saveLocalData()
      },
      deep: true
    }
  }
}
</script>
