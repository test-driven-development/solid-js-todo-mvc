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
      </Show>
    </section>
  )
}
export default App
