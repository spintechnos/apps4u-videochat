const express = require('express');
const { createServer } = require('http');
const io = require('socket.io');
const haiku = require('./haiku');

const app = express();
app.get('/students', function (req, res) {
    res.send('Get all Student Data');
});
const server = createServer(app);
const userIds = {};
const noop = () => {};

app.use('/', express.static(`${process.cwd()}/../client`));

/**
 * Random ID until the ID is not in use
 */
function randomID(callback) {
  const id = haiku();
  
  if (id in userIds) setTimeout(() => haiku(callback), 5);
  else callback(id);
}

/**
 * Send data to friend
 */
function sendTo(to, done, fail) {
  const receiver = userIds[to];
  if (receiver) {
    const next = typeof done === 'function' ? done : noop;
    next(receiver);
  } else {
    const next = typeof fail === 'function' ? fail : noop;
    next();
  }
}
function setUserId(id){
	console.log("----------------id actiave------------");
	console.log(id);
}

/**
 * Initialize when a connection is made
 * @param {SocketIO.Socket} socket
 */
function initSocket(socket) {
  let id,userId;
  socket
    .on('init', (data) => {
		
      /*randomID((_id) => {
       // id = data.useId;
       // userIds[id] = socket;
       // socket.emit('init', { id });
      });*/
	 
    })
    .on('request', (data) => {
		sendTo(data.to, to => to.emit('request', { from: id }));
    })
	.on('setUserId', (data) => {
		userId=data.DynamicId
		  randomID((_id) => {
		  id = userId;
          userIds[id] = socket;
		});
    })
    .on('call', (data) => {
		
      sendTo(
        data.to,
        to => to.emit('call', { ...data, from: id }),
        () => socket.emit('failed')
      );
    })
    .on('end', (data) => {
      sendTo(data.to, to => to.emit('end'));
    })
	.on('disconnect', () => {
      delete userIds[id];
      console.log(id, 'disconnected');
    });

  return socket;
}

module.exports.run = (config) => {
  server.listen(config.PORT);
  console.log(`Server is listening at :${config.PORT}`);
  io.listen(server, { log: true })
    .on('connection', initSocket);
};

