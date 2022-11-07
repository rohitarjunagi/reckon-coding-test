import EnvVars from "@src/configurations/EnvVars";
import { retyGet, retryPost } from "@src/util/retry-axios";

async function generateResult() {
  const textToSearchUrl = `${EnvVars.reckonBaseUrlStrings}/textToSearch`;
  const subTextsUrl = `${EnvVars.reckonBaseUrlStrings}/subTexts`;
  const submitResultsUrl = `${EnvVars.reckonBaseUrlStrings}/submitResults`;

  const [{ text: textToSearch }, { subTexts }] = await Promise.all(
    [textToSearchUrl, subTextsUrl].map((url) => {
      return retyGet(url);
    })
  );

  const subTextsPosition = getSubTextsPositions(textToSearch, subTexts);
  const formattedResult = {
    candidate: "Rohit Arjunagi",
    text: textToSearch,
    result: subTextsPosition,
  };
  console.log("formattedResult??? ", formattedResult);
  return retryPost(submitResultsUrl, formattedResult);
}

function getSubTextsPositions(textToSearch: string, subTexts: string[]) {
  const subTextPositions = [];
  for (const subText of subTexts) {
    const result: any = isSubstring(textToSearch, subText);
    if (result.length !== 0) {
      subTextPositions.push({
        subText,
        result: result.join(", "),
      });
    } else {
      subTextPositions.push({
        subText,
        result: "<No Output>",
      });
    }
  }
  return subTextPositions;
}

function isSubstring(textToSearch: string, substring: string) {
  if (substring.length > textToSearch.length) return;
  const startChar = substring[0].toLowerCase();
  const indexPositions = [];
  for (let searchIndex = 0; searchIndex < textToSearch.length; searchIndex++) {
    if (textToSearch[searchIndex].toLowerCase() === startChar) {
      let fullMatch = true;
      for (
        let substringIndex = 1;
        substringIndex < substring.length;
        substringIndex++
      ) {
        if (
          substring[substringIndex].toLowerCase() ===
          textToSearch[searchIndex + substringIndex].toLowerCase()
        )
          continue;
        else fullMatch = false;
      }
      if (fullMatch) indexPositions.push(searchIndex + 1);
    }
  }
  return indexPositions;
}

// **** Export default **** //

export default {
  generateResult,
} as const;
