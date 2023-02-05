require("dotenv").config();
const { AssetCache } = require("@11ty/eleventy-cache-assets");
const Airtable = require("airtable");

// You configure here…
const airtableBaseId = "appEmURFzvPaosH0U";
const airtableTable = "tblXKsltrvEdlvxc2";
const airtableTableView = "viwm7mH2tebZ4S9Cb";
const assetCacheId = "airtableCMS";
const base = new Airtable({ apiKey: process.env.airtableAPI }).base(airtableBaseId);



module.exports = () => {
  let asset = new AssetCache(assetCacheId);
  
  // Cache the data in 11ty for one day
  if (asset.isCacheValid("1d")) {
    console.log("Serving airtable data from the cache…");
    return asset.getCachedValue();
  }

  // The 11ty cache is cold… so we need to talk to Airtable
  return new Promise((resolve, reject) => {
    let allDatasets = [];

    base(airtableTable)
      .select({
        view: airtableTableView,
        // optional sorting params
        sort: [{ field: "ID", direction: "asc" }],
      })
      .eachPage(
        function page(records, fetchNextPage) {
          records.forEach((record) => {
            allDatasets.push({
              id: record._rawJson.id,
              ...record._rawJson.fields,
            });
          });
          fetchNextPage();
        },
        function done(err) {
          if (err) {
            reject(err);
          } else {
            // Put the data into the 11ty cache
            asset.save(allDatasets, "json");
            resolve(allDatasets);
          }
        },
      );
  });
};