#!/usr/bin/env node

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
