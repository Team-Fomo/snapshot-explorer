import React from 'react'
import {
  ApolloClient,
  InMemoryCache,
  gql
} from "@apollo/client";
import { addressContext } from '../../adress.context';
import ProposalItem from '../ProposalItem';
import Spinner from '../Spinner';
import NotFound from '../../assets/NotFound';

const UserProposals = () => {
  const [proposals, setProposals] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { address } = React.useContext(addressContext);

  const allIsOkay = proposals.length > 0 && !isLoading;
  const noItems = proposals.length === 0 && !isLoading;

  const client = new ApolloClient({
    uri: 'https://hub.snapshot.org/graphql',
    cache: new InMemoryCache()
  });

  const onSearchHandler = (userAddress: string) => {
    setIsLoading(true);
    setProposals([]);
    client
      .query({
        query: gql`
        query Votes {
          votes (
            first: 100000,
            skip: 0
            where: {
              voter: "${userAddress}"
            }
            orderBy: "created",
            orderDirection: desc
          ) {
            id
            voter
            created,
            proposal {
              id,
              body,
              discussion,
              title,
              start,
              end,
              space {
                id,
                avatar,
                name
              }
            }
            choice
          }
        }
    `
      })
      .then(({ data }) => {
        console.log(data.votes);
        setProposals(data.votes);
        setIsLoading(false)
      });
  }

  React.useEffect(() => {
    if (address) {
      return onSearchHandler(address);
    }
    setProposals([]);
  }, [address])

  return (
    <div style={{ padding: 40 }}>
      <h1>User Proposals</h1>
      {isLoading && <Spinner size='large' />}
      {allIsOkay && proposals.map((el: any) => <ProposalItem key={el.id} {...el} />)}
      {noItems && (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <h2>You did not participate in any voting</h2>
          <NotFound />
        </div>
      )}
    </div>
  )
}

export default UserProposals;
