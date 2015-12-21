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
          {this.props.items.isEmpty() ? ( // eslint-disable-line
            <span>{this.props.emptyText}</span>
          ) : this.props.items.map((item, i) => { // eslint-disable-line
            return (
              <Item
                key={i}
                item={item}
                index={i}
                content={this.props.content}
                onRemove={this.props.onRemove}
                onEdit={this.props.onEdit}/>
            );
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
  content: React.PropTypes.element,
  onRemove: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired,
  onSearch: React.PropTypes.func.isRequired,
  searchText: React.PropTypes.string,
  emptyText: React.PropTypes.string
};

List.defaultProps = {
  emptyText: 'No items.'
};

export default List;
