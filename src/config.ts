import * as dotenv from "dotenv";

dotenv.config();

const {
    GATHER_MAP_ID,
    GATHER_SPACE_ID,
    GATHER_API_KEY,
    UPTIME_ROBOT_API_KEY
  } = process.env;

const config = Object.freeze({
    gather: {
        SPACE_ID: GATHER_SPACE_ID,
        API_KEY: GATHER_API_KEY,
        MAP_ID: GATHER_MAP_ID,
    },
    uptimeRobot: {
        API_KEY: UPTIME_ROBOT_API_KEY
    },
    statusTiles: [
        {
            name: "Homepage",
            uptimeId: 789964535,
            gatherObjectId: "Indicator - ZS9OTTALZtmZUWZRKRL7C_89d3f564-db45-43da-a120-b6839ed484ad",
        },
        {
            name: "PFTU.pl",
            uptimeId: 791378889,
            gatherObjectId: "Indicator - ZS9OTTALZtmZUWZRKRL7C_5e208317-387e-45c4-b02b-12e7945e42f4",
        },
        {
            name: "WoodStyles",
            uptimeId: 790118967,
            gatherObjectId: "Indicator - ZS9OTTALZtmZUWZRKRL7C_0d8b2ab6-e97c-47fe-b8ee-ef84d99d0762",
        },
    ]
});

export default config;