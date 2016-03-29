(function(){
  'use strict';
  const wpi = require('wiring-pi');
  wpi.setup('gpio');

  const pin = 21;
  wpi.pinMode(pin, wpi.OUTPUT);

  let value = 1;
  const thread = (function *(){
    for(let i = 0; i < 100; i++){
      wpi.digitalWrite(pin, value);
      value = +!value;
      setTimeout(()=>{thread.next()}, 200);
      yield;
    }
  })();
  thread.next();
})();
