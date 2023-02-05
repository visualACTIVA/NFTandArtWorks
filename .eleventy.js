const UpgradeHelper = require("@11ty/eleventy-upgrade-help");

module.exports = function(eleventyConfig) {


  eleventyConfig.addDataExtension("airtable", function() {
    return new Promise((resolve, reject) => {
      base('Collections').find('recYTZis2hyjNgGxT', function(err, record) {
        if (err) {
          reject(err);
        }
        resolve(record.fields);
      });
    });
  });
  eleventyConfig.addPlugin(UpgradeHelper);
  eleventyConfig.addPassthroughCopy("./src/img/");
  eleventyConfig.addPassthroughCopy("./src/css/style.css");
  eleventyConfig.addPassthroughCopy("./src/js/");

  eleventyConfig.addDataExtension("airtable", function() {
    return new Promise((resolve, reject) => {
      base('Collections').find('recYTZis2hyjNgGxT', function(err, record) {
        if (err) {
          reject(err);
        }
        resolve(record.fields);
      });
    });
  });

  return {
    markdownTemplateEngine: "njk",
    dir: {
      input: 'src',
      output: 'public',
    },
  };
};