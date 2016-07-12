# react-custom-list
React Component for a dynamic list of custom items.

## Installation

Through npm:
> npm install react-custom-list --save

## Peer dependencies

You should be using React 0.14.x in your project.

## Usage

Simply import it and use it. For example:

``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from 'react-custom-list';

class DummyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.resetItems = this.resetItems.bind(this);
    this.clearItems = this.clearItems.bind(this);
    this.pushItem = this.pushItem.bind(this);
    this.unshiftItem = this.unshiftItem.bind(this);
    this.addItemBelowFirst = this.addItemBelowFirst.bind(this);
    this.addItemAboveFirst = this.addItemAboveFirst.bind(this);
    this.editFirstItem = this.editFirstItem.bind(this);
    this.setFirstItem = this.setFirstItem.bind(this);
    this.removeFirstItem = this.removeFirstItem.bind(this);
  }

  resetItems(event) {
    event.preventDefault();

    this.reactList.setItems([
      { name: 'Item 1' },
      { name: 'Item 2' },
      { name: 'Item 3' }
    ]);
  }

  clearItems(event) {
    event.preventDefault();

    this.reactList.clearItems();
  }

  pushItem(event) {
    event.preventDefault();

    this.reactList.pushItem({
      name: 'Item X'
    });
  }

  unshiftItem(event) {
    event.preventDefault();

    this.reactList.unshiftItem({
      name: 'Item X'
    });
  }

  addItemBelowFirst(event) {
    event.preventDefault();

    const firstKey = this.reactList.getKeys()[0];

    this.reactList.addItemBelow(firstKey, { name: 'Item X' });
  }

  addItemAboveFirst(event) {
    event.preventDefault();

    const firstKey = this.reactList.getKeys()[0];

    this.reactList.addItemAbove(firstKey, { name: 'Item X' });
  }

  editFirstItem(event) {
    event.preventDefault();

    const firstKey = this.reactList.getKeys()[0];

    this.reactList.editItem(firstKey, { dummyProp: 'Dummy prop' });
  }

  setFirstItem(event) {
    event.preventDefault();

    const firstKey = this.reactList.getKeys()[0];

    this.reactList.setItem(firstKey, { dummyProp: 'Dummy prop' });
  }

  removeFirstItem(event) {
    event.preventDefault();

    const firstKey = this.reactList.getKeys()[0];

    this.reactList.removeItem(firstKey);
  }

  render() {
    return (
      <div>
        <ReactList
          initialItems={[
            { name: 'Item 1' },
            { name: 'Item 2' },
            { name: 'Item 3' }
          ]}
          showItemSearch
          itemSearchPredicate={
            (item, query) =>
            item.name.toLowerCase().startsWith(query.toLowerCase())
          }
          onItemSearch={
            (query, allItems, filteredItems) => {
              console.log(query);
              console.log(allItems);
              console.log(filteredItems);
            }
          }
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
          onItemSet={
            (key, oldItem, newItem) => {
              console.log(key);
              console.log(oldItem);
              console.log(newItem);
            }
          }
          ref={(ref) => { this.reactList = ref; }}
        />
        <button onClick={this.resetItems}>Reset Items</button>
        <button onClick={this.clearItems}>Clear Items</button>
        <button onClick={this.pushItem}>Push Item</button>
        <button onClick={this.unshiftItem}>Unshift Item</button>
        <button onClick={this.addItemBelowFirst}>
          Add Item Below 1st
        </button>
        <button onClick={this.addItemAboveFirst}>
          Add Item Above 1st
        </button>
        <button onClick={this.editFirstItem}>Edit 1st Item</button>
        <button onClick={this.setFirstItem}>Set 1st Item</button>
        <button onClick={this.removeFirstItem}>
          Remove 1st Item
        </button>
      </div>
    );
  }
}

ReactDOM.render(<DummyComponent/>, document.getElementById('main'));
```

Watch a live demo of the previous code snippet here http://luisincrespo.github.io/react-custom-list.
