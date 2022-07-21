#!/usr/bin/env node

const execSync = require("child_process").execSync;
const path = require("path");
const arg = process.argv;
execSync(`mkdir ${arg[2]}`);
execSync(`mkdir src`, { cwd: path.join(__dirname, arg[2]) });
execSync(`mkdir controllers`, { cwd: path.join(__dirname, `${arg[2]}/src`) });
execSync(`mkdir models`, { cwd: path.join(__dirname, `${arg[2]}/src`) });
execSync(`mkdir variables`, { cwd: path.join(__dirname, `${arg[2]}/src`) });
execSync(`touch healthController.js`,{ cwd: path.join(__dirname, `${arg[2]}/src/controllers`) });
execSync(`touch index.js`, { cwd: path.join(__dirname, `${arg[2]}/src`) } );
execSync(`touch routes.js`, { cwd: path.join(__dirname, `${arg[2]}/src`) });
execSync(`touch .env`, { cwd: path.join(__dirname, `${arg[2]}/src`) });
execSync(`touch .gitignore`);
execSync(`npm init -y`, { cwd: path.join(__dirname, `${arg[2]}/src`) });
