export const sortByDate = (firstDate: Date | string, secondDate: Date | string) =>
  new Date(secondDate).getTime() - new Date(firstDate).getTime();
