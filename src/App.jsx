import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { InputGroup, FormControl, Button, Row, Col } from "react-bootstrap";
import React, { useState } from "react";

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://api.askdata.com/smartinsight/data/nl/result",
        {
          method: "POST",
          headers: new Headers({
            "Content-Type": "application/json",
            authorization: "Bearer 99b31be7-412e-4ede-a83f-bb9905e3a853",
          }),
          body: JSON.stringify({ nl: query, language: "en" }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Recipient's username"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              value={query}
              onChange={(e) => setQuery(e.currentTarget.value)}
            />
            <InputGroup.Append>
              <Button variant="outline-secondary" onClick={fetchData}>
                Search
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </Col>
      </Row>
    </div>
  );
}

export default App;
