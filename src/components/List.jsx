import React from 'react';

import Item from './Item';
import NewItem from './NewItem';
import SearchBox from './SearchBox';

class List extends React.Component {
  onAdd(item) {
    this.searchBox.clearQuery();

    this.props.onAdd(item);
  }

  render() {
    return (
      <div>
        <SearchBox
          onSearch={this.props.onSearch}
          searchText={this.props.searchText}
          ref={(ref) => this.searchBox = ref}/>
        <ul>
          {this.props.items.isEmpty() ? (
            <span>{this.props.emptyText}</span>
          ) : this.props.items.map((item, i) => {
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
          onAdd={this.onAdd.bind(this)}
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
  editText: React.PropTypes.string,
  onSearch: React.PropTypes.func.isRequired,
  searchText: React.PropTypes.string,
  emptyText: React.PropTypes.string
};

List.defaultProps = {
  emptyText: 'No items.'
};

export default List;
