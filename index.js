#!/usr/bin/env node

const execSync = require("child_process").execSync;
const path = require("path");
const arg = process.argv;
execSync(`mkdir ${arg[2]}`);
execSync(`mkdir src`, { cwd:  `${arg[2]}` });
execSync(`mkdir controllers`, { cwd: `${arg[2]}/src` });
execSync(`mkdir models`, { cwd: `${arg[2]}/src` });
execSync(`mkdir variables`, { cwd: `${arg[2]}/src` });
execSync(`touch healthController.js`,{ cwd:  `${arg[2]}/src/controllers` });
execSync(`touch index.js`, { cwd: `${arg[2]}/src` } );
execSync(`touch routes.js`, { cwd: `${arg[2]}/src` });
execSync(`touch .env`, { cwd: `${arg[2]}/src` });
execSync(`touch .gitignore`, {cwd: `${arg[2]}`});
execSync(`npm init -y`, { cwd: `${arg[2]}/src` });
execSync(`npm i koa koa-body koa-router dotenv axios`, { cwd: `${arg[2]}/src` });

