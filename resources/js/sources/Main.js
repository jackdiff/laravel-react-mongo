import React, { Component, Fragment } from 'react'
import { Grid, Menu, Segment, Container, Header, Icon } from 'semantic-ui-react'
import { BrowserRouter as Router, Route } from "react-router-dom"
import Navigator from 'Navigator'
import ImportCustomer from 'ImportCustomer'
import Category from 'Category'
import Customer from 'Customer'

export default class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container style={{marginTop: '50px'}}>
      <Router>
        <Grid>
          <Header as='h1' style={{marginBottom: '20px'}}>
            <Icon name='settings' />
            <Header.Content>
              Customer Management
              <Header.Subheader>Quản lý khách hàng tiềm năng</Header.Subheader>
            </Header.Content>
          </Header>
          <Grid.Row>
            <Grid.Column width={4}>
              <Navigator />
            </Grid.Column>
            <Grid.Column stretched width={12}>
              <Route exact path="/" render={(props) => <Customer {...props} />} />
              <Route path="/import" render={(props) => <ImportCustomer {...props} />} />
              <Route path="/category" render={(props) => <Category {...props}/>} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Router>
      </Container>
    )
  }
}
