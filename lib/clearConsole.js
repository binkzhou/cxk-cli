const chalk = require("chalk");
const { getVersion } = require("./api");
const semver = require("semver");
const readline = require("readline");

const getLastVersion = async function (versionRange = "latest") {
  const metadata = await getVersion();
  if (Object.keys(metadata["dist-tags"])) {
    return metadata["dist-tags"][versionRange];
  }
  const versions = Array.isArray(metadata.versions)
    ? metadata.versions
    : Object.keys(metadata.versions);

  return semver.maxSatisfying(versions, versionRange);
};

// 生成title
const generateTitle = async function () {
  const currentVersion = require("../package.json").version;
  let title = chalk.bold.blue(`Cxk CLI v${currentVersion}`);
  const lastVersion = await getLastVersion();
  if (semver.gt(lastVersion, currentVersion)) {
    let upgradeMessage = `New version available ${chalk.magenta(
      currentVersion
    )} → ${chalk.green(lastVersion)}`;

    upgradeMessage += `\nRun ${chalk.yellow(`npm i -g cxk-cli`)} to update!`;
    const upgradeBox = require("boxen")(upgradeMessage, {
      align: "center",
      borderColor: "green",
      dimBorder: true,
      padding: 1,
    });
    title += `\n${upgradeBox}\n`;
  }
  return title;
};

const clearConsole = function (title) {
  const blank = "\n".repeat(process.stdout.rows);
  console.log(blank);
  readline.cursorTo(process.stdout, 0, 0);
  readline.clearScreenDown(process.stdout);
  if (title) {
    console.log(title);
  }
};

// 清除控制台
exports.clearConsole = async function clearConsoleWithTitle() {
  const title = await generateTitle();
  clearConsole(title);
};
