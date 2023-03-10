<template>
  <div>
    <section class="todoapp">
      <header class="header">
        <h1>todos</h1>
        <input class="new-todo" placeholder="What needs to be done?" autofocus />
      </header>
      <!-- This section should be hidden by default and shown when there are todos -->
      <section class="main">
        <input id="toggle-all" class="toggle-all" type="checkbox" />
        <label for="toggle-all">Mark all as complete</label>
        <ul class="todo-list">
          <!-- These are here just to show the structure of the list items -->
          <!-- List items should get the class `editing` when editing and `completed` when marked as completed -->
          <li
            v-for="todoItem, index in visibleTodoList"
            :key="index"
            :class="{completed: todoItem.completed}"
          >
            <div class="view">
              <input class="toggle" type="checkbox" :checked="todoItem.completed" @change.prevent="store.changeCompletion(index)"/>
              <label>{{ todoItem.text }}</label>
              <button class="destroy"></button>
            </div>
            <input class="edit" value="Rule the web" />
          </li>
        </ul>
      </section>
      <!-- This footer should be hidden by default and shown when there are todos -->
      <footer class="footer">
        <!-- This should be `0 items left` by default -->
        <span class="todo-count"><strong>{{ todosCount }}</strong> item left</span>
        <!-- Remove this if you don't implement routing -->
        <ul class="filters">
          <li>
            <RouterLink :class="{selected: $route.hash === ''}" to="/">All</RouterLink>
          </li>
          <li>
            <RouterLink :class="{selected: $route.hash === '#active'}" to="/#active">Active</RouterLink>
          </li>
          <li>
            <RouterLink :class="{selected: $route.hash === '#completed'}" to="/#completed">Completed</RouterLink>
          </li>
        </ul>
        <!-- Hidden if no completed items are left ↓ -->
        <button class="clear-completed">Clear completed</button>
      </footer>
    </section>
    <footer class="info">
      <p>Double-click to edit a todo</p>
      <p>Template by <a href="http://sindresorhus.com">Sindre Sorhus</a></p>
    </footer>
  </div>
</template>

<script setup lang="ts">
  import { computed, watch, onMounted } from 'vue'
  import { useRoute } from 'vue-router'

  import { useTodoStore } from '@/stores/todo'

  const route = useRoute()
  const store = useTodoStore()

  watch(route, () => {
    if (route.hash) {
      store.visibility = route.hash.substring(1)
    } else {
      store.visibility = 'all'
    }
  })

  onMounted(() => {
  })

  const visibleTodoList = computed(() => {
    let newTodoList;

    switch (store.visibility) {
      case 'completed':
        newTodoList = store.todoList.filter((todoItem) => todoItem.completed === true )
        break
      case 'active':
        newTodoList = store.todoList.filter((todoItem) => todoItem.completed === false )
        break
      default:
        newTodoList = store.todoList;
        break
    }

    return newTodoList;
  })

  const todosCount = computed(() => store.todoList.filter((todoItem) => todoItem.completed === false ).length)
</script>
