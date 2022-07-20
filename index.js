#!/usr/bin/env node

const execSync = require("child_process").execSync;
const path = require("path");

execSync("mkdir src", { pwd: __dirname });
execSync("mkdir src/controllers");
execSync("mkdir src/models");
execSync("mkdir src/variables");
execSync("touch src/controllers/healthController.js");
execSync("touch src/index.js");
execSync("touch src/routes.js");
execSync("touch src/.env");
execSync("touch .gitignore");
execSync("npm init -y", { pwd: path.join(__dirname, "src") });
execSync("npm i axios", { pwd: path.join(__dirname, "src") });
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
