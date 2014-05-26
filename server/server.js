var port = Number(process.env.PORT || 9001);
var io = require('socket.io').listen(port);
var _ = require('lodash');

var users = {};

io.sockets.on('connection', function (socket) {

	socket.emit('connected', users);

	socket.on('join', function(data){
		socket.broadcast.emit('newUser',data);
		
		var user = {};

		if(users[data.id !== undefined]){
			user[data.id] = data;

			users = _.extend(users,user);

		}
	});

	socket.on('move', function(data){
		users[data.id] = data;
		socket.broadcast.emit('move',users);
	});

});