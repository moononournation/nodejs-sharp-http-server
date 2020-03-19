const http = require('http');
const fs = require('fs');
const sharp = require('sharp');

const photoFolder = './photo/';

//create a server object:
http.createServer(function (req, res) {
  let parts = req.url.split('/');
  let last_part = parts[parts.length - 1];
  console.log("last_part: [" + last_part + "]");

  if ((last_part) && (last_part > '')) { // return resized image
    sharp(photoFolder + last_part)
    .resize(320, 240)
    .jpeg()
    .toBuffer(function (err, data, info) {
      res.writeHead(200, {'Content-Type': 'image/jpeg'});
      res.end(data); // Send the file data to the browser.
    });
  } else { // return image list
    let files = fs.readdirSync(photoFolder);
    let res_str = '';
    for (var i = 0; i < files.length; i++) {
      let file = files[i];
      if (file.substr(-4).toLowerCase() == '.jpg') {
        if (res_str > '') {
          res_str += ',';
        }
        res_str += file;
      }
    }
    res.end(res_str);
  }

}).listen(3200);
