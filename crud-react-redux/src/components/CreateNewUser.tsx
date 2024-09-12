import { useState } from "react"
import { Badge, Button, Card, TextInput, Title } from "@tremor/react"
import { useUsersActions } from "../hooks/useUsersActions"

export function CreateNewUser() {
  const { addUser } = useUsersActions()
  const [result, setResult] = useState<"ok" | "ko" | null>(null)

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setResult(null)

    const form = event.target as HTMLFormElement
    const formData = new FormData(form)

    const name = formData.get("name") as string
    const email = formData.get("email") as string
    const github = formData.get("github") as string

    if (!name || !email || !github) {
      return setResult("ko")
    }

    addUser({ name, email, github })
    setResult("ok")
    form.reset()
  }

  return (
    <>
      <Card style={{ marginTop: "16px" }}>
        <Title>Create New User</Title>
        <form onSubmit={handleSubmit}>
          <TextInput name="name" placeholder="Name" />
          <TextInput name="email" placeholder="Email" />
          <TextInput name="github" placeholder="Github" />

          <Button type="submit" style={{ marginTop: "16px" }}>
            Crear Usuario
          </Button>
          <span style={{ marginLeft: "16px" }}>
            {result === "ko" && <Badge className="text-red-500">Error en los campos</Badge>}
            {result === "ok" && <Badge className="text-green-500">Usuario creado correctamente</Badge>}
          </span>
        </form>
      </Card>
    </>
  )
}
