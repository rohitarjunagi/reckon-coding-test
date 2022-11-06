import EnvVars from "@src/configurations/EnvVars";
import axios from "axios";

async function generateResult() {
  const rangeInfoUrl = `${EnvVars.reckonBaseUrl}/rangeInfo`;
  const { lower, upper } = await retry(rangeInfoUrl);

  // const {} = data;

  // TODO: validate if lower is less than upper

  const divisorInfoUrl = `${EnvVars.reckonBaseUrl}/divisorInfo`;
  const { outputDetails: divisorInfo } = await retry(divisorInfoUrl);

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

async function retry(url: string, retries = 0): Promise<any> {
  const maxRetries = EnvVars.maxRetries;
  let resultData = {};
  try {
    const { data, status } = await axios.get(url, {
      headers: {
        Accept: "application/json",
      },
    });
    if (status === 200) {
      resultData = data;
    }
  } catch (err) {
    if (retries < maxRetries) {
      retries += 1;
      return retry(url, retries);
    } else {
      return resultData;
    }
  }
  return resultData;
}

// **** Export default **** //

export default {
  generateResult,
} as const;
