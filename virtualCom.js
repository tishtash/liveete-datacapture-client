const SerialPort = require("serialport");

class LiveEyeVirtualComPort {
  constructor(portname) {
    this.portname = portname;
  }

  init() {
    this.setupPort();
    this.portErrorListner();
  }

  setupPort() {
    this.virtualPort = new SerialPort(this.portname);
  }

  writeData(dataBuffer) {
    this.virtualPort.write(dataBuffer, err => {
      if (err) {
        console.log(`${new Date()}::Error Occured While Writing Data to Port`);
      }
    });
  }

  portErrorListner() {
    this.virtualPort.on("error", () => {
      console.log(`${new Date()}::Virtual Port Errored`);
      process.exit(1);
    });
  }
}

module.exports = LiveEyeVirtualComPort;
