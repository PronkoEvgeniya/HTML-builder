const fsPromises = require('fs/promises');
const path = require('path');

(async () => {
    const files = await fsPromises.readdir(path.join(__dirname, 'secret-folder'), {withFileTypes: true});
    for (let file of files) {
        if (file.isFile()) {
            const fileName = file.name.split('.')[0];
            const pathFile = path.join(__dirname, 'secret-folder', file.name);
            const typeFile = path.extname(pathFile).slice(1);
            const stats = await fsPromises.stat(pathFile);
            console.log(`${fileName} - ${typeFile} - ${(stats.size)/1000 + 'kb'}`)
        }
    }
})();
