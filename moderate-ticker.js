(function(){
  'use strict';
  const wpi = require('wiring-pi');
  wpi.setup('gpio');

  const pin = 18;
  wpi.pinMode(pin, wpi.PWM_OUTPUT);

  const thread = (function *(){
    for(let i = 0; i < 10; i++){
      for(let j = 0; j < 1024; j++){
        wpi.pwmWrite(pin, (1023 - j));
        setTimeout(function(){thread.next();}, 1);
        yield;
      }
      for(let j = 0; j < 1024; j++){
        wpi.pwmWrite(pin, j);
        setTimeout(function(){thread.next();}, 1);
        yield;
      }
    }
  })();
  thread.next();
})();
