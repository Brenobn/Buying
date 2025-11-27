import { SchoolClass } from './../types/index';
import { createServer, Model } from "miragejs"
import { School } from "../types"

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      school: Model,
      SchoolClass: Model
    }, 

    seeds(server) {
      server.create("school", {
        id: "1",
        name: "Escola Estadual Santos Dumont",
        address: "Av. Brasil, 500 - Centro",
      } as any)

      server.create("school", {
        id: "2",
        name: "Colégio Futuro",
        address: "Rua das Flores 123",
      } as any)
    },

    routes() {
      this.namespace = "api"
      this.timing = 750

      this.get("/schools", (schema) => {
        return schema.all("school")
      })

      this.post("/schools", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        return schema.create("school", attrs)
      })

      this.passthrough()
    },
  })

  return server
}