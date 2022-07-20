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
execSync(`npm i axios`, { pwd: path.join(__dirname, `${arg[2]}/src`) });

const axios = require("axios").default;
const getData = async () => {
  return axios
    .get(`https://jsonplaceholder.typicode.com/todos/1`)
    .then(res => res.data)
    .catch(err => err);
};

const printData = async () => {
  const data = await getData();
  console.log("=>>>>>>", data);
};
printData();
