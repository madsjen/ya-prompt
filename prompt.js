module.exports = (question, allowedInputs) => new Promise((resolve, reject) => {
  allowedInputs = allowedInputs || [];

  process.stdout.write(question);
  process.stdin.setEncoding('utf8');
  process.stdin.once('data', answer => {
    if(allowedInputs.length && allowedInputs.indexOf(answer.trim()) === -1) {
      reject('Invalid prompt input');
    }

    resolve(answer.trim());
    process.stdin.pause();
  }).resume();
});
