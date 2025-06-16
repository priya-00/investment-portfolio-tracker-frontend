import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Heading, Input, Select, VStack } from '@chakra-ui/react';

function Stocks({ selectedUserId }: { selectedUserId: string }) {
    const [portfolios, setPortfolios] = useState<any[]>([]);
    const [portfolioId, setPortfolioId] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState(0);
    const [stocks, setStocks] = useState<any[]>([]);

    useEffect(() => {
        if (!selectedUserId) return;
        axios.get<any[]>(`/portfolio/user/${selectedUserId}`).then(res => setPortfolios(res.data));
    }, [selectedUserId]);

    useEffect(() => {
        if (!portfolioId) return;
        axios.get<any[]>(`/stocks/${portfolioId}`).then(res => setStocks(res.data));
    }, [portfolioId]);

    const addStock = async () => {
        await axios.post(`/stocks/${portfolioId}`, { name, quantity });
        setName('');
        setQuantity(0);
        const res = await axios.get<any[]>(`/stocks/${portfolioId}`);
        setStocks(res.data);
    };

    return (
        <VStack spacing={3} align="stretch">
            <Select placeholder="Select portfolio" onChange={e => setPortfolioId(e.target.value)}>
                {portfolios.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
            </Select>
            <Input value={name} onChange={e => setName(e.target.value)} placeholder="Stock name (e.g., Apple)" />
            <Input type="number" value={quantity} onChange={e => setQuantity(Number(e.target.value))} placeholder="Stock Quantity" />
            <Button onClick={addStock}>Add Stock</Button>
            <Box>
                {stocks.map(s => (
                    <Box key={s.id}>
                        📈 {s.symbol} - {s.name} ({s.quantity})
                    </Box>
                ))}
            </Box>
            <Box>
                <Heading size="md">Available stocks:</Heading>
                <Box>Apple, Microsoft, Google, Amazon, Tesla, Nvidia, Meta, JP Morgan, Visa, Mastercard, Netflix, Oracle</Box>
            </Box>
        </VStack>
    );
}

export default Stocks;
