import { ISettingsParam, Logger } from "tslog";

const logSetting: ISettingsParam = {
  colorizePrettyLogs: true,
  dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  displayLogLevel: false,
  displayLoggerName: false,
  displayFunctionName: false,
  displayFilePath: 'hidden',
}

const log: Logger = new Logger(logSetting);

export {
  log
};
