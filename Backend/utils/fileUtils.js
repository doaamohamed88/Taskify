const fs = require('fs');

const read = (filePath) => {
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

const write = (filePath, data) => {
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf-8');
}

module.exports = { read, write }