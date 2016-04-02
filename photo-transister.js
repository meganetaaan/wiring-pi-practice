(function(){
  'use strict';
  const wpi = require('wiring-pi');
  wpi.wiringPiSPISetup(0, 1000000);
// node: ../src/node_buffer.cc:188: char* node::Buffer::Data(v8::Local<v8::Object>): Assertion `obj->IsUint8Array()'
  const thread = (function *(){
    for(let i = 0; i < 10; i++){
      var data = new Buffer([0b01101000, 0]);
      wpi.wiringPiSPIDataRW(0, data);
      var value = (data[0] * 256 + data[1]) & 0x3ff;
      console.log(value);
      setTimeout(function(){thread.next();}, 1000);
      yield;
    }
  })();
  thread.next();
})();
