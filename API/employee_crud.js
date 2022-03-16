const express = require("express");
const router = express.Router();

//=======importing====ProfileSChema====from Model=======
const ProfileSChema = require("../Model/profil.js");

//=======GET============
//======GET All_EMP DETAILS======
router.get("/", async (req, res) => {
  try {
    let data = await ProfileSChema.find();
    if (!data) throw Error("There is no data to find");
    res.status(200).json(data);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

//=======GET============
//======GET ONE EMP DETAILS======
router.get("/findone/:id", async (req, res) => {
  try {
    let data = await ProfileSChema.findById(req.params.id);
    if (!data) throw Error("There is no data to findEmplayee"); //promise example
    Promise.resolve(res.status(200).json(data)); //at reslove stage
  } catch (err) {
    Promise.reject(res.status(400).json({ msg: err })); //at reject stage
  }
});

//=======POST============
//======CREATE POST======
router.post("/create", async (req, res) => {
  let data = new ProfileSChema(req.body);
  try {
    let post = await data.save();
    if (!post) throw Error("while error at posting"); //promise example
    return Promise.resolve(res.status(200).json(post)); //at reslove stage
  } catch (err) {
    return Promise.reject(res.status(400).json({ msg: err })); //at reject stage
  }
});

//=======PUT============
//======UPDATE ONE VALUE or Multiple FROM EMP ======
router.put("/update/:id", async (req, res) => {
  try {
    let data = await ProfileSChema.findByIdAndUpdate(req.params.id, req.body);
    if (!data) throw Error("there is no data to update"); //promise example
    return Promise.resolve(
      res.status(200).json({ message: "Updated Successfully" }) //at reslove stage
    );
  } catch (err) {
    return Promise.reject(res.status(400).json({ msg: err })); //at reject stage
  }
});

//=========DELETE==========
//======DELETE ONE EMP ======
router.delete("/delete/:id", async (req, res) => {
  try {
    let data = await ProfileSChema.findByIdAndDelete(req.params.id, req.body);
    if (!data) throw Error("there is no  to Delete"); //promise example
    return Promise.resolve(
      res.status(200).json({ message: "Deleted Successfully" }) //at reslove stage
    );
  } catch (err) {
    return Promise.reject(res.status(400).json({ success: true })); //at reject stage
  }
});

//Filter() method example service
//for checking this service , create two emp with username revanth
//nd also create some other names then check
//this setvice return only revanth emp data
router.get("/filter", async (req, res) => {
  try {
    let data = await ProfileSChema.find();
    let filterData = await data.filter((val) => val.username == "revanth");
    if (!filterData) throw Error("There is no data to find");
    res.status(200).json(filterData);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});
module.exports = router;

//Map() method example service
//for checking this service , create two emp with username kumar
//nd also create some other names then check
//this setvice return only kumar emp data
router.get("/map", async (req, res) => {
  try {
    let data = await ProfileSChema.find();
    let mapData = await data
      .filter((val) => val.username == "kumar")
      .map((val) => val);
    if (!mapData) throw Error("There is no data to find");
    res.status(200).json(mapData);
  } catch (err) {
    res.status(400).json({ msg: err });
  }
});

// create a service to find how many words are strings, numeric and alphanumeric in the above sentence.

// function test() {
//   let sentance = "876 records are there for 3A block";
//   let splitData = sentance.split(" ");
//   // console.log(splitData);
//   splitData.map((val) => {
//     const alphanumeric = /^[\p{sc=Latn}\p{Nd}]*$/u;

//     console.log("alphanumeric", val.match(alphanumeric));

//     if (typeof val != "string") {
//       console.log("string ", val);
//       return val;
//     }

//     if (!isNaN(val)) {
//       console.log("Numaric ", val);
//       return val;
//     }
//   });
// }
// test();
module.exports = router;
