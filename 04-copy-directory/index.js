const fsPromises = require('fs/promises');
const path = require('path');
const pathDirTo = path.join(__dirname, 'files-copy');
const pathDirFrom = path.join(__dirname, 'files');

async function copy() {
    await fsPromises.rm(pathDirTo, { force: true, recursive: true });
    await fsPromises.mkdir(pathDirTo, { recursive: true });
    const files = await fsPromises.readdir(pathDirFrom, {withFileTypes: true});
    for (const file of files) {
        const from = path.join(pathDirFrom, file.name);
        const to = path.join(pathDirTo, file.name);
        if (file.isFile()) {
            await fsPromises.copyFile(from, to);
        } else {
            await fsPromises.mkdir(to, { recursive: true });
        }
    }
}
copy()
