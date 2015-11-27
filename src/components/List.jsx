import React from 'react';

class List extends React.Component {
  render() {
    return (
      <ul>
        {this.props.items.map((item, i) => {
          return (
            <li key={i}>{item.get('name')}</li>
          )
        })}
      </ul>
    );
  }
}

export default List;
