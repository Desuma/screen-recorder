import { useCallback, useState } from 'react';

import { getDisplayMedia, saveBlobChunks } from '~/utils';

const MAX_RECORD_TIME = 2 * 60 * 60 * 1000;

let timer: NodeJS.Timer;
let stream: MediaStream;
let recorder: MediaRecorder;
let chunks: Blob[];

const resetVariable = () => {
  clearTimeout(timer);

  stream = undefined!;
  recorder = undefined!;
  chunks = [];
};

export const useRecorder = () => {
  const [state, setState] = useState<RecordingState>();

  const onDataAvailable = useCallback((e: BlobEvent) => {
    chunks.push(e.data);
  }, []);

  const onStop = useCallback((_) => {
    saveBlobChunks(chunks);
    setState(undefined);

    stream
      ?.getTracks()
      ?.map(track => track?.stop?.());

    recorder?.removeEventListener('dataavailable', onDataAvailable);
    recorder?.removeEventListener('stop', onStop);
  }, [timer, recorder, setState]);

  const onStartRecord = useCallback(async () => {
    resetVariable();

    const [, _stream] = await getDisplayMedia();
    stream = _stream!;

    if (stream) {
      const mimeType = MediaRecorder.isTypeSupported('video/webm; codecs=vp9') ? 'video/webm; codecs=vp9' : 'video/webm';
      recorder = new MediaRecorder(stream, { mimeType });

      recorder?.addEventListener('dataavailable', onDataAvailable);
      recorder?.addEventListener('stop', onStop);

      timer = setTimeout(() => {
        recorder?.stop();
      }, MAX_RECORD_TIME);

      setState('recording');
      recorder.start();
    }
  }, [timer, recorder]);

  const onPauseRecord = useCallback(() => {
    if (recorder) {
      setState('paused');
      recorder?.pause();
    }
  }, [recorder, setState]);

  const onResumeRecord = useCallback(() => {
    if (recorder) {
      setState('recording');
      recorder?.resume();
    }
  }, [recorder, setState]);

  const onStopRecord = useCallback(() => {
    if (recorder) {
      setState('inactive');
      recorder?.stop();
    }
  }, [recorder, setState]);

  return {
    state,
    recorder,
    onStartRecord,
    onPauseRecord,
    onResumeRecord,
    onStopRecord,
  };
}

export default useRecorder;
