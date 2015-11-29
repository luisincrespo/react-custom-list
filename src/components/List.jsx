import React from 'react';

import NewItem from './NewItem';

class List extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map((item, i) => {
            return (
              <li key={i}>{item.get('name')}</li>
            )
          })}
        </ul>
        <NewItem
          onAdd={this.props.onAdd}
          addText={this.props.addText}/>
      </div>
    );
  }
}

List.propTypes = {
  onAdd: React.PropTypes.func.isRequired,
  addText: React.PropTypes.string
};

export default List;
