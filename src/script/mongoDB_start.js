
const { exec } = require('child_process');
// const { stdout, stderr } = require('process');

function startMongo(){

    exec('net start mongoDB',(error,stdout,stderr) => {
        
        if(error){
            console.error(`Error starting MongoDB: ${error.message}`);
        }

        if(stderr){
            console.error(`MongoDB start warning: ${stderr}`);
        }

        console.log(stdout);
    });

}


function stopMongo() {
  exec('net stop MongoDB', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error stopping MongoDB: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`MongoDB stop warning: ${stderr}`);
    }
    console.log(stdout);
  });
}

module.exports = { startMongo, stopMongo };
