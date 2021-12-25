import cors from 'cors';
import express from 'express';
import * as dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server-express';
import { getTokenFromHeaders } from './authenticator';

import schema from './schema';
import knex from './config/knex';

dotenv.config({
  path: '../.env',
});

const server = new ApolloServer({
  schema,

  context: async ({ req }) => {
    let token = null;
    let data;

    try {
      const headerResponse = getTokenFromHeaders(req);

      if (headerResponse.token) {
        token = headerResponse.token;

        // data = await validateToken(token);
      }

      if (headerResponse.error) {
        data = headerResponse;
      }
    } catch (e) {
      // Just logging for now. Lets add a dedicated logger here later
      console.warn(`Unable to authenticate using auth token: ${token}`);
    }

    return {
      token,
      ...data,
      db: knex,
    };
  },
  playground: process.env.NODE_ENV !== 'production',
  debug: process.env.NODE_ENV !== 'production',
  formatError: (err) => {
    // Don't give the specific errors to the client.
    if (err.message.startsWith('Database Error: ') || err.message.startsWith('connect')) {
      return new Error('Internal server error');
    }

    // Otherwise return the original error. The error can also
    // be manipulated in other ways, so long as it's returned.
    return err;
  },
});

const app = express();

app.use(cors());

server.applyMiddleware({ app, path: '/graphql' });

const { API_PORT = 5000 } = process.env;

// Start the server
app.listen({ port: API_PORT }, () => {
  // eslint-disable-next-line no-console
  console.log(`🚀 Server ready at http://localhost:${API_PORT}${server.graphqlPath}`);
});
