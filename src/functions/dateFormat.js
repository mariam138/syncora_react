// Function to display the date in a more readable format
export const formatDate = (dateStr) => {
  const dateObj = new Date(dateStr);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-GB", { month: "short" });
  const year = dateObj.getFullYear();

  return `${day} ${month} ${year}`;
};

export const formatDueDate = (dateStr) => {
  const dateObj = new Date(dateStr);

  const day = dateObj.getDate();
  const month = dateObj.toLocaleString("en-GB", { month: "short" });
  const year = dateObj.getFullYear();
  const hours = dateObj.getHours();
  const mins = dateObj.getMinutes();

  return `${day} ${month} ${year}, ${hours}:${mins}`;
};
