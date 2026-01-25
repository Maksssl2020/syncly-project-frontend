export const isTextArrayEqual = (arr1: string[], arr2: string[]) => {
  if (arr1.length !== arr2.length) return false;

  const sortedArr1 = [...arr1].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );
  const sortedArr2 = [...arr2].sort((a, b) =>
    a.toLowerCase().localeCompare(b.toLowerCase()),
  );

  return sortedArr1.every((val, index) => val === sortedArr2[index]);
};
