const mongoose = require("mongoose");
const Listing = require("../schema/scema.js");
const initdata = require("../insert.js");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/hotelbokking");
}

const initDB = async () => {
  await Listing.deleteMany({});
  initdata.data=initdata.data.map((obj)=>({...obj,owner:"69c64b807036b77e494112b1"}));
  await Listing.insertMany(initdata.data);
  console.log("data is initialised");
};

initDB();

main()
  .then(async () => {
    console.log("connect successfully");
    await initDB();
  })
  .catch((err) => {
    console.log(err);
  });