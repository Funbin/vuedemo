var server = require('http').createServer();
var io = require('socket.io')(server);
var port = '8888'
server.listen(port);
console.log(`Server running at http://localhost:${port}/`);
io.on('connection', function (client) {
  //校验身份
  client.on('join',(data)=>{
    console.log(data);
    if (data.sessionId) {
      let count = 0;
      setInterval(function () {
        count++;
        //发送消息
        client.emit('comingRecord', { plateNo: '粤B12345', remainingDay: count, recordId: count });
      }, 10000)
    }else{
      client.emit('comingRecord', `身份校验未通过`);
    }
  })
});
