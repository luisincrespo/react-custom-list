/* eslint-disable react/jsx-no-undef */

import React from 'react';

import Item from './Item';
import DefaultItemSearchContent from './DefaultItemSearchContent';
import DefaultItemsEmptyContent from './DefaultItemsEmptyContent';

import CustomPropTypes from '../utils/propValidators';

import ListActions from '../actions/ListActions';

class List extends React.Component {
  constructor(props) {
    super(props);
    this._onQueryChange = this._onQueryChange.bind(this);
  }

  _onQueryChange(query) {
    ListActions.searchItem(query, this.props.itemSearchPredicate).then(
      ({ searchQuery, allItems, filteredItems }) => {
        this.props.onItemSearch(
          searchQuery,
          allItems.valueSeq().toJS(),
          filteredItems.valueSeq().toJS()
        );
      }
    );
  }

  render() {
    return (
      <div>
        {this.props.showItemSearch ? (
          <this.props.itemSearchContent
            onQueryChange={this._onQueryChange}
          />
        ) : null}
        <ul>
          {this.props.items.isEmpty() ? (
            <this.props.itemsEmptyContent />
          ) : this.props.items.entrySeq().map(
            ([key, item]) =>
            (
              <Item
                key={key}
                item={item}
                itemKey={key}
                itemContent={this.props.itemContent}
                onItemRemove={this.props.onItemRemove}
                onItemEdit={this.props.onItemEdit}
              />
            )
          )}
        </ul>
      </div>
    );
  }
}

List.propTypes = {
  items: React.PropTypes.any,
    /* This is actually an Immutable OrderedMap. It is automagically injected
     * by Alt's AltContainer.
     */
  showItemSearch: React.PropTypes.bool,
  itemSearchContent: React.PropTypes.element,
  itemSearchPredicate: CustomPropTypes.itemSearchPredicate,
    // (item: object, query: string) => bool
  onItemSearch: React.PropTypes.func, // (query: string) => void
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func, // (key: number, item: object) => void
  onItemEdit: React.PropTypes.func,
    // (key: number, oldItem: object, editedItem: object) => void
  itemsEmptyContent: React.PropTypes.element
};

List.defaultProps = {
  showItemSearch: false,
  itemSearchContent: DefaultItemSearchContent,
  itemSearchPredicate: () => true,
  onItemSearch: () => null,
  itemsEmptyContent: DefaultItemsEmptyContent
};

export default List;
