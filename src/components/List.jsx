import React from 'react';

import Item from './Item';
import NewItem from './NewItem';

class List extends React.Component {
  render() {
    return (
      <div>
        <ul>
          {this.props.items.map((item, i) => {
            return (
              <Item
                key={i}
                item={item}
                index={i}
                onRemove={this.props.onRemove}
                removeText={this.props.removeText}
                onEdit={this.props.onEdit}
                editText={this.props.editText}/>
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
  addText: React.PropTypes.string,
  onRemove: React.PropTypes.func.isRequired,
  removeText: React.PropTypes.string,
  onEdit: React.PropTypes.func.isRequired,
  editText: React.PropTypes.string
};

export default List;
