export const removeLastNumberSegment = (filename) => {
  const parts = filename.split('-');
  const extension = parts.pop().split('.').pop();
  return `${parts.join('-')}.${extension}`;
};
