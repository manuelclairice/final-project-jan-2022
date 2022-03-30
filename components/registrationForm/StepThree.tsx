import { Col, FloatingLabel, Form, Row } from 'react-bootstrap';
import { useState } from 'react';

const StepThree = ({ handleChange }) => {
  const [artActivities, setArtActivities] = useState({
    crafting: '',
    drawing: '',
    pottery: '',
  });
  const [ageGroup, setAgeGroup] = useState({
    ageGroupOne: '',
    ageGroupTwo: '',
    ageGroupThree: '',
    ageGroupFour: '',
    ageGroupFive: '',
  });
  const [musicActivities, setMusicActivities] = useState({
    guitar: '',
    piano: '',
    drums: '',
  });
  const [cookingActivities, setCookingActivities] = useState({
    breadbaking: '',
    cakeDecoration: '',
    breakfast: '',
  });
  const [danceActivities, setDanceActivities] = useState({
    ballet: '',
    breakDance: '',
    modernJazz: '',
  });
  const [sportActivities, setSportActivities] = useState({
    swimming: '',
    gymnastic: '',
    judo: '',
  });

  const updateArtActivities = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArtActivities({
      ...artActivities,
      [event.target.name]: event.target.value,
    });
    // return handleChange(updateArtActivities);
  };

  const updateAgeGroup = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAgeGroup({
      ...ageGroup,
      [event.target.name]: event.target.value,
    });
    // return handleChange(updateAgeGroup);
  };

  return (
    <div>
      <h2> Activities</h2>
      <Row className="g-2">
        <Col md onChange={updateArtActivities}>
          <Form.Select aria-label="Floating label select example">
            <option>Art Activities</option>
            <option value={artActivities.crafting}>Crafting</option>
            <option value={artActivities.drawing}>Drawing</option>
            <option value={artActivities.pottery}>Pottery</option>
          </Form.Select>
        </Col>
        <br />
        <div onChange={updateAgeGroup}>
          <h3>Age Groups </h3>
          <Form>
            {['checkbox'].map((type) => (
              <div key={`inline-${type}`} className="mb-3">
                <Form.Check
                  value={ageGroup.ageGroupOne}
                  inline
                  label="0 to 3"
                  name="ageGroupOne"
                  type={type}
                  id={`inline-${type}-1`}
                />
                <Form.Check
                  value={ageGroup.ageGroupTwo}
                  inline
                  label="4 to 6"
                  name="ageGroupTwo"
                  type={type}
                  id={`inline-${type}-2`}
                />
                <Form.Check
                  value={ageGroup.ageGroupThree}
                  inline
                  label="7 to 10"
                  name="ageGroupThree"
                  type={type}
                  id={`inline-${type}-3`}
                />
                <Form.Check
                  value={ageGroup.ageGroupFour}
                  inline
                  label="11 to 14"
                  name="ageGroupFour"
                  type={type}
                  id={`inline-${type}-4`}
                />
                <Form.Check
                  value={ageGroup.ageGroupFive}
                  inline
                  label="15 to 18"
                  name="ageGroupFive"
                  type={type}
                  id={`inline-${type}-5`}
                />
              </div>
            ))}
          </Form>
        </div>
        <Col md>
          <Form.Select aria-label="Floating label select example">
            <option>Music Activities</option>
            <option value="1">Guitar</option>
            <option value="2">Piano</option>
            <option value="3">Drums</option>
          </Form.Select>
        </Col>

        <Col md>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Cooking Activities"
          >
            <Form.Select aria-label="Floating label select example">
              <option>Cooking Activities</option>
              <option value="1">Bread Baking</option>
              <option value="2">Cake Decorating</option>
              <option value="3">Breakfast</option>
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col md>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Dance Activities"
          >
            <Form.Select aria-label="Floating label select example">
              <option>Dance Activities</option>
              <option value="1">Ballet</option>
              <option value="2">Breakdance</option>
              <option value="3">Modern Jazz</option>
            </Form.Select>
          </FloatingLabel>
        </Col>

        <Col md>
          <FloatingLabel
            controlId="floatingSelectGrid"
            label="Sport Activities"
          >
            <Form.Select aria-label="Floating label select example">
              <option>Sport Activities</option>
              <option value="1">Swimming</option>
              <option value="2">Gymnastic</option>
              <option value="3">Judo</option>
            </Form.Select>
          </FloatingLabel>
        </Col>
      </Row>
    </div>
  );
};
export default StepThree;
