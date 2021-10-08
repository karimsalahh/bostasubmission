export const groupTransitEventsByDay = (transitEvents) => {
  const groups = transitEvents.reduce(
    (groups, item) => ({
      ...groups,
      [item.timestamp.substring(0, 10)]: [
        ...(groups[item.timestamp.substring(0, 10)] || []),
        item,
      ],
    }),
    {}
  );
  return Object.values(groups);
};
