export function debounce<T extends (...args: any) => any>(
  callback: T,
  timeout: number = 3000
) {
  let timer: null | number = null;

  return (...args: Parameters<T>) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      callback(...args);
    }, timeout);
  };
}
