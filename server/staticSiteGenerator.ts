import "babel-polyfill";
import chalk from "chalk";
import fs from "fs-extra";
import path from "path";
import clientConfig from "../webpack/client.dev";

const outputPath = clientConfig.output.path;

// tslint:disable-next-line no-var-requires
const clientStats = require("../buildClient/stats.json");
// tslint:disable-next-line no-var-requires
const serverRender = require("../buildServer/main.js").default;

const render = serverRender({ clientStats, outputPath });

const writeFile = slug => async contents => {
  const filePath = path.join(
    __dirname,
    "..",
    "buildStatic",
    slug,
    "index.html"
  );
  try {
    await fs.outputFile(filePath, contents);
    // tslint:disable-next-line no-console
    console.log(chalk.green(`${slug} ✓`));
  } catch (e) {
    // tslint:disable-next-line no-console
    console.log(chalk.red(`${slug} ✗`));
    throw e;
  }
};

const renderRoute = async slug => {
  await render({ path: slug }, { send: writeFile(slug), status: () => 200 });
};

const renderRoutes = async routes => {
  const resolvedRoutes = typeof routes === "function" ? await routes() : routes;
  for (const route of resolvedRoutes) {
    await renderRoute(route);
  }
};

renderRoutes(["/", "/resume"]);
