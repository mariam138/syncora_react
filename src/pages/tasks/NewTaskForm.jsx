import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import appStyles from "../../App.module.css";
import { SuccessToast, WarningToast } from "../../functions/toasts";

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
  const { title, due_date, priority, category, description, completed } =
    taskData;
  return <></>;
}

export default NewTaskForm;
