const mongoose = require("mongoose");

const dnsRecordSchema = new mongoose.Schema(
  {
    domain: {
      type: String,
      required: true,
      unique: true,
    },
    type: {
      type: String,
      required: true,
    }, // A, CNAME, NS, etc.
    data: {
      type: String,
      required: true,
    }, // IP address, hostname, etc.
    ttl: {
      type: Number,
      default: 3600,
    }, // Time-to-live
  },
  { timestamps: true }
);

module.exports = mongoose.model("DnsRecord", dnsRecordSchema);
