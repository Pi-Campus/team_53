import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {
  InputGroup,
  FormControl,
  Button,
  Row,
  Col,
  Table
} from 'react-bootstrap';
import React, { useState } from 'react';

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState('');

  const fetchData = async () => {
    try {
      const response = await fetch(
        'https://api.askdata.com/smartinsight/data/nl/result',
        {
          method: 'POST',
          headers: new Headers({
            'Content-Type': 'application/json',
            authorization: 'Bearer 99b31be7-412e-4ede-a83f-bb9905e3a853'
          }),
          body: JSON.stringify({ nl: query, language: 'en' })
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setData(data);
      } else {
        alert('Something went wrong');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div>
        <h1 className="d-flex justify-content-center">COVID-19 Information</h1>
        <p className="d-flex justify-content-center">
          Ask anything you want to know about COVID-19 statistics worldwide.
        </p>
      </div>
      <Row className="mt-5">
        <Col md={{ span: 4, offset: 4 }}>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Please type your query"
              aria-label="Query"
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
          <p>
            Example: <i>new positives by regions</i>
          </p>
        </Col>
        <Col md={{ span: 6, offset: 3 }}>
          <Table striped bordered hover variant="dark">
            <thead>
              <tr>
                <th>#</th>
                {data.schema &&
                  data.schema.map((schemaElement, index) => (
                    <th key={`schema${index}`}>{schemaElement.name}</th>
                  ))}
              </tr>
            </thead>
            <tbody>
              {data.data &&
                data.data.map((el, index) => (
                  <tr key={index}>
                    <td>{index}</td>
                    {el.cells.map((element, index) => (
                      <td key={`element${index}`}>{element.rawValue}</td>
                    ))}
                  </tr>
                ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
}

export default App;
