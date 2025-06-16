import { Box, Heading, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import { useState } from 'react';
import Users from './components/Users';
import Portfolios from './components/Portfolios';
import Stocks from './components/Stocks';

function App() {
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  return (
    <Box p={4}>
      <Heading mb={4}>Investment Portfolio Tracker</Heading>
      <Tabs isFitted variant="enclosed">
        <TabList>
          <Tab>Users</Tab>
          <Tab>Portfolios</Tab>
          <Tab>Stocks</Tab>
        </TabList>
        <TabPanels>
          <TabPanel><Users /></TabPanel>
          <TabPanel><Portfolios selectedUserId={selectedUserId} setSelectedUserId={setSelectedUserId} /></TabPanel>
          <TabPanel><Stocks selectedUserId={selectedUserId}/></TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
}

export default App;
