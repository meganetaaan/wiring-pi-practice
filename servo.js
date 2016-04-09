(function(){
  'use strict';
  const wpi = require('wiring-pi');
  wpi.setup('gpio');

  const pin = 18;
  wpi.pinMode(pin, wpi.PWM_OUTPUT);
  wpi.pwmSetMode(wpi.PWM_MODE_MS);
  wpi.pwmSetClock(400);
  wpi.pwmSetRange(1024);

  process.stdin.resume();
  process.stdin.setEncoding('utf8');

  process.stdin.on('data', function (chunk) {
    if(chunk >= 0 && chunk <= 180){
      const deg = Number(chunk);
      const val = Math.round(24 + (deg / 180.0) * (115 - 24));
      
      wpi.pwmWrite(pin, val);
      process.stdout.write('set servo degree to: ' + chunk);
    } else {
      process.stdout.write('please input servo degree in [0..180]\n');
    }
  });

  process.stdin.on('end', function () {
    process.stdout.write('end');
    return 0;
  });

  process.stdout.write('please input servo degree in [0..180]\n');
})();
