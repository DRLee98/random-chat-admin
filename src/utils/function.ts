export const throttle = (func: () => void, delay: number = 1000) => {
  let timer: NodeJS.Timeout | null;
  return function () {
    if (timer) return;
    func();
    timer = setTimeout(() => {
      timer = null;
    }, delay);
  };
};
