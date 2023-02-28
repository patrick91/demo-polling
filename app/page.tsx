"use client";

import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloProvider,
  useQuery,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://main--time-pav6zq.apollographos.net/graphql",
  }),
  cache: new InMemoryCache(),
});

const NOW = gql`
  {
    now(id: "1")
  }
`;

const Now = () => {
  const { data, loading, error } = useQuery(NOW, {
    pollInterval: 1000,
  });

  console.log(data);

  if (loading) return <div>Loading...</div>;

  return <div>{data.now}</div>;
};

export default function Home() {
  return (
    <ApolloProvider client={client}>
      <Now />
    </ApolloProvider>
  );
}
