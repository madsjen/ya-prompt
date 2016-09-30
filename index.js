const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question, allowedInput) {
  allowedInput = allowedInput || false;

  const validate = (value) => {
    switch(typeof allowedInput) {
      case 'string': return allowedInput === value;
      case 'object': return allowedInput.indexOf(value.trim()) !== -1;
      case 'function': return allowedInput(value);
    }
  };

  return new Promise(resolve => {
    const handleAnswer = answer => {
      if(!validate(answer)) {
        console.log(chalk.red('Invalid input'));
        rl.question(question, handleAnswer);
        return;
      }

      rl.pause();
      resolve(answer.trim())
    };

    rl.question(question, handleAnswer);
  });
}

module.exports = prompt;
