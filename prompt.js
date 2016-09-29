const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

module.exports = (question, allowedInputs) => {
  allowedInputs = allowedInputs || [];

  return new Promise((resolve, reject) => {
    rl.question(question, (answer) => {
      if(allowedInputs.length && allowedInputs.indexOf(answer.trim()) === -1) {
        reject('Invalid prompt input');
      }

      rl.pause();
      resolve(answer.trim())
    });
  });
}
