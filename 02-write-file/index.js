const fs = require('fs');
const path = require('path');
const { stdin, stdout } = process;

fs.writeFile(
    path.join(__dirname, 'text.txt'),
    '',
    (err) => {
        if (err) throw err;
        stdout.write('Пожалуйста, введите текст и нажмите enter... \n');  
    }
);
stdin.on('data', data => {
    if (data.toString().trim() === 'exit') {
            process.exit()
        }
    fs.appendFile(
    path.join(__dirname, 'text.txt'), data,
    err => {
        if (err) throw err;
    })
})
process.on('SIGINT', () => process.exit())
process.on('exit', () => stdout.write('Работа завершена'));