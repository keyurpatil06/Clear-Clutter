import fs from 'fs/promises';
import fsn from 'fs';
import path from 'path';

const basepath = "---file path here---";
let files = await fs.readdir(basepath);

for (let item of files) {
    let ext = item.split(".")[item.split(".").length - 1];
    let currPath = path.join(basepath, ext);
    let oldPath = path.join(basepath, item);
    let newPath = path.join(basepath, ext, item);

    if (ext != "js" && ext != "json" && item.split(".").length > 1) {
        console.log("Running for:", item);
        if (fsn.existsSync(currPath)) { //Move file to this directory if its not a js or json file
            fs.rename(oldPath, newPath);
        } else {
            fs.mkdir(ext);
            fs.rename(oldPath, newPath);
        }
    } else {
        console.error(`Skipping file '${item}' without extension.`);
    }
}