
import { GraphQLServer } from 'graphql-yoga'
import * as faker from 'faker'

const typeDefs = `
  # this graphql schema
  type Query {
    Me(name: String): String!
  }
`

let fName: string = faker.name.findName();

const resolvers = {
  Query: {
    Me: (_: any, { name }) => `Hello ${name || fName}`,
  },
}

const srvQL = new GraphQLServer({ typeDefs, resolvers })

// srvQL.start(()=> console.log(`Server is running on http://localhost:4000`))

srvQL.start(({
  port: 4321
}), ({ port }) => console.log(`Server is running on http://localhost:${port}`))
