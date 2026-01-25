export const getConversationKey = (
  userId1: string | number,
  userId2: string | number,
) => {
  const [first, second] = [String(userId1), String(userId2)].sort();
  return ["conversation", first, second];
};
