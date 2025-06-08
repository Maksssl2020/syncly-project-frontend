const colors = ["#14b8a6", "#22d3ee", "#0d9488", "#06b6d4"];

export const getTagColor = (index: number) => {
  return colors[index % colors.length];
};

export const getRandomTagColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
