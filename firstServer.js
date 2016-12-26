var net = require('net');
var port = 1337;
var mySocket;

var server = net.createServer();
server.on('connection', connectionHandler);

function connectionHandler(socket){
	mySocket = socket;
	console.log('Connected');
	socket.on('data', makeAlert);
}

function makeAlert(data){
	//var bis = data.toString().indexOf();
	var dataString = data.toString().substring(0, data.toString().length - 2);

	if(dataString == "close"){
		console.log("closing..");
		server.close();
		mySocket.destroy();
	} else{
		console.log(data);
		var tmpString = "";
		for(var i = 0; i < dataString.length; i++){
			tmpString += dataString.charAt(i)  + "\t";
		}
		console.log(tmpString);
	}
	
}

server.listen(port, function(){
	console.log('Server is listening at localhost:' + port);
});
