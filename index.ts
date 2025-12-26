#!/usr/bin/env node

import { select } from "@inquirer/prompts";
import boxen from "boxen";
import chalk from "chalk";
import gradient from "gradient-string";
import open from "open";
import link from "terminal-link";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const badassGradient = gradient(["#ecececff", "#353535ff"]);

/** Cute goodbye messages */
const goodbyes = [
  "Stay awesome...",
  "Keep shipping...",
  "Later, friendo...",
  "Until next time...",
];

/** Get a random goodbye */
const getGoodbye = () => goodbyes[Math.floor(Math.random() * goodbyes.length)];

/** Graceful exit with cute message */
function sayGoodbye(reason?: string) {
  console.log("\n");
  if (reason) {
    console.log(chalk.dim(`  ${reason}`));
  }
  console.log(badassGradient(`  ${getGoodbye()}\n`));
  process.exit(0);
}

// Handle ctrl-c and other exits gracefully
process.on("SIGINT", () => sayGoodbye("Caught you sneaking out..."));
process.on("SIGTERM", () => sayGoodbye());
process.on("uncaughtException", () =>
  sayGoodbye("Oops, something broke. But hey..."),
);

/**
 * Print lines with modem effect, but line-by-line for better performance on larger blocks
 */
async function modemPrintLines(text: string, msPerLine = 50) {
  const lines = text.split("\n");
  for (const line of lines) {
    console.log(line);
    await sleep(msPerLine);
  }
}

const header = `
███████╗██╗  ██╗ █████╗ ███╗   ██╗███████╗   ██╗  ██╗ ██████╗ ██╗     ██╗      ██████╗ ███╗   ███╗ █████╗ ███╗   ██╗
██╔════╝██║  ██║██╔══██╗████╗  ██║██╔════╝   ██║  ██║██╔═══██╗██║     ██║     ██╔═══██╗████╗ ████║██╔══██╗████╗  ██║
███████╗███████║███████║██╔██╗ ██║█████╗     ███████║██║   ██║██║     ██║     ██║   ██║██╔████╔██║███████║██╔██╗ ██║
╚════██║██╔══██║██╔══██║██║╚██╗██║██╔══╝     ██╔══██║██║   ██║██║     ██║     ██║   ██║██║╚██╔╝██║██╔══██║██║╚██╗██║
███████║██║  ██║██║  ██║██║ ╚████║███████╗   ██║  ██║╚██████╔╝███████╗███████╗╚██████╔╝██║ ╚═╝ ██║██║  ██║██║ ╚████║
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝╚══════╝   ╚═╝  ╚═╝ ╚═════╝ ╚══════╝╚══════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝  ╚═╝╚═╝  ╚═══╝
`;

// Show name line by line with modem effect
await modemPrintLines(badassGradient(header), 80);
await sleep(400);

const bio = `
I run an Ai Dept with some other lunatics at Cello Group Ltd

Husband to ${chalk.magenta("@linamarin")} ${chalk.green("•")} Educated at ${chalk.red("UGA")} ${chalk.green("•")} Building ${chalk.blue("Aria Platform")}

${chalk.white("Obsessed with ")}${chalk.green("•")} AI Development & Integration ${chalk.green("•")} ${chalk.dim("Wellington, NZ")}
`;

// Show bio with modem effect
const boxedBio = boxen(bio.trim(), {
  padding: 1,
  margin: 0,
  borderStyle: "round",
  borderColor: "gray",
});
await modemPrintLines(boxedBio, 40);

let choice: string;

try {
  choice = await select({
    message: "",
    theme: {
      prefix: "",
      style: {
        help: (text: string) => chalk.dim(text),
        keysHelpTip: (keys: [string, string][]) => {
          const formatted = keys
            .map(([key, label]) => `${chalk.bold(key)} ${chalk.dim(label)}`)
            .join(chalk.dim(" • "));
          return `${formatted} ${chalk.dim("•")} ${chalk.bold("esc")} ${chalk.dim("exit")}`;
        },
      },
    },
    choices: [
      {
        name: `${chalk.cyan("✔")} shaneholloman.dev`,
        value: "https://shaneholloman.dev",
      },
      {
        name: `${chalk.gray("✔")} x.com/shaneholloman`,
        value: "https://x.com/shaneholloman",
      },
      {
        name: `${chalk.white("✔")} github.com/shaneholloman`,
        value: "https://github.com/shaneholloman",
      },
    ],
  });
} catch {
  // User cancelled (ctrl-c during prompt)
  sayGoodbye();
  process.exit(0);
}

if (choice) {
  console.log(chalk.dim(`\nOpening ${choice}...\n`));
  await open(choice);
  sayGoodbye("Thanks for stopping by!");
}
