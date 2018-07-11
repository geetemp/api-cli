const chalk = require("chalk");
// const format = require("util").format;
const formatWithOptions = require("util").formatWithOptions;

const prefix = "   api-cli";
const sep = chalk.gray("·");
const inspectOptions = { depth: 10, showProxy: true };

/**
 * 打印日志到控制台
 * @param {String} args
 */
exports.log = function(...args) {
  // const msg = format.apply(format, args);
  const msg = formatWithOptions.apply(formatWithOptions, [
    inspectOptions,
    args
  ]);
  console.log(chalk.white(prefix), sep, msg);
};

/**
 * 打印错误信息到控制台并退出进程
 * @param {String} args
 */
exports.fatal = function(...args) {
  if (args[0] instanceof Error) args[0] = args[0].message.trim();
  // const msg = format.apply(format, args);
  const msg = formatWithOptions.apply(formatWithOptions, [
    inspectOptions,
    args
  ]);
  console.log(chalk.red(prefix), sep, msg);
  process.exit(1);
};

/**
 * 打印成功信息到控制台
 * @param {String} args
 */
exports.success = function(...args) {
  const msg = formatWithOptions.apply(formatWithOptions, [
    inspectOptions,
    args
  ]);
  console.log(chalk.white(prefix), sep, msg);
};
