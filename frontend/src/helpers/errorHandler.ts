export const errorHandler = (error: Error, from?: string) => {
  console.error(from ? `${from}: error` : error);

  return error;
};
