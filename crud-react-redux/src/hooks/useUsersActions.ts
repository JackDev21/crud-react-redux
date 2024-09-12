import { UserId, addNewUser, deleteUserById, User } from "../store/users/slice"
import { useAppDispatch } from "./store"

export const useUsersActions = () => {
  const dispatch = useAppDispatch()

  const addUser = ({ name, email, github }: User) => {
    dispatch(addNewUser({ name, email, github }))
  }

  const deleteUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { addUser, deleteUser }
}
