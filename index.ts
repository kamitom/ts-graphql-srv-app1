
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
        where: {},
      });
    },
    user: async (root, { id }, ctx) => {
      return await prisma.user({ id });
    },
  },

  Mutation: {
    async newUser(root, args, ctx, info) {
      console.info('args: ', args);

      await prisma.createUser({
        name: args.name,
        password: args.password,
        email: args.email,
        phone: args.phone,
      });
    },
    async deleteUserById(root, args, ctx) {
      console.log('delete User args: ', args);

      await prisma.deleteUser({ id: args.id });
    },
  },
};

const srvQL = new GraphQLServer({ typeDefs, resolvers })

srvQL.start(({ port })=> console.log(`Server is running on http://localhost:${port}`))

// srvQL.start(({
//   port: 4201
// }), ({ port }) => console.log(`Server is running on http://localhost:${port}`))
