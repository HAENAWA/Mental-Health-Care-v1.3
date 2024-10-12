const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');
const app = express();
const port = 3000;

// JSONボディのパースと静的ファイルの提供
app.use(bodyParser.json());
app.use(express.static('public'));

// Cohere APIにメッセージを送信するエンドポイント
app.post('/api/cohere', async (req, res) => {
    const { message } = req.body;
    const apiKey = 'bitrSwMmfsl4TM0SK73kbVVCHSymqJaO4VSCA4Ba';

    const response = await fetch('https://api.cohere.ai/generate', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            model: 'xlarge',
            prompt: message,
            max_tokens: 50
        })
    });

    const data = await response.json();
    res.json({ reply: data.generations[0].text });
});

// サーバーを起動
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
