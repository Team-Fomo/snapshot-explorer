import React from 'react';
import { Layout } from 'antd';
import UserProposals from './components/UserProposals';
import Header from './components/Header/Header';
import { addressContext } from './adress.context';
import Footer from './components/Footer';
import GettingStarted from './components/GettingStarted';
const { Content } = Layout;

const App: React.FC = () => {
  const [address, setAddress] = React.useState<string | null>(null);
  const value = { address, setAddress }

  React.useEffect(() => {
    const payload = localStorage.getItem('address') as string;
    setAddress(payload);
  }, [])

  return (
    <addressContext.Provider value={value}>
      <Header />
      <Layout className='container'>
        <Content style={{ backgroundColor: "#fff" }}>
          {address
            ? <UserProposals />
            : <GettingStarted />}
        </Content>
      </Layout>
      <Footer />
    </addressContext.Provider >
  );
}

export default App;
