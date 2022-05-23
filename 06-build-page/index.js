const fsPromises = require('fs/promises');
const fs = require('fs');
const path = require('path');

const pathDir = path.join(__dirname, "project-dist");
const htmlFile = path.join(pathDir, "index.html");
const cssFile = path.join(pathDir, "style.css");
const newAssets = path.join(pathDir, "assets")
const components = path.join(__dirname, 'components');
const assets = path.join(__dirname, 'assets');
const styles = path.join(__dirname, 'styles');
const template = path.join(__dirname, 'template.html');
let arr = [];
    
async function bundleCss() {
    const files = await fsPromises.readdir(styles, {withFileTypes: true});
    for (const file of files) {
        const pathFile = path.join(styles, file.name);
        const typeFile = path.extname(pathFile).slice(1);
        if (file.isFile() && typeFile === 'css') {
            const content = await fsPromises.readFile(pathFile, 'utf8');
            arr.push(content)
        }
    }
    await fsPromises.writeFile(cssFile, arr);
}


async function copyAssets(fromAssets, toAssets) {    
    const filesAssets = await fsPromises.readdir(fromAssets, {withFileTypes: true});
    for (const file of filesAssets) {
        const from = path.join(fromAssets, file.name);
        const to = path.join(toAssets, file.name);
        if (file.isFile()) {
            await fsPromises.copyFile(from, to);
        } else {
            await fsPromises.mkdir(to, { recursive: true });
            copyAssets(from, to)
        }
    } 
}    

async function createFile() {
    let newTemplate = await fsPromises.readFile(template, 'utf-8');
    const compFiles = await fsPromises.readdir(components, {withFileTypes: true});
    for (const file of compFiles) {
        const content = await fsPromises.readFile(path.join(components, file.name), 'utf-8');
        const reg = new RegExp(`{{${(file.name).split('.')[0]}}}`, 'g')
        newTemplate = newTemplate.replace(reg, content);
    }
    await fsPromises.writeFile(htmlFile, newTemplate);
}
async function bundle() {
    fs.access(pathDir, (error) => {
          if (error) {
            fsPromises.mkdir(pathDir);
          }
        });
    createFile();
    bundleCss();
    await fsPromises.rm(newAssets, { force: true, recursive: true });
    await fsPromises.mkdir(newAssets, { recursive: true });

    copyAssets(assets, newAssets)
}
bundle()