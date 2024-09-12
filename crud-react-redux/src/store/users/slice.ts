import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

const DEFAULT_STATE = [
  {
    id: "1",
    name: "Pepe",
    email: "pepe@email.com",
    github: "JackDev21",
  },
  {
    id: "2",
    name: "Juan",
    email: "juan@email.com",
    github: "midudev",
  },
  {
    id: "3",
    name: "Pedro",
    email: "pedro@email.com",
    github: "pedro_github",
  },
  {
    id: "4",
    name: "Maria",
    email: "maria@email.com",
    github: "maria_github",
  },
  {
    id: "5",
    name: "Ana",
    email: "ana@email.com",
    github: "ana_github",
  },
]
export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

// let initialState: UserWithId[] = DEFAULT_STATE
// const persistedState = localStorage.getItem("__redux_state__")
// if (persistedState) {
//   initialState = JSON.parse(persistedState).users
// }

const initialState: UserWithId[] = (() => {
  const persistedState = localStorage.getItem("__redux_state__")
  if (persistedState) {
    return JSON.parse(persistedState).users
  }
  return DEFAULT_STATE
})()

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    addNewUser: (state, action: PayloadAction<User>) => {
      const id = crypto.randomUUID()
      state.push({ id, ...action.payload })
    },

    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
    rollbackUser: (state, action: PayloadAction<UserWithId>) => {
      const isUserAlreadyDefined = state.some((user) => user.id === action.payload.id)
      if (!isUserAlreadyDefined) {
        state.push(action.payload)
      }
    },
  },
})

export default usersSlice.reducer

export const { addNewUser, deleteUserById, rollbackUser } = usersSlice.actions
