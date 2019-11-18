const SerialPort = require("serialport");
const mapper = {
  "/dev/ttyUSB0": "CNCA0",
  "/dev/ttyUSB1": "CNCA1",
  "/dev/ttyUSB2": "CNCA2"
};
const portRefMapper = {};

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
  console.log(`${new Date()}::Port Info recieved:${JSON.stringify(data)}`);
  if (mapper[data]) {
    let portRef = getPortObj(mapper[data]);
    portRefMapper[data] = portRef;
    portErrorListner(portRef);
  }

  client.on(data, function(portData) {
    // console.log(
    //   `${new Date()}::Port Data recieved:${JSON.stringify(portData.toString())}`
    // );
    writeData(portRefMapper[data], portData);
  });
});

client.on("connect_error", () => {
  console.log(`${new Date()}::Server Unavailable`);
  client.off("Connection-List");
});

const getPortObj = portName => {
  let virtualPortRef = new SerialPort(portName);
  return virtualPortRef;
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
    process.exit(1);
  });
};
