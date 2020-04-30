#!/usr/bin/node

const { Command } = require("commander");
const packageJSON = require("./package.json");
const docStart = require("./commands/doc-start");
const docBuild = require("./commands/doc-build");
const libBuild = require("./commands/lib-build");
const icon = require("./commands/icon");

const program = new Command();
program.version(packageJSON.version);

program
  .command("doc:start")
  .description("start document development server")
  .option("-p, --port <number>", "server port number [8080]")
  .action(docStart);

program
  .command("doc:build")
  .description("build document site")
  .action(docBuild);

program.command("lib:build").description("build library").action(libBuild);

program
  .command("icon [dirs...]")
  .description("compile svg icons into path data json")
  .action(icon);

program.parse(process.argv);
