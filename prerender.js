const config = require("../config/config");
const httpStatus = require("http-status");
const { Categories } = require("../models");
const { getCategorySlugNames } = require("./categories.service");
const ApiError = require("../utils/ApiError");
const puppeteer = require("puppeteer");
const fs = require("fs");
const path = require("path");

const prerender = async (n = 3) => {
  try {
    const categories = await getCategorySlugNames(n);
    console.log("num categories:", categories.length);
    const result = await renderPages(categories);
    console.log("Pages rendered successfully");
  } catch (err) {
    console.log("err:", err);
  }
};

const renderPages = async (categories) => {
  const browser = await puppeteer.launch();
  const promises = categories.map(async (category) => {
    const { slug, name } = category;
    const page = await browser.newPage();
    await page.goto(`${config.baseUrl}/category/${slug}`, {
      waitUntil: "networkidle2",
    });
    const content = await page.content();
    const filePath = path.join(__dirname, `../prerendered/${slug}.html`);
    fs.writeFileSync(filePath, content);
    await page.close();
  });
  await Promise.all(promises);
  await browser.close();
};

module.exports = {
  prerender,
};
