const fsPromises = require('fs/promises');
const path = require('path');
const pathDirStyles = path.join(__dirname, 'styles');
let arr = [];

async function bundle() {
    const files = await fsPromises.readdir(pathDirStyles, {withFileTypes: true});
    for (const file of files) {
        const pathFile = path.join(pathDirStyles, file.name);
        const typeFile = path.extname(pathFile).slice(1);
        if (file.isFile() && typeFile === 'css') {
            const content = await fsPromises.readFile(pathFile, 'utf8');
            arr.push(content)
        }
    }
    const file = path.join(__dirname, 'project-dist', 'bundle.css')
    await fsPromises.writeFile(file, arr)
}
bundle()