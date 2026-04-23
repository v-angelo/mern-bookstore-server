const dns = require("dns");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

require("dns").resolveSrv(
  "_mongodb._tcp.cluster0.fva7roa.mongodb.net",
  console.log,
);
