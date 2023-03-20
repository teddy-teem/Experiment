require("dotenv").config();

const toBoolean = (value) =>
    value === "false" || value === "0" || String(value).toUpperCase() === "NO"
        ? false
        : Boolean(value); 
module.exports ={
  "features": {
    "signup": false,
    "hello": "ok",
    "subscription": false,
    "externalSignUpLink": "www.google.com",
    "registration": {
      "config": {
        "onPortal": false,
        "singlePageForm": true,
        "confirmEmail": true
      }
    }
  }
}
