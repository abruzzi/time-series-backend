const _ = require('lodash');
const { spawn } = require('child_process');
const generator = spawn('./generator-fake.sh');

const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });

function parse(data) {
  var array = _.trim(data).split(/\s+/);
  
  const date = parseInt(array[0])*1000;
  const status = array[1];
  const mills = array[2];
  const campaign = array[3];
  const mac = array[4];
  const apmac = array[5];
  const session = array[6];

  const obj = {
    date, status, mills, campaign, mac, apmac, session
  }

  return obj;
}

wss.on('connection', (ws) => {

  const output = (data) => {
    const obj = parse(data);
    ws.send(JSON.stringify(obj));
  }

  generator.stdout.on('data', output);

  ws.on('close', () => {
    generator.stdout.removeListener('data', output);
  });
});
