## tee-stream

just like [tee(1)](http://man7.org/linux/man-pages/man1/tee.1.html) stream

## usage

```js
var fs = require('fs');
var tee = require(__dirname+'/');
var es = require('event-stream');

// ex.1
var inp = fs.createReadStream(__filename),
    halfway = fs.createWriteStream(__dirname+'/halfway.txt');

inp.pipe(tee(
  es.split(),
  halfway
)).pipe(process.stdout);

// ex.2
var base64 = require('base64-stream');
var inpImg = fs.createReadStream(__dirname+'/test/test.jpg'),
    dat = fs.createWriteStream(__dirname+'/out.dat'),
    outImg = fs.createWriteStream(__dirname+'/out.jpg');

inpImg.pipe(tee(
  base64.encode(),
  dat
)).pipe(outImg);
```
