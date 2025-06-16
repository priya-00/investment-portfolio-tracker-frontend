import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Input, VStack, Text, Heading } from '@chakra-ui/react';

function Users() {
  const [users, setUsers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const fetchUsers = async () => {
    const res = await axios.get('/portfolioUser');
    setUsers(res.data as any[]);
  };

  const createUser = async () => {
    await axios.post('/portfolioUser', { name, email });
    setName('');
    setEmail('');
    fetchUsers();
  };

  useEffect(() => { fetchUsers(); }, []);

  return (
    <VStack spacing={3} align="stretch">
      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter name" />
      <Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter email" />
      <Button onClick={createUser}>Create User</Button>
      <Heading size="md" mt={4}>Users</Heading>
      <Box>
        {users.map(user => <Box key={user.id}>👤 {user.name}</Box>)}
      </Box>
    </VStack>
  );
}

export default Users;
