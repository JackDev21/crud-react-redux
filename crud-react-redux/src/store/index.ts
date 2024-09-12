import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./users/slice.ts"

export const store = configureStore({
  reducer: {
    users: usersReducer,
  },
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
