import { queryOneCheckRepository, updateCheckRepository } from "../repository/checkRepository";
import ping from "ping";
import cron from "node-cron";

export const execPollingSchedule = async (data) => {
  const userId = data.userId;
  let prevTime = Date.now();
  const timeout = data?.config?.timeout ? data?.config?.timeout : 10;
  const url = data.checkModel.url;
  const path = data.checkModel.config.path;
  const portocol = data.checkModel.config?.portocol || "http";
  const port = data.checkModel.port;
  const interval = data.checkModel.config?.interval || 1;
  const checkId = data.checkModel._id;
  const cornInterval = computeCornInterval(interval);
  cron.schedule(`${cornInterval}`, async () => {
    var pingResults = await pingService(checkId, url, path, portocol, port, timeout);

    // await computeStatusTime(checkId, pingResults);
    // let availability = await computeAvailability(pingResults);
  });
};

const computeCornInterval = (interval) => {
  // given interval in minutes
  let days = 0;
  let hours = 0;
  let mins = 0;
  days = Math.floor(interval / 1440);
  const leftover_minutes = interval % 1440;
  hours = Math.floor(leftover_minutes / 60);
  mins = Math.floor(interval - days * 1440 - hours * 60);
  const cornInterval = `* ${mins ? "*/" + mins : "*"} ${hours ? "*/" + hours : "*"} ${
    days ? "*/" + days : "*"
  } * *`;
  return cornInterval;
};

const computeAvgResponseTime = async (userId, checkId, pingResponseTime) => {
  let check = await queryOneCheckRepository({ checkId });
  let pastAvg = check.avgResponse;
  let avgResponse = (pingResponseTime + pastAvg) / 2;
  await updateCheckRepository(checkId, { avgResponse });
};

const pingService = async (checkId, url, path, portocol, port, timeout) => {
  try {
    const receiverEnd = `${portocol}://${url}${path ? "/" + path : ""}:${port}`;
    const beforePing = Date.now();
    const pingResult = await ping.promise.probe(receiverEnd, {
      timeout: timeout,
    });
    let responseTime = Date.now() - beforePing;
    await computeAvgResponseTime(userId, checkId, responseTime);
    return pingResult;
  } catch (e) {
    console.error(e);
  }
};
