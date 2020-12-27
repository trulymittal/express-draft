const validate = require('validate-npm-package-name');

let result = validate('exp-draft');
console.log(result);
result = validate('express-draft');
console.log(result);
