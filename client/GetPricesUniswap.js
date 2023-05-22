const { ethers } = require("ethers");
const Quoter = require("@uniswap/v3-periphery/artifacts/contracts/lens/Quoter.sol/Quoter.json");

const provider = new ethers.JsonRpcProvider(
  "https://eth-mainnet.g.alchemy.com/v2/0HrHlhFOcL8RCj8WQ0P_JjrzcLRAWoe4"
);

const getPrice = async (addressFrom, addressTo, amountInHuman) => {
  const quoterAddress = "0xb27308f9F90D607463bb33eA1BeBb41C27CE5AB6";
  const quoterContract = new ethers.Contract(
    quoterAddress,
    Quoter.abi,
    provider
  );

  const amountIn = ethers.parseUnits(amountInHuman, 6);

  const quotedAmountOut = await quoterContract.quoteExactInputSingle.staticCall(
    addressFrom,
    addressTo,
    3000,
    amountIn.toString(),
    0
  );

  const amountOut = ethers.formatUnits(quotedAmountOut.toString(), 18);

  return amountOut;
};

const main = async () => {
  const addressFrom = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"; // USDC
  const addressTo = "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2"; // WETH

  const amountInHuman = "2000";

  const amountOut = await getPrice(addressFrom, addressTo, amountInHuman);
  console.log(amountOut);
};

main();
