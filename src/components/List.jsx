import React from 'react';

import Item from './Item';
import DefaultItemSearchContent from './DefaultItemSearchContent';
import DefaultItemsEmptyContent from './DefaultItemsEmptyContent';

import CustomPropTypes from '../utils/propValidators';

import ListActions from '../actions/ListActions';

class List extends React.Component {
  _onQueryChange(query) {
    ListActions.searchItem(query, this.props.itemSearchPredicate);

    this.props.onItemSearch(query);
  }

  render() {
    return (
      <div>
        {this.props.showItemSearch ? (
          <this.props.itemSearchContent
            onQueryChange={this._onQueryChange.bind(this)}/>
        ) : null}
        <ul>
          {this.props.items.isEmpty() ? ( // eslint-disable-line
            <this.props.itemsEmptyContent/>
          ) : this.props.items.entrySeq().map(([key, item]) => { // eslint-disable-line
            return (
              <Item
                key={key}
                item={item}
                itemKey={key}
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
  showItemSearch: React.PropTypes.bool,
  itemSearchContent: React.PropTypes.element,
  itemSearchPredicate: CustomPropTypes.itemSearchPredicate,
    // (item: object, query: string) => bool
  onItemSearch: React.PropTypes.func, // (query: string) => void
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func, // (key: number, item: object) => void
  onItemEdit: React.PropTypes.func,
    // (key: number, oldItem: object, newItem: object) => void
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
