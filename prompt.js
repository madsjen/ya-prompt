const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question, allowedInputs) {
  allowedInputs = allowedInputs || [];

  return new Promise(resolve => {
    const handleAnswer = answer => {
      if(allowedInputs.length && allowedInputs.indexOf(answer.trim()) === -1) {
        console.log(chalk.red('Invalid input'));
        rl.question(question, handleAnswer);
        return;
      }

      resolve(answer.trim())
    };

    rl.question(question, handleAnswer);
  });
}

module.exports = prompt;
