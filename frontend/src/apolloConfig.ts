import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  // TODO: Fetch this from .env file as well.
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

export default client;
