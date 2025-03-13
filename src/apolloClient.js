import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql', // URL to the GraphQL API
  cache: new InMemoryCache(), // In-memory cache for Apollo Client
});

export default client;
