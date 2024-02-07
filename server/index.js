import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;
const sourceServerUrl = 'https://mcdonalds-live-engage-api-stage-1.azurewebsites.net/stores.json';

app.use(cors());

app.get('/api/branches', async (req, res) => {
    try {
        const response = await axios.get(sourceServerUrl);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching branches from source server:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});