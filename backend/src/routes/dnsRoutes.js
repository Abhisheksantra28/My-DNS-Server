const express = require("express");
const {
  createDnsRecord,
  getDnsRecords,
  updateDnsRecord,
  deleteDnsRecord,
  checkNameserver,
} = require("../controllers/dnsControllers.js");

const router = express.Router();

router.post("/create-record", createDnsRecord);
router.get("/get-all-records", getDnsRecords);
router.put("/update-record/:id", updateDnsRecord);
router.delete("/delete-record/:id", deleteDnsRecord);
router.post("/check-nameserver", checkNameserver);

module.exports = router;
