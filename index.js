const net = require("net");
const VirtualCom = require("./virtualCom");

let com1;

const clientConnection = () => {
  const client = net.createConnection(
    {
      port: 8000,
      host: "10.0.0.182"
    },
    () => {
      console.log(`${new Date()}::Connected with the server.`);
    }
  );

  client.on("connect", () => {
    com1 = new VirtualCom("CNCA0");
    com1.init();
  });

  client.on("data", data => {
    com1.writeData(data);
  });

  client.on("end", () => {
    console.log(`${new Date()}::End: disconnected from the server`);
  });

  client.on("error", () => {
    console.log(`${new Date()}::Error: disconnected from the server`);
  });

  client.on("close", () => {
    setTimeout(() => clientConnection(), 5000);
    console.log(`${new Date()}::Close: disconnected from the server`);
  });
};

clientConnection();
