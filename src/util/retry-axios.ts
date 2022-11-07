import EnvVars from "@src/configurations/EnvVars";
import axios from "axios";

export async function retyGet(url: string, retries = 0): Promise<any> {
  const maxRetries = EnvVars.maxRetries;
  try {
    const options: any = {
      headers: {
        Accept: "application/json",
      },
    };
    const { data } = await axios.get(url, options);
    return data;
  } catch (err) {
    if (retries < maxRetries) {
      retries += 1;
      return retyGet(url, retries);
    } else {
      return {};
    }
  }
}

export async function retryPost(
  url: string,
  body: any,
  retries = 0
): Promise<any> {
  const maxRetries = EnvVars.maxRetries;
  let resultData = {};
  try {
    const { data } = await axios.post(url, {
      headers: {
        Accept: "application/json",
      },
      body,
    });
    return data;
  } catch (err) {
    if (retries < maxRetries) {
      retries += 1;
      return retryPost(url, body, retries);
    } else {
      return resultData;
    }
  }
}
