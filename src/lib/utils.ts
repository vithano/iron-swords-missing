import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export const debounce = (func: Function, delay: number) => {
  let timer: ReturnType<typeof setTimeout>;
  let isFirstInvocation = true;
  return function (this: unknown, ...args: any[]) {
    if (isFirstInvocation && !args[0]) {
      func.apply(this, args);
      isFirstInvocation = false;
    } else {
      clearTimeout(timer);
      timer = setTimeout(() => func.apply(this, args), delay);
    }
  };
};
export const sanitizeImageUrl = (url: string) => {
  if (url.includes('https://drive.google.com/')) {
    const id = url
      .replace('https://drive.google.com/file/d/', '')
      .replace('/view?usp=sharing', '')
      .replace('/view?usp=drive_link', '')
    return `https://drive.google.com/uc?export=view&id=${id}`
  }

  return url || '/no-image.png';
}

export const mailAdmin = (subject = '', body = '') => {
  const adminMail = 'ironswordsoperation@gmail.com';
  window.open(`mailto:${adminMail}?subject=${subject}&body=${body}`);
}