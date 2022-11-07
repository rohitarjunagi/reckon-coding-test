import EnvVars from "@src/configurations/EnvVars";
import { retyGet } from "@src/util/retry-axios";

async function generateResult() {
  const rangeInfoUrl = `${EnvVars.reckonBaseUrlNumbers}/rangeInfo`;
  const divisorInfoUrl = `${EnvVars.reckonBaseUrlNumbers}/divisorInfo`;

  const [{ upper, lower }, { outputDetails: divisorInfo }] = await Promise.all(
    [rangeInfoUrl, divisorInfoUrl].map((url) => {
      return retyGet(url);
    })
  );

  // TODO: validate if lower is less than upper

  const output: any = {};

  for (let i = lower; i <= upper; i++) {
    if (i === 0) {
      output[i] = "";
      continue;
    }

    output[i] = buildOutputString(i, divisorInfo);
  }

  return output;
}

function buildOutputString(i: number, divisorInfo: DivisorType[]) {
  let resultString = "";
  for (let j = 0; j < divisorInfo.length; j++) {
    const { divisor, output } = divisorInfo[j];
    if (i % divisor === 0) {
      resultString += output;
    }
  }
  return resultString;
}

// **** Export default **** //

export default {
  generateResult,
} as const;
