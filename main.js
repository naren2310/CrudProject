const fs = require('fs');
const files =  fs.readFileSync('files_1641964145340.png',{encoding: "base64"});
 fs.writeFileSync(`images/${Date.now()}.txt`, files);
// const files1 = await File.update({values:files})
// console.log(files);
console.log('completed');