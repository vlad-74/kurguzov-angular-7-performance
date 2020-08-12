// These functions are defined here:
// https://github.com/Microsoft/TypeScript/blob/master/lib/lib.webworker.d.ts
// Easiest way to be able to use the Web workers API on our TypeScript files is to declare
// the specific API functions we want to use according to:
// https://github.com/Microsoft/TypeScript/issues/20595#issuecomment-351030256
declare function postMessage(message: any): void;

export const FIBONACCI_SCRIPT = (input) => {
  const startTime = Date.now();

  const fibonacci = (input) => {
    if (input == 1 || input == 2) { return 1 }
    return fibonacci(input - 1) + fibonacci(input - 2)
  };

  const res = fibonacci(input.itog);

  const runnerResult = {res, time: 0};

  const endTime = Date.now();
  runnerResult.time = (endTime - startTime) / 1000;

  if (input.worker) {
    postMessage(runnerResult);
  } else {
    return runnerResult;
  }
};