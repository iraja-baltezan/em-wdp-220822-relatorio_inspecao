export const getDateNow = (): string => (new Date()).toISOString().replace(/T.+/,'');
