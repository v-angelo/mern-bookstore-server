const dns = require("dns");

module.exports = function initDNS() {
  dns.setServers(["8.8.8.8", "1.1.1.1"]);
};
