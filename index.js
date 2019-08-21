const net = require('net');

let clientConnectInterval;

const clientConnection = () => {
    const client = net.createConnection({
        port: 8000,
        host: '10.0.0.182'
    }, () => {
        console.log('Connected with the server.');
    });

    client.on('connect', () => {
        clearInterval(clientConnectInterval);
    })
    
    client.on('data', (data) => {
        console.log(data.toString());
    });
    
    client.on('end', () => {
        clearInterval(clientConnectInterval);
        console.log('End: disconnected from server');
    });
    
    client.on('error', () => {
        clearInterval(clientConnectInterval);
        console.log('Error: disconnected from server');
    });
    
    client.on('close', () => {
        clientConnectInterval = setInterval(() =>  clientConnection(), 50000);
        console.log('Close: disconnected from server');
    });
}

clientConnection();
