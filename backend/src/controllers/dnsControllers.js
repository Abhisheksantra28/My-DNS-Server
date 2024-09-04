const DnsRecord = require("../models/dnsRecord.js");
const { redis } = require("../config/redis.js");

const CACHE_TTL = 3600; // Cache Time-to-Live in seconds

// Create a DNS record
const createDnsRecord = async (req, res) => {
  const { domain, type, data, ttl } = req.body;
  if (!domain || !type || !data || !ttl) {
    return res.status(400).json({
      success: false,
      message: "All fileds are required!",
    });
  }
  try {
    const record = new DnsRecord({ domain, type, data, ttl });
    await record.save();

    // Invalidate cache
    const cacheKey = `${domain}:${type}`;
    await redis.del(cacheKey);

    return res.status(201).json({
      success: true,
      message: "New record has been created!",
      data: record,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "error occur while creating the record!",
      error: err.message,
    });
  }
};

// Get all DNS records
const getDnsRecords = async (req, res) => {
  try {
    const records = await DnsRecord.find({});

    if (!records) {
      return res.status(404).json({
        success: false,
        message: "No records found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Records fetched successfully",
      data: records,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      message: "error occur while getting the records!",
      error: err.message,
    });
  }
};

// Update a DNS record
const updateDnsRecord = async (req, res) => {
  const id = req.params.id;
  const { domain, type, data, ttl } = req.body;
  try {
    const record = await DnsRecord.findByIdAndUpdate(
      id,
      { domain, type, data, ttl },
      { new: true }
    );

    // Invalidate cache
    const cacheKey = `${record.domain}:${record.type}`;
    await redis.del(cacheKey);

    return res.status(200).json({
      success: true,
      message: "Record updated successfully",
      data: record,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error occur while updating the record!",
      error: err.message,
    });
  }
};

// Delete a DNS record
const deleteDnsRecord = async (req, res) => {
  const id = req.params.id;
  try {
    const record = await DnsRecord.findByIdAndDelete(id);

    // Invalidate cache
    const cacheKey = `${record.domain}:${record.type}`;
    await redis.del(cacheKey);

    return res.status(200).json({
      success: true,
      message: "Record deleted successfully",
      data: record,
    });
  } catch (err) {
    return res.status(400).json({
      success: false,
      message: "Error occur while deleting the record!",
      error: err.message,
    });
  }
};

module.exports = {
  createDnsRecord,
  getDnsRecords,
  updateDnsRecord,
  deleteDnsRecord,
};
