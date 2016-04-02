(function(){
  'use strict';
  const wpi = require('wiring-pi');
  wpi.setup('gpio');

  const pin = 4;
  wpi.pinMode(pin, wpi.OUTPUT);
  wpi.softToneCreate(pin);

  const scale = [262, 294, 330, 349, 392, 440, 494, 525 ];
  const thread = (function *(){
    for(let i = 0; i < scale.length; i++){
      let freq = scale[i];
      wpi.softToneWrite(pin, freq);
      setTimeout(()=>{thread.next()}, 500);
      yield;
    }
    wpi.softToneStop(pin);
  })();
  thread.next();
})();
