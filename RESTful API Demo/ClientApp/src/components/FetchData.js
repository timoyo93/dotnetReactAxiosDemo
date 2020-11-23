import React, { Component } from 'react';
import axios from "axios";
import { Container, Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export class FetchData extends Component {
  static displayName = FetchData.name;

  constructor(props) {
    super(props);
    this.state = {
      addUser: {
        id: Number,
        firstName: "",
        lastName: ""
      },
      updateUser: {
        id: Number,
        firstname: "",
        lastname: ""
      },
      id: Number,
      users: [],
      loading: true 
    };
  }

  componentDidMount() {
    this.getAllUsers();
  }

  getAllUsers = () => {
    this.setState({loading: true});
    axios.get('https://localhost:5001/api/users')
    .then(res => {
      const users = res.data
      this.setState({users: res.data, loading: false})
    })
  }

  getUserById = () => {
    axios.get('https://localhost:5001/api/users/' + this.state.id)
      .then(res => {
        this.setState({users: [res.data]});
        this.renderUsersTable(this.state.users);
      })
  }

  addUser = () => {
    axios.post('https://localhost:5001/api/users', this.state.addUser)
      .then(res => {
        console.log(res.data);
        this.getAllUsers();
        this.renderUsersTable(this.state.users);
      })
  }

  updateUser = () => {
    axios.put('https://localhost:5001/api/users/' + this.state.updateUser.id, this.state.updateUser)
      .then(res => {
        console.log(res.data)
        this.resetTable();
      })
  }

  deleteUser = () => {
    axios.delete('https://localhost:5001/api/users/' + this.state.id)
      .then(res=> {
        console.log(res.data);
        this.resetTable();
      })
  }

  resetTable = () => {
    this.getAllUsers();
    this.renderUsersTable(this.state.users);
  }


  renderUsersTable(users) {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Id</th>
            <th>Firstname</th>
            <th>Lastname</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstname}</td>
              <td>{user.lastname}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  render() {
    let contents = this.state.loading
      ? <p><em>Loading...</em></p>
      : this.renderUsersTable(this.state.users);

    return (
      <div>
        <h1 id="tabelLabel" >User List</h1>
        <p>This component demonstrates fetching data from the server.</p>
        {contents}
        <hr></hr>
        <Container>
          <Row>
            <Col>
              <Form>
                <h2>Get User by Id</h2>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="getId" 
                    id="getUserById_Id" 
                    placeholder="Id"
                    onChange={(e) => this.setState({id: e.target.value})}/>
                </FormGroup>
                <Button color="primary" onClick={this.getUserById}>Go for it</Button>
                <Button color="secondary" onClick={this.resetTable}>Reset Table</Button>
              </Form>
            </Col>
            <Col>
              <Form>
                <h2>Add User</h2>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="postId" 
                    id="addUser_Id" 
                    placeholder="Id" 
                    onChange={(e) => this.setState({addUser: {...this.state.addUser, id: Number(e.target.value)}})}/>
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="postFirstname" 
                    id="addUser_firstname" 
                    placeholder="Firstname" 
                    value={this.state.addUser.firstName} 
                    onChange={(e) => this.setState({addUser: {...this.state.addUser, firstName: e.target.value}})} />
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="postLastname" 
                    id="addUser_lastname" 
                    placeholder="Lastname"
                    value={this.state.addUser.lastName} 
                    onChange={(e) => this.setState({addUser: {...this.state.addUser, lastName: e.target.value}})}/>
                </FormGroup>
                <Button color="success" onClick={this.addUser}>Yes sir</Button>
              </Form>
            </Col>
            <Col>
              <Form>
                <h2>Update User</h2>
                <FormGroup>
                  <Input 
                  type="text" 
                  name="putId" 
                  id="updateUser_Id" 
                  placeholder="Id"
                  onChange={(e) => this.setState({updateUser: {...this.state.updateUser, id: Number(e.target.value)}})} />
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="putFirstname" 
                    id="updateUser_firstname" 
                    placeholder="Firstname"
                    onChange={(e) => this.setState({updateUser: {...this.state.updateUser, firstname: e.target.value}})} />
                </FormGroup>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="putLastname" 
                    id="updateUser_lastname" 
                    placeholder="Lastname"
                    onChange={(e) => this.setState({updateUser: {...this.state.updateUser, lastname: e.target.value}})} />
                </FormGroup>
                <Button color="warning" onClick={this.updateUser}>This is fine</Button>
              </Form>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form>
                <h2>Delete User by Id</h2>
                <FormGroup>
                  <Input 
                    type="text" 
                    name="deleteId" 
                    id="deleteUserById_Id" 
                    placeholder="Id"
                    onChange={(e) => this.setState({id: e.target.value})}/>
                </FormGroup>
                <Button color="danger" onClick={this.deleteUser}>Uh oh..</Button>
              </Form>
            </Col>
            <Col></Col>
            <Col></Col>
          </Row>
          
        </Container>
        
      </div>
    );
  }

  async populateWeatherData() {
    const response = await fetch('weatherforecast');
    const data = await response.json();
    this.setState({ forecasts: data, loading: false });
  }
}
