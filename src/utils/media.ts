import { to } from './promise';

export const getDisplayMedia = async () => {
  const defer = navigator
    ?.mediaDevices
    ?.getDisplayMedia?.({
      audio: false,
      video: {
        autoGainControl: false,
        channelCount: 0,
        // advanced: [{
        //   autoGainControl: false,
        // }]
      }
    });

  return await to(defer);
};