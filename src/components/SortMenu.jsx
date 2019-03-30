import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

class SortMenu extends React.Component {
  handleSortByMoney() {
    this.props.handleSortByMoney(this.props.game)
    this.props.handleClose();
  }

  handleSortByName() {
    this.props.handleSortByName(this.props.game)
    this.props.handleClose();
  }
  
  render() {
    return (
      <div>
        <Menu
          id="simple-menu"
          anchorEl={this.props.anchorEl}
          open={Boolean(this.props.anchorEl)}
          onClose={this.props.handleClose}
        >
          <MenuItem onClick={this.handleSortByMoney.bind(this)}>Sort by money</MenuItem>
          <MenuItem onClick={this.handleSortByName.bind(this)}>Sort by name</MenuItem>
        </Menu>
      </div>
    );
  }
}

export default SortMenu;