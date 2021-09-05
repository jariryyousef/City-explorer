// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import axios from 'axios';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      locationData:"",
    };
  }

  locationNameChange = (e) => {
    this.setState({ locationName: e.target.value });
  };

  submit = async (e) => {
    e.preventDefault();

    const url =`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.locationName}&format=json`;
    const response = await axios.get(url);
    console.log(response.data[0]);

    this.setState({
      locationData: response.data[0]
    })
  };


  render() {
    return (
      <div className="App">
        {/* <header className="App-header"> */}
        <Form onSubmit={this.submit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Location</Form.Label>
            <Form.Control
              type="text"
              onChange={this.locationNameChange}
              placeholder="Enter city name"
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Explor!
          </Button>
        </Form>


      <div>
      <h3>location name </h3>
      <p> {this.state.locationData.display_name}</p>
      <p>lat: {this.state.locationData.lat}</p>
      <p>lon: {this.state.locationData.lon}</p>
      </div>
        

        {/* </header> */}
      </div>
    );
  }
}

export default App;
