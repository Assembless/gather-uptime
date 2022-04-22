import { Game } from "@gathertown/gather-game-client";
import ora from 'ora';
import config from './config';
import fetch from 'node-fetch';
import { UptimeMonitor } from "./types";

async function main () {
  console.log("Starting...");
  const spinner = ora('Starting Gather API Client').start();
  
  const gatherClient = new Game(config.gather.SPACE_ID, () => Promise.resolve({ apiKey: config.gather.API_KEY }));
  await gatherClient.connect();


  spinner.stop();
  console.clear();
  console.log("The Gather API Client is running!");

  gatherClient.subscribeToEvent('playerInteracts', async (e) => {
    console.log(e);

    console.log(await gatherClient.getObject(e.playerInteracts.objId));
  })

  // setTimeout(async () => {
  //   // Find all indicator objects.
  //   console.log(Object.keys(gatherClient.completeMaps['rw-6'].objects).filter(x => {
  //     const obj = gatherClient.completeMaps['rw-6'].objects[x];
      
  //     if(obj.id.indexOf("Indicator") > -1) {
  //       console.log(obj);
  //       return true;
  //     }
  //   }));
  // }, 5000)


  const handleMonitors = (monitors: UptimeMonitor[]) => {
    if(monitors === null) {
      console.log("No monitors received.")
      return;
    }

    monitors.forEach(async (monitor) => {
      const fromConf = config.statusTiles.find(t => t.uptimeId === monitor.id);

      if(fromConf) {
        const gatherObject = await gatherClient.getObject(fromConf.gatherObjectId);
        if(monitor.status === 2) {
          gatherObject.obj.color = '#6abe30';
          gatherObject.obj.normal = "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2FOAS5P91MeHHJ9X3x?alt=media&token=5cbaf712-c15f-47ca-9a35-160831d22ffd";
          console.log("Monitor", monitor.friendly_name, "is online.");
        } else {
          gatherClient.fxShakeObject(config.gather.MAP_ID, gatherObject.obj.id, 25, 3000);
          gatherObject.obj.color = '#d95763';
          gatherObject.obj.normal = "https://cdn.gather.town/v0/b/gather-town.appspot.com/o/internal-dashboard-upload%2F2NUrsU3ek8g60Yez?alt=media&token=7ee54bfe-0594-42e0-95e8-0befc2064521";
          console.log("Monitor", monitor.friendly_name, "is offline.");
        }
        await gatherClient.setObject(config.gather.MAP_ID, gatherObject.obj.id!, gatherObject.obj)
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  callPeriodically(getUptimeMonitors, handleMonitors, 30000);
};

const getUptimeMonitors = async () => {
  const api_key = config.uptimeRobot.API_KEY;
  const url = `https://api.uptimerobot.com/v2/getMonitors?api_key=${api_key}`;

  try {
    const response = await fetch(url, { method: 'POST' });
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    return (await response.json()).monitors as unknown as UptimeMonitor[];
  } catch(err) {
    console.error(err);
    return null;
  }
}

const callPeriodically = <R>(fn: () => R, cb: (arg: R) => void, interval: number) => {
  setInterval(async () => {
    try {
      const res = await fn();
      cb(res as unknown as R);
    } catch(err) {
      console.error(err);
    }
  }, interval)
}

main();