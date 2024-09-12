import { UserId, deleteUserById } from "../store/users/slice"
import { useAppDispatch } from "./store"

export const useUsersActions = () => {
  const dispatch = useAppDispatch()

  const deleteUser = (id: UserId) => {
    dispatch(deleteUserById(id))
  }

  return { deleteUser }
}
