const db = require("./dbinit");
const logger = require("./logger");

/**
 * 获取serverHost 配置
 */
exports.serverHost = function() {
  const serverHost = db.get("serverHost").value();
  if (!serverHost) {
    logger.fatal(
      "server-host must be setted,please use 'api proxy <server-host>' command to set and bootstarp"
    );
  }
  return serverHost;
};
