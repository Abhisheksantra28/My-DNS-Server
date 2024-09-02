const dgram = require("node:dgram");
const dnsPacket = require("dns-packet");
const DnsRecord = require("./src/models/dnsRecord.js");

const server = dgram.createSocket("udp4");
const CACHE_TTL = 3600;

server.on("message", async (msg, rinfo) => {
  try {
    const incomingReq = dnsPacket.decode(msg);
    const domain = incomingReq.questions[0].name;
    const recordType = incomingReq.questions[0].type;
    const cacheKey = `${domain}:${recordType}`;

    // Check cache first
    const cachedRecord = await redis.get(cacheKey);
    if (cachedRecord) {
      const answers = JSON.parse(cachedRecord);
      const ans = dnsPacket.encode({
        type: "response",
        id: incomingReq.id,
        flags: dnsPacket.AUTHORITATIVE_ANSWER,
        questions: incomingReq.questions,
        answers,
      });
      server.send(ans, rinfo.port, rinfo.address);
      console.log(`Cache hit for ${cacheKey}`);
      return;
    }

    // Query MongoDB if cache miss
    const records = await DnsRecord.find({ domain, type: recordType });

    if (records.length === 0) {
      console.log(`No DNS record found for ${domain}`);
      return;
    }

    const answers = records.map((record) => ({
      type: record.type,
      class: "IN",
      name: domain,
      data: record.data,
      ttl: record.ttl,
    }));

    // Cache the result
    await redis.set(cacheKey, JSON.stringify(answers), "EX", CACHE_TTL);

    const ans = dnsPacket.encode({
      type: "response",
      id: incomingReq.id,
      flags: dnsPacket.AUTHORITATIVE_ANSWER,
      questions: incomingReq.questions,
      answers,
    });

    server.send(ans, rinfo.port, rinfo.address);
    console.log(`Cache miss for ${cacheKey}, saved to cache`);
  } catch (error) {
    console.error("Failed to process DNS request:", error);
  }
});

server
  .bind(53, () => {
    console.log("DNS server is running on port 53");
  })
  .on("error", (err) => {
    console.error("Failed to bind DNS server:", err);
  });
