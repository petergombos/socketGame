var io = require('socket.io').listen(9001);
var _ = require('lodash');

var users = {};

io.sockets.on('connection', function (socket) {

	socket.emit('connected', users);

	socket.on('join', function(data){
		var user = {};

		if(users[data.id !== undefined]){
			user[data.id] = data;

			users = _.extend(users,user);

			socket.broadcast.emit('newUser',data);
		}
	});

	socket.on('move', function(data){
		users[data.id] = data;
		socket.broadcast.emit('move',users);
	});

});