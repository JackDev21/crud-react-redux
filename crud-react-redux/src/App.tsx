import "./App.css"
import { CreateNewUser } from "./components/CreateNewUser"
import { ListOfUsers } from "./components/ListOfUsers"
import { Toaster } from "sonner"

function App() {
  return (
    <>
      <Toaster richColors />
      <ListOfUsers />
      <CreateNewUser />
    </>
  )
}

export default App
