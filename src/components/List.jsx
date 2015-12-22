import React from 'react';

import Item from './Item';
import SearchBox from './SearchBox';

class List extends React.Component {
  render() {
    return (
      <div>
        <SearchBox
          itemSearchPredicate={this.props.itemSearchPredicate}
          onItemSearch={this.props.onItemSearch}
          searchItemsText={this.props.searchItemsText}
          ref={(ref) => this.searchBox = ref}/>
        <ul>
          {this.props.items.isEmpty() ? ( // eslint-disable-line
            <span>{this.props.emptyItemsText}</span>
          ) : this.props.items.map((item, i) => { // eslint-disable-line
            return (
              <Item
                key={i}
                item={item}
                index={i}
                itemContent={this.props.itemContent}
                onItemRemove={this.props.onItemRemove}
                onItemEdit={this.props.onItemEdit}/>
            );
          })}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  itemSearchPredicate: React.PropTypes.func.isRequired,
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func,
  onItemEdit: React.PropTypes.func,
  onItemSearch: React.PropTypes.func,
  searchItemsText: React.PropTypes.string,
  emptyItemsText: React.PropTypes.string
};

List.defaultProps = {
  emptyItemsText: 'No items.'
};

export default List;
