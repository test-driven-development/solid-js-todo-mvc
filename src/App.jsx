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

  // noinspection JSValidateTypes
  return (
    <section class="todoapp">
      <header class="header">
        <h1>Todos</h1>
        <input type="" class="new-todo" placeholder="What to do?" />
      </header>

      <Show when={todos().length > 0} keyed>
        <ul class="todo-list">
          <For each={todos()}>
            {todo => (
              <li class="todo">
                <div class="view">
                  <label>{todo.title}</label>
                </div>
              </li>
            )}
          </For>
        </ul>
      </Show>
    </section>
  )
}
export default App
