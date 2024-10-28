import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const TodoList = ({ fetchTodos, todos }) => {
  const [editingId, setEditingId] = useState(null); // Track the todo being edited
  const [editedTitle, setEditedTitle] = useState("");
  const [editedDescription, setEditedDescription] = useState("");
  useEffect(() => {
    fetchTodos();
  }, []);

  const startEditing = (todo) => {
    setEditingId(todo.id);
    setEditedTitle(todo.title);
    setEditedDescription(todo.description);
  };

  const handleSave = (id) => {
    const updatedTodo = {
      title: editedTitle,
      description: editedDescription,
    };
    handleUpdate(id, updatedTodo);
  };

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await axios.patch(
        `https://todobackendapi-310a688ea7c5.herokuapp.com/todos/${id}`,
        updatedData
      );
      console.log("Todo updated successfully:", response.data);
      fetchTodos(); // Refresh the list after update
      setEditingId(null); // Exit edit mode after successful update
    } catch (error) {
      console.error("Error updating todo:", error);
    }
  };

  // Handle delete operation
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `https://todobackendapi-310a688ea7c5.herokuapp.com/todos/${id}`
      );
      fetchTodos(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  };

  const handleDeleteAll = async () => {
    try {
      await axios.delete(
        "https://todobackendapi-310a688ea7c5.herokuapp.com/todos/delete-all/"
      );
      fetchTodos(); // Refresh the list after deletion
    } catch (error) {
      console.error("Error deleting all todos:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={6}>
          <Card className="shadow-sm p-3">
            <Card.Title className="text-center mb-3">Todo List</Card.Title>
            <div className="text-center mb-3">
              <Button variant="danger" onClick={handleDeleteAll}>
                Delete All Tasks
              </Button>
            </div>
            <ListGroup>
              {todos.map((todo) => (
                <ListGroup.Item
                  key={todo.id}
                  className="d-flex justify-content-between align-items-center"
                >
                  {editingId === todo.id ? (
                    // Editable form when in edit mode
                    <div className="w-100">
                      <h3>Title</h3>
                      <input
                        type="text"
                        className="form-control mb-2"
                        value={editedTitle}
                        onChange={(e) => setEditedTitle(e.target.value)}
                      />
                      <h3>Description</h3>
                      <textarea
                        className="form-control mb-2"
                        value={editedDescription}
                        onChange={(e) => setEditedDescription(e.target.value)}
                      />
                      <div className="d-flex justify-content-end">
                        <Button
                          variant="success"
                          onClick={() => handleSave(todo.id)}
                          className="btn-sm mx-1"
                        >
                          Save
                        </Button>
                        <Button
                          variant="secondary"
                          onClick={() => setEditingId(null)}
                          className="btn-sm mx-1"
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    // Regular display when not in edit mode
                    <div className="d-flex justify-content-between align-items-center w-100">
                      <div>
                        <h5>{todo.title}</h5>
                        <p>{todo.description}</p>
                      </div>
                      <div>
                        <Button
                          variant="danger"
                          onClick={() => handleDelete(todo.id)}
                          className="btn-sm mx-1"
                        >
                          Delete
                        </Button>
                        <Button
                          variant="warning"
                          onClick={() => startEditing(todo)}
                          className="btn-sm mx-1"
                        >
                          Edit
                        </Button>
                      </div>
                    </div>
                  )}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default TodoList;
