// 音声入力ボタンと送信ボタンにイベントリスナーを追加
document.getElementById('start-record-btn').addEventListener('click', startRecognition);
document.getElementById('send-btn').addEventListener('click', sendMessage);

// 音声認識を開始する関数
function startRecognition() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'ja-JP';
    recognition.start();

    // 音声認識が成功したときの処理
    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        document.getElementById('output').innerText = `入力: ${transcript}`;
        sendToBackend(transcript);
    };

    // 音声認識がエラーを返したときの処理
    recognition.onerror = function(event) {
        console.error(event.error);
    };
}

// テキストを送信する関数
function sendMessage() {
    const textInput = document.getElementById('textInput').value;
    document.getElementById('output').innerText = `入力: ${textInput}`;
    sendToBackend(textInput);
}

// バックエンドにメッセージを送信する関数
async function sendToBackend(message) {
    const response = await fetch('/api/cohere', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ message })
    });

    const data = await response.json();
    document.getElementById('output').innerText += `\n返答: ${data.reply}`;
}
