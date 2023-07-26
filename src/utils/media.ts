import { awaitTo } from "./promise";

export const getDisplayMedia = () => awaitTo(
  navigator
    .mediaDevices
    .getDisplayMedia({
      audio: false,
      video: {
        autoGainControl: false,
        channelCount: 0,
        // advanced: [{
        //   autoGainControl: false,
        // }]
      }
    })
);