const config = require("../config/config");
const httpStatus = require("http-status");
const { Categories } = require("../models");
const { getCategorySlugNames } = require("./categories.service");
const ApiError = require("../utils/ApiError");



const prerender = async (n = 3) => {
  try {
    const categories = await getCategorySlugNames(n);
    console.log('num categories:', categories.length);
    const result = await renderPages(categories);

  }
  catch (err) {
    console.log('err:', err);
  }
}

const renderPages = async (categories) => {
  const promises = categories.map(async (category) => {
    const { slug, name } = category;
    const result = await getAISummary('covid-19', name);
    console.log('result:', result);
  });
  return Promise.all(promises);
}

/*
setTimeout(async function() {
  const f = await getAISummary('covid-19', 'infectuous disease');
  //console.log('f:', f);
}, 1000);
*/

module.exports = {
  prerender
}
