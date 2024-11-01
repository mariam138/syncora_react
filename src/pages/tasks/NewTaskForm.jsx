import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function NewTaskForm() {
  const navigate = useNavigate();
  const currentUser = useCurrentUser();
  const [taskData, setTaskData] = useState({
    title: "",
    due_date: "",
    priority: "",
    category: "",
    description: "",
    completed: false,
  });
    const { title, due_date, priority, category, description, completed } = taskData;
  return <div>NewTaskForm</div>;
}

export default NewTaskForm;
