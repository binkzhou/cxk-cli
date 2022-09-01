const chalk = require("chalk");

// 生成title
const generateTitle = function () {
  let title = chalk.bold.blue(`XX CLI v1.0.2`);
  let upgradeMessage = `New version available ${chalk.magenta(
    "4.5.13"
  )} → ${chalk.green("5.0.8")}`;
  upgradeMessage += `\nRun ${chalk.yellow(`npm i -g xxxxx-cli`)} to update!`;
  const upgradeBox = require("boxen")(upgradeMessage, {
    align: "center",
    borderColor: "green",
    dimBorder: true,
    padding: 1,
  });
  title += `\n${upgradeBox}\n`;
  return title;
};

// 清除控制台
exports.clearConsole = async function clearConsoleWithTitle() {
  console.clear();
  console.log(generateTitle());
};
