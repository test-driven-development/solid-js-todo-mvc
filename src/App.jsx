// noinspection JSXNamespaceValidation

import {createSignal} from 'solid-js'

const App = () => {
  const [todos, setTodos] = createSignal([])

  return (
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <input type="" class="new-todo" placeholder="What to do?" />
      </header>
    </section>
  )
}
export default App
