export const withDelay = <T>(promise: Promise<T>, delay = 1000): Promise<T> =>
    new Promise(resolve => setTimeout(() => resolve(promise), delay));
