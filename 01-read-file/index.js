const fs = require('fs');
const readableStream = fs.createReadStream(__dirname+'/text.txt');

readableStream.on('data', data => {
    console.log(data.toString());
});
