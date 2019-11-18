const SerialPort = require("serialport");
const mapper = {
  "/dev/ttyUSB0": "COM6",
  "/dev/ttyUSB1": "COM7",
  "/dev/ttyUSB2": "COM8"
};

const client = require("socket.io-client")("http://localhost:8000", {
  path: "/data"
});
client.on("connect", function() {
  console.log(`${new Date()}::Connnected With the Server`);
});
client.on("disconnect", function() {
  console.log(`${new Date()}::Client Disconnected`);
});

client.on("Connection-List", function(data) {
  console.log(`${new Date()}::Client Data recieved:${JSON.stringify(data)}`);
  if (mapper[data]) {
    setupPort(mapper[data]);
    portErrorListner(mapper[data]);
  }

  client.on(data, function(portData) {
    console.log(
      `${new Date()}::Port Data recieved:${JSON.stringify(portData)}`
    );
    writeData(mapper[data], portData);
  });
});

client.on("connect_error", () => {
  console.log(`${new Date()}::Server Unavailable`);
  client.off("Connection-List");
});

const setupPort = portName => {
  const virtualPortRef = new SerialPort(portName);
};

const writeData = (portName, dataBuffer) => {
  portName.write(dataBuffer, err => {
    if (err) {
      console.log(`${new Date()}::Error Occured While Writing Data to Port`);
    }
  });
};

const portErrorListner = portName => {
  portName.on("error", () => {
    console.log(`${new Date()}::Virtual Port Errored`);
    // process.exit(1);
  });
};
