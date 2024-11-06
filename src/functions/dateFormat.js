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
  const mins = String(dateObj.getMinutes()).padStart(2, "0");

  return `${day} ${month} ${year}, ${hours}:${mins}`;
};

// Format the date correctly in ISO format as expected by javascript
// Before submission of form
export const formatToIso = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");

  return `${year}-${month}-${day}T${hours}:${minutes}`;
};
