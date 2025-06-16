import { useState, useEffect, use } from 'react';
import axios from 'axios';
import { Box, Button, Input, Select, VStack } from '@chakra-ui/react';

function Portfolios({ selectedUserId, setSelectedUserId }: { selectedUserId: string, setSelectedUserId: (id: string) => void }) {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [portfolios, setPortfolios] = useState<any[]>([]);

  useEffect(() => {
    axios.get<any[]>('/portfolioUser').then(res => setUsers(res.data));
  }, []);

  useEffect(() => {
    if (selectedUserId) {
      fetchPortfolios();
    }
  }, [selectedUserId]);

  const fetchPortfolios = async () => {
    if (!selectedUserId) return;
    const res = await axios.get<any[]>(`/portfolio/user/${selectedUserId}`);
    setPortfolios(res.data);
  };

  const createPortfolio = async () => {
    await axios.post(`/portfolio/user/${selectedUserId}`, { name });
    setName('');
    fetchPortfolios();
  };

  return (
    <VStack spacing={3} align="stretch">
      <Select placeholder="Select user" value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)}>
        {users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)}
      </Select>
      <Input placeholder="Portfolio name" value={name} onChange={e => setName(e.target.value)} />
      <Button onClick={createPortfolio}>Create Portfolio</Button>
      <Box>
        {portfolios.map(p => <Box key={p.id}>📁 {p.name}</Box>)}
      </Box>
    </VStack>
  );
}

export default Portfolios;
