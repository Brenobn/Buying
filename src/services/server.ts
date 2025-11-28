import { createServer, Model } from "miragejs"

export function makeServer({ environment = "development" } = {}) {
  const server = createServer({
    environment,

    models: {
      school: Model,
      schoolClass: Model,
    },

    seeds(server) {
      server.create("school", {
        id: "1",
        name: "Escola Estadual Santos Dumont",
        address: "Av. Brasil, 500 - Centro",
      } as any)

      server.create("schoolClass", {
        id: "101",
        schoolId: "1",
        name: "1° Ano A",
        type: "morning",
      } as any)

      server.create("schoolClass", {
        id: "102",
        schoolId: "1",
        name: "3° Ano B",
        type: "night",
      } as any)

      server.create("school", {
        id: "2",
        name: "Colégio Futuro",
        address: "Rua das Flores 123",
      } as any)
    },

    routes() {
      this.namespace = "api"
      this.timing = 500

      this.get("/schools", (schema) => {
        return schema.all("school")
      })

      this.post("/schools", (schema, request) => {
        const attrs = JSON.parse(request.requestBody)
        return schema.create("school", attrs)
      })

      this.get("/schools/:id", (schema, request) => {
        const id = request.params.id
        console.log("MIRAGE: Buscando Escola ID:", id)
        
        const school = schema.find("school", id)
        
        if (!school) {
          console.log("MIRAGE: Escola não encontrada!")
        } else {
          console.log("MIRAGE: Escola encontrada:", (school as any).attrs.name)
        }

        return school; 
      })


      this.get("/schools/:id/classes", (schema, request) => {
        const schoolId = request.params.id;
        console.log("MIRAGE: Buscando Turmas da Escola:", schoolId)
        
        return schema.where("schoolClass", { schoolId } as any)
      })

      this.post("/schools/:id/classes", (schema, request) => {
        const schoolId = request.params.id
        const attrs = JSON.parse(request.requestBody)

        attrs.schoolId = schoolId

        return schema.create("schoolClass", attrs)
      })

      this.passthrough()
    },
  })

  return server
}