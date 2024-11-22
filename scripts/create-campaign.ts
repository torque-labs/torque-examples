import { Keypair } from "@solana/web3.js";
import { TorqueSDK } from "@torque-labs/torque-ts-sdk";
import {
  EventType,
  RaffleParticipants,
  CampaignType,
  SwapRequirement,
  RewardType,
  AsymmetricReward,
} from "@torque-labs/torque-utils";

console.log(process.env.ADMIN_API_KEY);

// SET UP
const ADMIN_API_KEY = process.env.ADMIN_API_KEY as string;

const signer = Keypair.fromSecretKey(
  new Uint8Array(JSON.parse(process.env.ADMIN_KEY as string))
);

const sdk = new TorqueSDK({
  network: "mainnet-beta",
  apiKey: ADMIN_API_KEY,
  apiUrl: "https://api.torque.so",
});

// REQUIREMENTS
const buy10kBonk: SwapRequirement = {
  type: EventType.SWAP,
  requirement: {
    outAmount: 10000,
    outToken: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263", // bonk
  },
};

// REWARDS
const oneKBonk: AsymmetricReward = {
  participants: RaffleParticipants.USER,
  tokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  amount: 1000 * 10 ** 5, // where 5 is the number of decimals for BONK
};

const threeKBonk: AsymmetricReward = {
  participants: RaffleParticipants.USER,
  tokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  amount: 3000 * 10 ** 5, // where 5 is the number of decimals for BONK
};

const fiveKBonk: AsymmetricReward = {
  participants: RaffleParticipants.USER,
  tokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
  amount: 5000 * 10 ** 5, // where 5 is the number of decimals for BONK
};

(async () => {
  await sdk.initialize(signer);
  if (!sdk.api) {
    throw new Error("Admin SDK not initialized.");
  }
  const result = await sdk.api.createCampaign({
    campaignName: "Buy Bonk 19!",
    campaignType: CampaignType.BOUNTY,
    campaignDescription: "Buy 10K bonk to enter to win more thousands of Bonk.",
    conversionCount: 10, // totoal number of conversions available
    startTime: new Date().getTime(), // start offer now
    endTime: new Date().getTime() + 1000 * 60 * 60 * 24 * 7, // end offer in a week
    eventConfig: [buy10kBonk],
    userRewardType: RewardType.TOKENS,
    userPayoutPerConversion: 1000 * 10 ** 5,
    userTokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    publisherRewardType: RewardType.TOKENS,
    publisherPayoutPerConversion: 1000 * 10 ** 5,
    publisherTokenAddress: "DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263",
    asymmetricRewards: [fiveKBonk],

    landingPage: "https://torque.so",
  });

  // const result = await sdk.api.endCampaign({
  //     campaignId: "cm3nvejuq00291f891fun1laf",
  // });

  console.log("-- result: ", result);
})();
