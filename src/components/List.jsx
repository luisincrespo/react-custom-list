import React from 'react';

import Item from './Item';
import DefaultItemSearchContent from './DefaultItemSearchContent';

import ListActions from '../actions/ListActions';

class List extends React.Component {
  onQueryChange(query) {
    ListActions.searchItem(query, this.props.itemSearchPredicate);

    this.props.onItemSearch(query);
  }

  render() {
    return (
      <div>
        <this.props.itemSearchContent
          onQueryChange={this.onQueryChange.bind(this)}/>
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
  itemSearchContent: React.PropTypes.element,
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func,
  onItemEdit: React.PropTypes.func,
  onItemSearch: React.PropTypes.func,
  searchItemsText: React.PropTypes.string,
  emptyItemsText: React.PropTypes.string
};

List.defaultProps = {
  itemSearchContent: DefaultItemSearchContent,
  onItemSearch: () => null,
  emptyItemsText: 'No items.'
};

export default List;
