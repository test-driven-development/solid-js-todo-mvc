// noinspection JSXNamespaceValidation

import {createSignal, For, Show} from 'solid-js'

const App = () => {
  const [todos, setTodos] = createSignal([
    {
      id: 1,
      title: 'Dummy todo',
      completed: false,
    },
  ])

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
            onInput={toggleAll}
          />
          <label for="toggle-all"></label>
          <ul class="todo-list">
            <For each={todos()}>
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
      </Show>
    </section>
  )
}
export default App
