export const parseData = (
  next,
  err = error => {
    console.error(error);
  }
) => event => {
  try {
    return next(event, JSON.parse(event.data));
  } catch (error) {
    return next(event, event.data);
  }
};
