// noinspection JSXNamespaceValidation

import {createMemo, createSignal, For, onCleanup, Show} from 'solid-js'

const App = () => {
  const [todos, setTodos] = createSignal([])
  const [showMode, setShowMode] = createSignal()
  const todosRemaining = createMemo(
    () => todos().length - todos().filter(todo => todo.completed).length,
  )

  const ENTER_KEY = 13
  const ESCAPE_KEY = 25
  let counter = 0

  const addTodo = event => {
    const title = event.target.value.trim()
    if (event.keyCode === ENTER_KEY && title) {
      setTodos(todos => {
        event.target.value = null
        return [
          ...todos,
          {
            id: counter++,
            title,
            completed: false,
          },
        ]
      })
    }
  }

  const toggle = id => {
    setTodos(todos =>
      todos.map(todo =>
        todo.id !== id ? todo : {...todo, completed: !todo.completed},
      ),
    )
  }

  const remove = id => {
    setTodos(todos => todos.filter(todo => todo.id !== id))
  }

  const toggleAll = event => {
    const completed = event.target.checked
    // noinspection JSCheckFunctionSignatures
    setTodos(todos =>
      todos.map(todo => ({
        ...todo,
        completed,
      })),
    )
  }

  const locationHandler = () => {
    setShowMode(location.hash.slice(2) || 'all')
  }

  window.addEventListener('hashchange', locationHandler)

  onCleanup(() => {
    window.removeEventListener('hashchange', locationHandler)
  })

  const filterTodos = todos => {
    if (showMode() === 'active') return todos.filter(todo => !todo.completed)
    else if (showMode() === 'completed')
      return todos.filter(todo => todo.completed)
    return todos
  }

  const clearCompleted = () => {
    setTodos(todos => todos.filter(todo => !todo.completed))
  }

  // noinspection JSValidateTypes
  return (
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <input
          type="text"
          class="new-todo"
          placeholder="What to do?"
          onKeyDown={addTodo}
        />
      </header>

      <Show when={todos().length > 0} keyed>
        <section class="main">
          <input
            type="checkbox"
            id="toggle-all"
            class="toggle-all"
            checked={!todosRemaining()}
            onInput={toggleAll}
          />
          <label for="toggle-all"></label>
          <ul class="todo-list">
            <For each={filterTodos(todos())}>
              {todo => (
                <li
                  class="todo"
                  classList={{
                    completed: todo.completed,
                  }}
                >
                  <div class="view">
                    <input
                      type="checkbox"
                      class="toggle"
                      checked={todo.completed}
                      onInput={() => toggle(todo.id)}
                    />
                    <label>{todo.title}</label>
                    <button class="destroy" onClick={() => remove(todo.id)} />
                  </div>
                </li>
              )}
            </For>
          </ul>
        </section>
        <footer class="footer">
          <span class="todo-count">
            <strong>{todosRemaining()}</strong>
            {todosRemaining() === 1 ? ' item ' : ' items '} left
          </span>
          <ul class="filters">
            <li>
              <a href="#/all" classList={{selected: showMode() === 'all'}}>
                All
              </a>
            </li>
            <li>
              <a
                href="#/active"
                classList={{selected: showMode() === 'active'}}
              >
                Active
              </a>
            </li>
            <li>
              <a
                href="#/completed"
                classList={{selected: showMode() === 'completed'}}
              >
                Completed
              </a>
            </li>
          </ul>
          <Show when={todosRemaining() !== todos().length} keyed>
            <button class="clear-completed" onClick={clearCompleted}>
              Clear Completed
            </button>
          </Show>
        </footer>
      </Show>
    </section>
  )
}
export default App
