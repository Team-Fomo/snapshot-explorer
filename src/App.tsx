import React from 'react';
import { Layout, Input, Spin, Space, Button } from 'antd';
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";
import fileSaver from 'file-saver';
const { Header } = Layout;
const { Search } = Input;

const App: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [votedAdresses, setVotedAdresses] = React.useState([]);

  const client = new ApolloClient({
    uri: 'https://hub.snapshot.org/graphql',
    cache: new InMemoryCache()
  });

  const onSearchHandler = (proposalId: string) => {
    setIsLoading(true);
    setVotedAdresses([]);
    client
      .query({
        query: gql`
        query Votes {
          votes (
            first: 1000000000
            where: {
              proposal: "${proposalId}"
            }
            orderBy: "created",
            orderDirection: desc
          ) {
            voter
          }
        }
    `
      })
      .then(({ data }) => {
        const filteredVotes = data.votes.map((el: any) => el.voter);
        setVotedAdresses(filteredVotes);
        setIsLoading(false);
      });
  }

  const downloadHandler = () => {
    const text = votedAdresses.join('\n');

    const file = new Blob([text], { type: 'text/plain;charset=utf-8' });
    fileSaver.saveAs(file, `.txt`);
  }

  return (
    <Layout>
      <Header style={{ backgroundColor: "#1890ff" }}>
        <h1>Snapshot Parser</h1>
      </Header>
      <Space style={{ padding: 40 }} size='middle' align='center' direction='vertical'>
        <Search
          placeholder="Enter Snapshot VoteId"
          enterButton="Search"
          size="large"
          onSearch={onSearchHandler}
        />
        {isLoading && <Spin />}
        {!isLoading
          && votedAdresses.length !== 0
          && (
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span>Finded {votedAdresses.length} adresses. Download it now?</span>
              <Button onClick={downloadHandler} style={{ marginTop: 10 }}>Download .txt</Button>
            </div>
          )
        }
      </Space>
    </Layout>
  );
}

export default App;
