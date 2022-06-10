import React, { useState } from 'react';
import { Button, Row, Col, Container, Form, ListGroup } from 'react-bootstrap';
import { fetchMapboxApi, selectSuggestion } from '../adapters/MapboxAdapters';
import MapComponent from './MapComponent';

export default function SearchPets() {
  const [searchPlace, setSearchPlace] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [chosenPlace, setChosenPlace] = useState({});
  const [isPlaceSelected, setIsPlaceSelected] = useState(false);
  const fetchApi = fetchMapboxApi;
  const suggestionSelection = selectSuggestion;

  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchPlace(value);
    fetchApi(setSearchResults, searchPlace);
  };

  const renderSuggestions = searchResults.map((result) => {
    return (
      <ListGroup.Item
        key={result.place_name}
        className="pointer"
        onClick={() =>
          suggestionSelection(
            setChosenPlace,
            setSearchPlace,
            result.place_name,
            result.center[0],
            result.center[1]
          )
        }
      >
        {result.place_name}
      </ListGroup.Item>
    );
  });

  return (
    <Container className="h-auto" style={{ minHeight: '100vh' }}>
      <br />
      <h1>Buscar</h1>
      <br />
      <Form>
        <Row>
          <Col xs="9">
            <Form.Control
              type="text"
              placeholder="Ingresá un barrio o localidad..."
              onChange={handleSearch}
              value={searchPlace}
              name={searchPlace}
            />
          </Col>
          <Col xs="3">
            <Button
              className="back-quaternary secondary-font fw-bold"
              style={{ border: 'none' }}
              onClick={() => setIsPlaceSelected(true)}
            >
              <i className="fa-fw	fa fa-location-arrow"></i>
            </Button>
          </Col>
        </Row>
      </Form>
      {searchPlace.length > 1 ? (
        <div className="back-">
          <ListGroup>{renderSuggestions}</ListGroup>
        </div>
      ) : (
        ''
      )}
      <MapComponent
        chosenPlace={chosenPlace}
        setSearchPlace={setSearchPlace}
        isPlaceSelected={isPlaceSelected}
        setIsPlaceSelected={setIsPlaceSelected}
      />
      <br />
    </Container>
  );
}
