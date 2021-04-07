// This file is injected as a content script

import "./content.css";
import { MessageType } from "./types";

const body = document.getElementsByTagName("body");

const snowflakesContainer = document.createElement("div");
snowflakesContainer.className = "snawflakes";
snowflakesContainer.setAttribute("aria-hidden", "true");

const snowflake = document.createElement("div");
snowflake.className = "snowflake";
snowflake.innerHTML = "❆";

for(let i=0; i<12; i++) {
  snowflakesContainer.appendChild(snowflake.cloneNode(true));
}

chrome.runtime.sendMessage({ type: "REQ_SNOW_STATUS" });

let snowing = false;


chrome.runtime.onMessage.addListener((message: MessageType) => {
  console.log("Content.ts here!", message);
  console.log("local snowing: ", snowing);
  
  switch (message.type) {
    case "SNOW_STATUS":
      if (message.snowing) {
        if (!snowing) {
          body[0]?.prepend(snowflakesContainer);
        }
      } else {
        snowflakesContainer.parentNode?.removeChild(snowflakesContainer);
      }
      snowing = message.snowing;
      break;
    default:
      break;
  }
});