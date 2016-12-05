'use strict';

const readline = require('readline');
const chalk = require('chalk');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function prompt(question, allowedInput) {
  if(question instanceof Array) {
    return new Promise(resolve => {
      let chain = Promise.resolve();
      let answers = [];

      for(const q of question) {
        chain = chain
          .then(prompt.bind(this, q.question, q.validate))
          .then(answer => answers.push(answer));
      }

      chain.then(() => resolve(answers));
    });
  }

  allowedInput = allowedInput || false;

  const validate = (value) => {
    switch(typeof allowedInput) {
      case 'string': return allowedInput === value;
      case 'object': return allowedInput.indexOf(value.trim()) !== -1;
      case 'function': return allowedInput(value);
      default: return true;
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
