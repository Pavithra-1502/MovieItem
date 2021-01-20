
import './App.css';

import React,{useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';
import { Form, } from "react-bootstrap";
function App() {

  const [loading, setLoading] = React.useState(true);
  const [items, setTitle] = React.useState([]);
  const [releaseItem, setReleaseDate] = React.useState([]);
  const [value,setValue]=useState('');

  var    arr = [];

  React.useEffect(() => {
    let unmounted = false;
    
    async function getAPI() {
      const apiUrl = 'https://swapi.dev/api/films/';
      const response = await fetch(apiUrl);
      const body = await response.json();

    
        Object.keys(body).forEach(key => arr.push({name: key, value: body[key]}))
        setValue(arr[3].value);
 
      if (!unmounted) {
        setTitle(
          body.results.map(({ title })=>({ label: title, value: title}))
        );
        setLoading(false);
      }
    }
    getAPI();
    return () => {
      unmounted = true;
    };
  }, []);

  const handleSelect=(e)=>{
    var data = value.filter(item => item.title === e)[0].release_date;
    setReleaseDate(e + '-' + data);
  }
 
  return (
    <div className="App container">
      <div className="character-heading bold-class align-center">Movies List</div>
      <div className="character-heading">Character</div>
      <DropdownButton
      alignRight
      disabled={loading}
      title="Select"
      id="dropdown-menu-align-right"
      onSelect={handleSelect}
      >
              <div className="dropdown-list">List of movies</div>
              <Dropdown.Divider />
        {items.map(({ label }) => (
          <Dropdown.Item  eventKey={label}> {label}</Dropdown.Item>
          ))}
      </DropdownButton>
     <Form>
       <Form.Label className="bold-css">Name/ Year Last movie</Form.Label>  
          <Form.Control type="name"   value={releaseItem}  />
      </Form>
    </div>
  );
}
export default App;
