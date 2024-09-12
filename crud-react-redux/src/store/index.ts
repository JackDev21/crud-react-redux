import { configureStore, type Middleware } from "@reduxjs/toolkit"
import usersReducer, { rollbackUser } from "./users/slice"
import { toast } from "sonner"

const persistanceLocalStorageMiddleware = (store) => (next) => (action) => {
  next(action)
  localStorage.setItem("__redux_state__", JSON.stringify(store.getState()))
}

const syncWithDatabaseMiddleware: Middleware = (store) => (next) => (action) => {
  const { type, payload } = action
  const previousState = store.getState()

  //fase 1
  console.log({ type, payload })
  console.log(store.getState())
  next(action)

  if (type === "users/deleteUserById") {
    const userToRemove = previousState.users.find((user) => user.id === payload)

    fetch(`https://jsonplaceholder.typicode.com/users/${payload}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          toast.success("Usuario eliminado correctamente")
          return response.json()
        }
        throw new Error("Error al eliminar el usuario")
      })
      .catch((error) => {
        toast.error(error.message)
        if (userToRemove) {
          store.dispatch(store.dispatch(rollbackUser(userToRemove)))
        }
      })
  }
  //fase 2
  console.log(store.getState())
}

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(persistanceLocalStorageMiddleware, syncWithDatabaseMiddleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

/*
typeof store.getState:

typeof es un operador de TypeScript que obtiene el tipo de una variable o propiedad.
store.getState es una función que devuelve el estado actual del store en Redux.
typeof store.getState obtiene el tipo de la función getState.
ReturnType<typeof store.getState>:

ReturnType es un tipo genérico de TypeScript que obtiene el tipo de retorno de una función.
ReturnType<typeof store.getState> obtiene el tipo de retorno de la función getState, que es el estado del store.
export type RootState:

export hace que el tipo RootState esté disponible para ser importado en otros archivos.
type RootState define un alias de tipo llamado RootState.
En resumen:
La línea define un tipo llamado RootState que representa el tipo del estado global del store de Redux. Este tipo se obtiene utilizando el tipo de retorno de la función getState del store. Esto es útil para tener un tipo consistente y reutilizable que describe el estado global en toda la aplicación.
*/
