const express = require('express');
const cors = require('cors');
const { callTool } = require('@modelcontextprotocol/sdk');

const app = express();
const port = 3000;

app.use(cors({ origin: true }));
app.use(express.json());

const users = [
    {
        id: 1,
        username: 'john_doe',
        email: 'john.doe@example.com',
        videosViewed: 15,
        engagement: 'High',
        avgViewDuration: '5:30',
        skipped: 'Low',
        anonymousActivity: 'No',
        earningsDay: '₹50',
        earningsHour: '₹5',
        paymentRequest: 'Yes',
        amountRequested: '₹500',
        balance: '₹1000',
        requestDate: '2025-04-19',
        referrals: ['jane_doe', 'peter_pan'],
        referralsMonth: 2,
        paymentDetails: 'UPI: john.doe@upi',
    },
    {
        id: 2,
        username: 'jane_doe',
        email: 'jane.doe@example.com',
        videosViewed: 20,
        engagement: 'Medium',
        avgViewDuration: '4:45',
        skipped: 'Low',
        anonymousActivity: 'Yes',
        earningsDay: '₹75',
        earningsHour: '₹7',
        paymentRequest: 'No',
        amountRequested: '₹0',
        balance: '₹1500',
        requestDate: 'N/A',
        referrals: ['john_doe'],
        referralsMonth: 1,
        paymentDetails: 'Bank: 1234567890',
    },
];

app.get('/api/users', (req, res) => {
    res.json(users);
});

app.post('/api/withdrawal-details', async (req, res) => {
    try {
        // Call the use_mcp_tool here and return the result
        const userId = req.body.userId;
        const result = await useMcpTool({
            serverName: 'admin-server',
            toolName: 'get_withdrawal_details',
            arguments: {
                userId: userId,
            },
        });
        res.json(result);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});

async function useMcpTool(params) {
    // This function is a placeholder for the actual use_mcp_tool call
    // In a real implementation, this function would use the MCP SDK to call the tool
    console.log('useMcpTool called with:', params);
    const result = await callTool(params.serverName, params.toolName, params.arguments);
    return result;
}
