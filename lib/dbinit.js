const low = require("lowdb");
const path = require("path");
const FileSync = require("lowdb/adapters/FileSync");
const home = require("user-home"); //获取系统用户目录路径

const adapter = new FileSync(path.join(home, ".apidb.json"));
module.exports = low(adapter);
