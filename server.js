const WebSocket = require('ws');
const server = new WebSocket.Server({ port: process.env.PORT || 8080 });

console.log('✅ WebSocket 服务器已启动');

server.on('connection', (ws) => {
    console.log('📱 有新设备连接');
    
    ws.on('message', (message) => {
        console.log('📨 收到:', message.toString());
        server.clients.forEach(client => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message.toString());
            }
        });
    });
    
    ws.send('✅ 连接成功！');
});
