
import { GraphQLServer } from 'graphql-yoga'
import { prisma } from './server/generated/prisma-client'


import * as faker from 'faker'
// import faker from 'faker'


const typeDefs = "./schema.graphql";

let fName: string = faker.name.findName();

const resolvers = {
  Query: {
    Me: (_: any, { name }) => `Hello ${name || fName}`,
    users: async (_root, { first }, _context) => {
      return await prisma.users({
        where: {}
      })
    }
  },

// # Create a new user
// mutation {
//   createUser(data: {
//     name: "Alice"
//   }) {
//     id
//   }
// }

  Mutation: {
    async newUser(parent, args, ctx, info) {
      console.log("args: ", args);

      await prisma.createUser({ name: args.name });
    }
  },
}

const srvQL = new GraphQLServer({ typeDefs, resolvers })

srvQL.start(({ port })=> console.log(`Server is running on http://localhost:${port}`))

// srvQL.start(({
//   port: 4200
// }), ({ port }) => console.log(`Server is running on http://localhost:${port}`))
