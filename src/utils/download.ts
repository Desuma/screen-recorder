import { isString } from 'lodash';
import moment from 'moment';

export const download = (url: string | URL) => {
  const innUrl = isString(url) ? url : url.toString();

  const a = document.createElement('a');
  a.href = innUrl;
  a.download = `video_${moment().valueOf()}.webm`;

  a.click();
};


export const saveBlob = (blob: Blob) => {
  const url = URL.createObjectURL(blob);

  download(url);
};

export const saveBlobChunks = (chunks: Blob[]) => {
  const type = chunks?.[0]?.type;
  const blob = new Blob(chunks ?? [], { type });

  saveBlob(blob);
};