import React, {Component, Fragment} from 'react'
import { Link, withRouter } from "react-router-dom"
import { Menu } from 'semantic-ui-react'

class Navigator extends Component {
    render() {
        return (
          <Menu fluid vertical tabular>
            <Menu.Item active={this.props.location.pathname == '/'} content={ <Link to="/">Khách hàng</Link>} />
            <Menu.Item active={this.props.location.pathname == '/import'} content={ <Link to="/import">Import</Link>} />
            <Menu.Item active={this.props.location.pathname == '/category'} content={ <Link to="/category">Danh mục</Link>} />
          </Menu>
        )
    }
}

export default withRouter(Navigator)