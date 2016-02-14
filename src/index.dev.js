import React from 'react';
import ReactDOM from 'react-dom';

import ListContainer from './components/ListContainer';

class DummyComponent extends React.Component {
  resetItems(event) {
    event.preventDefault();

    this.listContainer.setItems([
      {name: 'Item 1'},
      {name: 'Item 2'},
      {name: 'Item 3'}
    ]);
  }

  clearItems(event) {
    event.preventDefault();

    this.listContainer.clearItems();
  }

  pushItem(event) {
    event.preventDefault();

    this.listContainer.pushItem({
      name: 'Item X'
    });
  }

  unshiftItem(event) {
    event.preventDefault();

    this.listContainer.unshiftItem({
      name: 'Item X'
    });
  }

  addItemBelowFirst(event) {
    event.preventDefault();

    const firstKey = this.listContainer.getKeys()[0]

    this.listContainer.addItemBelow(firstKey, { name: 'Item X' });
  }

  addItemAboveFirst(event) {
    event.preventDefault();

    const firstKey = this.listContainer.getKeys()[0]

    this.listContainer.addItemAbove(firstKey, { name: 'Item X' });
  }

  editFirstItem(event) {
    event.preventDefault();

    const firstKey = this.listContainer.getKeys()[0]

    this.listContainer.editItem(firstKey, { name: 'New Name' });
  }

  removeFirstItem(event) {
    event.preventDefault();

    const firstKey = this.listContainer.getKeys()[0]

    this.listContainer.removeItem(firstKey);
  }

  render() {
    return (
      <div>
        <ListContainer
          initialItems={[
            {name: 'Item 1'},
            {name: 'Item 2'},
            {name: 'Item 3'}
          ]}
          showItemSearch={true}
          itemSearchPredicate={
            (item, query) =>
            item.name.toLowerCase().startsWith(query.toLowerCase())
          }
          onItemSearch={(query) => console.log(query)}
          onItemsSet={
            (oldItems, newItems) => {
              console.log(oldItems);
              console.log(newItems);
            }
          }
          onItemsClear={(items) => console.log(items)}
          onItemPush={(item) => console.log(item)}
          onItemUnshift={(item) => console.log(item)}
          onItemAddBelow={
            (key, existingItem, newItem) => {
              console.log(key);
              console.log(existingItem);
              console.log(newItem);
            }
          }
          onItemAddAbove={
            (key, existingItem, newItem) => {
              console.log(key);
              console.log(existingItem);
              console.log(newItem);
            }
          }
          onItemRemove={
            (key, item) => {
              console.log(key);
              console.log(item);
            }
          }
          onItemEdit={
            (key, oldItem, editedItem) => {
              console.log(key);
              console.log(oldItem);
              console.log(editedItem);
            }
          }
          ref={(ref) => this.listContainer = ref}/>
        <button onClick={this.resetItems.bind(this)}>Reset Items</button>
        <button onClick={this.clearItems.bind(this)}>Clear Items</button>
        <button onClick={this.pushItem.bind(this)}>Push Item</button>
        <button onClick={this.unshiftItem.bind(this)}>Unshift Item</button>
        <button onClick={this.addItemBelowFirst.bind(this)}>
          Add Item Below 1st
        </button>
        <button onClick={this.addItemAboveFirst.bind(this)}>
          Add Item Above 1st
        </button>
        <button onClick={this.editFirstItem.bind(this)}>Edit 1st Item</button>
        <button onClick={this.removeFirstItem.bind(this)}>
          Remove 1st Item
        </button>
      </div>
    );
  }
}

ReactDOM.render(<DummyComponent/>, document.getElementById('main'));
