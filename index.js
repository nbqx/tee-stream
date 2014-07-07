var es = require('event-stream');
module.exports = function(){
  var pipes = Array.prototype.slice.call(arguments),
      pp = es.pipeline.apply(null,pipes);
  return es.through(function write(data){
    pp.write(data);
    this.emit('data',data);
  },function end(){
    pp.end();
    this.emit('end');
  });
};
