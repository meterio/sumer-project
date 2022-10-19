"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.log = void 0;
const tslog_1 = require("tslog");
const logSetting = {
    colorizePrettyLogs: false,
    dateTimeTimezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    displayLogLevel: false,
    displayLoggerName: false,
    displayFunctionName: false,
    displayFilePath: 'hidden',
};
const log = new tslog_1.Logger(logSetting);
exports.log = log;
//# sourceMappingURL=log_settings.js.map