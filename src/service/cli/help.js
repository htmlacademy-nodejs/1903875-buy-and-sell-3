"use strict";

const { ExitCode } = require(`../../constants`);

module.exports = {
  name: `--help`,
  run() {
    console.info(`Программа запускает http-сервер и формирует файл с данными для API.

    Гайд:
    service.js <command>

    Команды:
    --version:            выводит номер версии
    --help:               печатает этот текст
    --generate <count>    формирует файл mocks.json`);
    process.exit(ExitCode.SUCCESS);
  },
};
