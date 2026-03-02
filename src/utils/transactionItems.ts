export const timeAgo = (pastDate: Date) => {
  const now = new Date();
  const past = new Date(pastDate);

  const diffMs = now - past; // difference in milliseconds
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return "Today";
  } else if (diffDays === 1) {
    return "Yesterday";
  } else if (diffDays > 0) {
    return `${diffDays} days ago`;
  } else {
    return `In ${Math.abs(diffDays)} days`;
  }
};
