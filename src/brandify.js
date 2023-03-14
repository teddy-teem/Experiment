#! /usr/bin/env node
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const shell = require("shelljs");
const brandConfig = require("./brand-config.json");
const planBenefits = require("./planBenefits.json");
const { colors, colorsV2, brandInfo, features, emails, defaults } = brandConfig;
const hasBorder = colors.loginBorder !== "#ffffff";
console.log(process.cwd())
// assets paths
const baseAppPath ="src";
const baseAppStylePath = path.join(baseAppPath, "styles");
const baseAppConfigPath = path.join(baseAppPath, "configs");
const assetDest = path.join(baseAppStylePath, "brand");
const scssPath = path.join(baseAppStylePath, "_theme.scss");
const jsPath = path.join(baseAppConfigPath, "theme.js");
const configPath = path.join(baseAppConfigPath, "brand.js");
const featuresPath = path.join(baseAppConfigPath, "features.json");
const planBenefitsPath = path.join(baseAppConfigPath, "planBenefits.json");

const marketingSiteURL = process.env.REACT_APP_MARKETING_SITE_URL || "";

console.log("> Configuring base-app");

const updateBrandColors = () => {
  try {
    let js = `
const lighten = (color, percent) => {
  const num = parseInt(color, 16),
    amt = Math.round(2.55 * percent),
    R = (num >> 16) + amt,
    B = ((num >> 8) & 0x00ff) + amt,
    G = (num & 0x0000ff) + amt;

  const hex = (
    0x1000000 +
    (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
    (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
    (G < 255 ? (G < 1 ? 0 : G) : 255)
  )
    .toString(16)
    .slice(1);
  return "#"+hex;
};

export const themeColors = {`;
    let scss = `
    @function theme($variant: "") {
        @return map-get((`;
    Object.keys(colors).map((key) => {
      scss += `
        "${key}":${colors[key]},`;
      js += `
  "${key}": "${colors[key]}",`;
      if (key === "primary") {
        js += `
  primaryLight: lighten("${colors[key].slice(1)}", 30),
  primaryFaded: lighten("${colors[key].slice(1)}", 30),`;
      }
      if (key === "secondary") {
        js += `
    secondaryLight: lighten("${colors[key].slice(1)}", 30),
    secondaryFaded: lighten("${colors[key].slice(1)}", 50),`;
      }
      if (key === "text") {
        js += `
    textAlternative: lighten("${colors[key].slice(1)}", 30),`;
      }
    });
    scss += `
        "logo": "/logo.png",
        "logo-small": "/logo-small.png",
        "wallet-quick-link":"/quicklink-wallet.png",
        "card-front": "/card-front.png",
        "card-back": "/card-back.png",
        "wallet": "/wallet.png",
        "wallet-active": "/wallet-active.png",
        "login-bg":"/login-bg.png"
    ), $variant);
    }`;
    js += `
}

export const themeColorsV2 = {`;
    Object.keys(colorsV2).map((key) => {
      js += `"${key}": "${colorsV2[key]}",`;
    });
    js += `
}

export const hasLoginBorder = ${hasBorder};`;

    // update package scss
    fs.writeFileSync(scssPath, scss);
    console.log("> _theme.scss updated");
    // update Theme Js
    fs.writeFileSync(jsPath, js);
    console.log("> theme.js updated");
  } catch (e) {
    console.error(
      "\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n@\tBrand information missing\n@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@\n",
      e
    );
  }
};

const updateBrandVars = () => {
  let config = `
export const brand = "${brandInfo.brandName}";
export const displayName = "${brandInfo.displayName}";
export const usBrand = "${
    brandInfo.brandNameUS ? brandInfo.brandNameUS : brandInfo.brandName
  }";
export const contactEmail = "${emails.contactEmail}";
export const defaultCurrency = "${defaults.currency}";
export const defaultCountry = "${defaults.country}";
export const defaultDialingCode = "${defaults.dialingCode}";
export const defaultLanguageCode = "${defaults.languageCode ? defaults.languageCode : ""}";
export const policyUrls = {`;
  Object.keys(features.docs.config.applicableDocs).map((docName) => {
    const doc = features.docs.config.applicableDocs[docName];
    if (doc.enabled) {
      config += `
    ${docName}:"${doc.config.isExternal ? doc.config.url : `${marketingSiteURL}${doc.config.url}`}",`;
    }
  });
  config += `
}
policyUrls.referral = "${marketingSiteURL}"
`;

  fs.writeFileSync(configPath, config);
  console.log("> Brand.js updated");
};

const updateFeatures = () => {
  fs.writeFileSync(featuresPath, JSON.stringify(features, null, 4));
  console.log("> Features configured");
};

const updatePlanBenefits = () => {
  fs.writeFileSync(planBenefitsPath, JSON.stringify(planBenefits, null, 4));
  console.log("> PlanBenefits configured");
};

const rebuildPackage = async () => {
  console.log("> Re-building base-app ...");
  shell.exec("npm run build-css");
  shell.exec("react-scripts start");
};

// create asset dir
fs.mkdir(assetDest, async (err) => {
  if (!err) {
    console.log("> Brand Directory created");
  }
  await Promise.all([
    updateBrandColors(),
    updateBrandVars(),
    updateFeatures(),
    updatePlanBenefits(),
    rebuildPackage()
  ]);
});
