#!/usr/bin/env node

const execSync = require("child_process").execSync;
const path = require("path");
const arg = process.argv;
execSync(`mkdir ${arg[2]}`, { pwd: __dirname });
execSync(`mkdir ${arg[2]}/src`, { pwd: __dirname });
execSync(`mkdir ${arg[2]}/src/controllers`);
execSync(`mkdir ${arg[2]}/src/models`);
execSync(`mkdir ${arg[2]}/src/variables`);
execSync(`touch ${arg[2]}/src/controllers/healthController.js`);
execSync(`touch ${arg[2]}/src/index.js`);
execSync(`touch ${arg[2]}/src/routes.js`);
execSync(`touch ${arg[2]}/src/.env`);
execSync(`touch ${arg[2]}/.gitignore`);
execSync(`npm init -y`, { pwd: path.join(__dirname, `${arg[2]}/src`) });
