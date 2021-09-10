// import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import React from "react";
import axios from "axios";
import Image from "react-bootstrap/Image";
import Card from "react-bootstrap/Card";

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      locationName: "",
      locationData: "",
      lat: "",
      lon: "",
      locationInfo: [],
      movieData: [],
    };
  }

  locationNameChange = (e) => {
    this.setState({ locationName: e.target.value });
  };

  submit = async (e) => {
    e.preventDefault();

    const url = `https://eu1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_LOCATION_API_KEY}&q=${this.state.locationName}&format=json`;
    const response = await axios.get(url);

    const serverURL = `${process.env.REACT_APP_SERVER_URL}/weather?searchQ=${this.state.locationName}`;
    const serverResponse = await axios.get(serverURL);
  
    const serverURL1=`${process.env.REACT_APP_SERVER_URL}/movies?searchQ=${this.state.locationName}`;
    const serverResponse1 = await axios.get(serverURL1);

    console.log(serverResponse1.data);

    this.setState({
      lat: response.data[0].lat,
      lon: response.data[0].lon,
      locationData: response.data[0],
      locationInfo: serverResponse.data.data,
      movieData:serverResponse1.data,
    });

    // console.log(this.state.locationInfo);
  };

  render() {
    return (
      <div className="App">
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
        {/* <p>{this.state.serverResponse}</p> */}
        {/* {console.log(this.state.locationInfo+"test")} */}
      
            <Card>
          <Card.Text>
            <div>
   
           
              {this.state.movieData.map((item) => {
                return (
                  <div>
                    <ul>
                       
                    <li><p> title={item.title}</p></li>
                    <li><p>overview={item.overview}</p></li>
                    <li><p>average_votes={item.average_votes}</p></li>
                    <li><p>total_votes={item.total_votes}</p></li>
                    <li><p>image_url={item.image_url}</p></li>
                    <li><p>popularity={item.popularity}</p></li>
                    <li><p>released_on={item.released_on}</p></li>
                    </ul>
                  </div>
                  
                );
                
              })}
            </div>
          </Card.Text>
        </Card>



        <Card>
          <Card.Text>
            <div>
           
              {this.state.locationInfo.map((item) => {
                return (
                  <div>
                    <p>the date: {item.valid_date}</p>
                    <p>the description{item.weather.description}</p>
                    
                  </div>
                  
                );
                
              })}
            </div>
          </Card.Text>
        </Card>

        <Image
          src={`https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_LOCATION_API_KEY}&center=${this.state.lat},${this.state.lon}&zoom=[1-18]`}
          fluid
        />

        {/* </header> */}
      </div>
    );
  }
}

export default App;
