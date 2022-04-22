import { Game } from "@gathertown/gather-game-client";
import config from './config';


(async function () {
  const game = new Game(config.gather.SPACE_ID, () => Promise.resolve({ apiKey: config.gather.API_KEY }));

  await game.connect();
})();