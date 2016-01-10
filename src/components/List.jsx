import React from 'react';

import Item from './Item';
import DefaultItemSearchContent from './DefaultItemSearchContent';
import DefaultItemsEmptyContent from './DefaultItemsEmptyContent';

import ListActions from '../actions/ListActions';

class List extends React.Component {
  onQueryChange(query) {
    ListActions.searchItem(query, this.props.itemSearchPredicate);

    this.props.onItemSearch(query);
  }

  render() {
    return (
      <div>
        {this.props.showItemSearch ? (
          <this.props.itemSearchContent
            onQueryChange={this.onQueryChange.bind(this)}/>
        ) : null}
        <ul>
          {this.props.items.isEmpty() ? ( // eslint-disable-line
            <this.props.itemsEmptyContent/>
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
  showItemSearch: React.PropTypes.bool,
  itemContent: React.PropTypes.element,
  onItemRemove: React.PropTypes.func,
  onItemEdit: React.PropTypes.func,
  onItemSearch: React.PropTypes.func,
  itemsEmptyContent: React.PropTypes.element
};

List.defaultProps = {
  itemSearchContent: DefaultItemSearchContent,
  showItemSearch: true,
  onItemSearch: () => null,
  itemsEmptyContent: DefaultItemsEmptyContent
};

export default List;
