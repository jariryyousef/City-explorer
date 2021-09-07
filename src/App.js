// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import axios from 'axios';
import Image from 'react-bootstrap/Image';


export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      locationData:"",
      lat:"",
      lon:"",
      serverRes:"",
    };
  }

  locationNameChange = (e) => {
    this.setState({ locationName: e.target.value 
    
    });

  };

  
  submit = async (e) => {
    e.preventDefault();

    const url =`https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.locationName}&format=json`;

    const serverURL =`${process.env.REACT_APP_SERVER_URL}/weather?searchQ=${this.state.locationName}`;

//    
    const response = await axios.get(url);

    const serverResponse=await axios.get(serverURL);

    // console.log(response.data[0]);
    console.log(serverResponse.data);

    this.setState({
      lat :response.data[0].lat,
      lon: response.data[0].lon,
      locationData: response.data[0],
      serverRes: serverResponse.data[0],
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

      
      <h3>location name </h3>
      <p> {this.state.locationData.display_name}</p>
      <p>lat: {this.state.locationData.lat}</p>
      <p>lon: {this.state.locationData.lon}</p>
      <p>test: {this.state.serverRes.description}</p>
      <p>test: {this.state.serverRes.date}</p>

      
     

      <Image src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=[1-18]`} fluid />

        {/* </header> */}
      </div>
    );
  }
}

export default App;
