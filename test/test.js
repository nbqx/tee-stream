var test = require('tape'),
    colorize = require('tap-colorize');

var fs = require('fs'),
    es = require('event-stream'),
    tee = require(__dirname+'/../');
var outPath1 = __dirname+'/out1.txt',
    outPath2 = __dirname+'/out2.txt';

test.createStream().on('end',function(){
  fs.unlinkSync(outPath1);
  fs.unlinkSync(outPath2);
}).pipe(colorize()).pipe(process.stdout);

test("my test",function(t){
  t.plan(2);
  var txt = fs.createReadStream(__dirname+'/test.txt');
  var out1 = fs.createWriteStream(outPath1),
      out2 = fs.createWriteStream(outPath2);
  txt.pipe(tee(es.split(),out2)).pipe(out1).on('close',function(){
    var a = fs.readFileSync(__dirname+'/test.txt').toString();
    var b = fs.readFileSync(outPath1).toString();
    t.equal(a,b);
  });
  out2.on('close',function(){
    var a = fs.readFileSync(outPath2).toString();
    t.equal(a,"aaabbbccc");
  });
});
