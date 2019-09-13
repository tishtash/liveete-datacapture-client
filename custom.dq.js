const net = require('net');
const VirtualCom = require('./virtualCom');

let com1;

const clientConnection = () => {
    const client = net.createConnection({
        port: 8000,
        host: '192.168.0.55'
    }, () => {
        console.log('Connected with the server.');
    });

    client.on('connect', () => {
        com1 = VirtualCom('COMX');
        com1.init();
    })

    client.on('data', (data) => {
        if (data) {
            let convertedData = data.toString();
            let formattedData = convertedData.replace(/[^ -~]/gm, '');
            if (formattedData.trim()) {
                //console.log(formattedData);
                com1.writeData(Buffer.from(formattedData + '\n'));
            }
        }
    });

    client.on('end', () => {
        console.log('End: disconnected from the server');
    });

    client.on('error', () => {
        console.log('Error: disconnected from the server');
    });

    client.on('close', () => {
        setTimeout(() => clientConnection(), 5000);
        console.log('Close: disconnected from the server');
    });
}

clientConnection();