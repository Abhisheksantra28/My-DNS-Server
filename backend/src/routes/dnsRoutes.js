const express = require("express");
const {
  createDnsRecord,
  getDnsRecords,
  updateDnsRecord,
  deleteDnsRecord,
} = require("../controllers/dnsControllers.js");

const router = express.Router();

router.post("/create-record", createDnsRecord);
router.get("/get-all-records", getDnsRecords);
router.put("/update-record/:id", updateDnsRecord);
router.delete("/delete-record/:id", deleteDnsRecord);

module.exports = router;
