import React, { useState } from "react";
import { Container, Row, Col, Card, Form, Button } from "react-bootstrap";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const CardComponent = ({ fetchTodos }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://todobackendapi-310a688ea7c5.herokuapp.com/todos",
        {
          title,
          description,
        }
      );
      console.log("Data successfully sent:", response.data);
      fetchTodos();
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <Container className="mt-3">
      <Row className="justify-content-center">
        <Col md={4}>
          {" "}
          {/* Reduced column size */}
          <Card className="shadow-sm p-3">
            {" "}
            {/* Combined padding into card */}
            <Card.Title className="text-center mb-3">
              Create a New Todo
            </Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-2">
                <Form.Label htmlFor="title">Title</Form.Label>
                <Form.Control
                  type="text"
                  id="title"
                  name="title"
                  placeholder="Enter todo title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label htmlFor="description">Description</Form.Label>
                <Form.Control
                  as="textarea"
                  id="description"
                  name="description"
                  rows={3} // Reduced rows
                  placeholder="Enter todo description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </Form.Group>
              <Button type="submit" className="w-100 btn-sm">
                Submit
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default CardComponent;
