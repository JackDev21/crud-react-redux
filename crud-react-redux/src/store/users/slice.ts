import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type UserId = string

export interface User {
  name: string
  email: string
  github: string
}

export interface UserWithId extends User {
  id: UserId
}

const initialState: UserWithId[] = [
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
    github: "juan_github",
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

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    deleteUserById: (state, action: PayloadAction<UserId>) => {
      const id = action.payload
      return state.filter((user) => user.id !== id)
    },
  },
})

export default usersSlice.reducer

export const { deleteUserById } = usersSlice.actions
