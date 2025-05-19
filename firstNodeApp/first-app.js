const fs = require('fs'); // imports the File System module from NodeJS
console.log('hello world');

fs.writeFileSync('hello.txt', "This comes from File System. Neat, huh?"); // method to write file into HDD arguments (nameOfFile, contentOfFile)
