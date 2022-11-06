import EnvVars from "@src/configurations/EnvVars";
import axios from "axios";

async function generateResult() {
  const rangeInfoUrl = `${EnvVars.reckonBaseUrl}/rangeInfo`;
  const divisorInfoUrl = `${EnvVars.reckonBaseUrl}/divisorInfo`;

  const {
    rangeData: { upper, lower },
    divisorData: { outputDetails: divisorInfo },
  } = await retry([rangeInfoUrl, divisorInfoUrl]);

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

async function retry(urls: string[], retries = 0): Promise<any> {
  const maxRetries = EnvVars.maxRetries;
  let resultData = {};
  try {
    const [{ data: rangeData }, { data: divisorData }] = await Promise.all(
      urls.map((url) => {
        return axios.get(url, {
          headers: {
            Accept: "application/json",
          },
        });
      })
    );
    return {
      rangeData,
      divisorData,
    };
  } catch (err) {
    if (retries < maxRetries) {
      retries += 1;
      return retry(urls, retries);
    } else {
      return resultData;
    }
  }
}

// **** Export default **** //

export default {
  generateResult,
} as const;
