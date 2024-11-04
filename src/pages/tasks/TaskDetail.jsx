import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import appStyles from "../../App.module.css";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

function TaskDetail() {
  const { pk } = useParams();
  const currentUser = useCurrentUser();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [taskDetail, setTaskDetail] = useState({
    owner: "",
    title: "",
    due_date: "",
    priority: "",
    category_display: "",
    description: "",
    completed: "",
  });

  const {
    owner,
    title,
    due_date,
    priority,
    category_display,
    description,
    completed,
  } = taskDetail;

  const is_owner = currentUser?.username === owner;
  return <div>TaskDetail</div>;
}

export default TaskDetail;
