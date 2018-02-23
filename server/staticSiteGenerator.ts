import chalk from "chalk";
import * as fs from "fs-extra";
import * as path from "path";

import * as clientConfig from "../webpack/client.dev";

const outputPath = clientConfig.output.path;

// tslint:disable-next-line no-var-requires
const clientStats = require("../buildClient/stats.json");
// tslint:disable-next-line no-var-requires
const serverRender = require("../buildServer/main.js").default;

const render = serverRender({ clientStats, outputPath });

const writeFile = (slug: string) => async (contents: string) => {
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

const renderRoute = async (slug: string) => {
  await render({ path: slug }, { send: writeFile(slug), status: () => 200 });
};

const renderRoutes = async (routes: string[]) => {
  for (const route of routes) {
    await renderRoute(route);
  }
};

renderRoutes(["/", "/resume"]);
