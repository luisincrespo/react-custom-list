# react-list
React Component for a dynamic list of items.

## Installation

Through npm:
> npm install @luisincrespo/react-list --save

## Peer dependencies

You should be using React 0.14.x in your project.

## Usage

Simply import it and use it. For example:

``` javascript
import React from 'react';
import ReactDOM from 'react-dom';
import ReactList from '@luisincrespo/react-list';

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

    const firstKey = this.reactList.getKeys()[0]

    this.reactList.addItemBelow(firstKey, { name: 'Item X' });
  }

  addItemAboveFirst(event) {
    event.preventDefault();

    const firstKey = this.reactList.getKeys()[0]

    this.reactList.addItemAbove(firstKey, { name: 'Item X' });
  }

  editFirstItem(event) {
    event.preventDefault();

    const firstKey = this.reactList.getKeys()[0]

    this.reactList.editItem(firstKey, { name: 'New Name' });
  }

  removeFirstItem(event) {
    event.preventDefault();

    const firstKey = this.reactList.getKeys()[0]

    this.reactList.removeItem(firstKey);
  }

  render() {
    return (
      <div>
        <ReactList
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
          onItemsClear={
            (items) => {
              console.log(items);
            }
          }
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
          ref={(ref) => this.reactList = ref}/>
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
```

Watch a live demo of the previous code snippet here http://luisincrespo.github.io/react-list.

## API

### getSize() => number
Returns the amount of items in the list.

### getKeys() => array&lt;number&gt;
Returns the key for every item in the list, in the same order as they appear.

### getKey(predicate: (item: object) => bool) => number
Returns the key for the first item that fulfills the given *predicate*. If no item meets the condition, `undefined` is returned.

### getItems() => array&lt;object&gt;
Returns every item in the list, in the same order as they appear.

### getItem(key: number) => object
Returns the item corresponding to the given *key*. If the *key* doesn't exist, `undefined` is returned.

### getFirstItem() => object
Returns the first item of the list if it exists, `undefined` otherwise.

### getLastItem() => object
Returns the last item of the list if it exists, `undefined` otherwise.

### setItems(newItems: array&lt;object&gt;) => void
Replaces the whole list with the given *newItems*.

### clearItems() => void
Removes all items from the list.

### pushItem(item: object) => void
Adds the given *item* to the end of the list.

### unshiftItem(item: object) => void
Adds the given *item* to the beginning of the list.

### addItemBelow(key: number, newItem: object) => void
Adds the given *newItem* directly below the item that corresponds to the given *key*. If the *key* doesn't exist, the *newItem* will be added at the beginning of the list.

### addItemAbove(key: number, newItem: object) => void
Adds the given *newItem* directly above the item that corresponds to the given *key*. If the *key* doesn't exist, the *newItem* will be added at the beginning of the list.

### removeItem(key: number) => void
Removes the item corresponding to the given *key* if it exists.

### editItem(key: number, newItem: object) => void
Edits the item corresponding to the given *key* if it exists, merging it with the content of the *newItem*.

## Props

### initialItems: array&lt;object&gt; (OPTIONAL)
Specifies initial items for the list.

### showItemSearch: bool (DEFAULTS to `false`)
Specifies whether or not to show the search widget.

### itemSearchContent: React Component (DEFAULTS to `DefaultItemSearchContent`)
Specifies a component to be used to render the search widget. Defaults to:

``` javascript
class DefaultItemSearchContent extends React.Component {
  _onSearch(event) {
    event.preventDefault();

    this.props.onQueryChange(this.query.value);
  }

  render() {
    return (
      <form onSubmit={(event) => event.preventDefault()}>
        <label>Search: </label>
        <input
          type="search"
          onChange={this._onSearch.bind(this)}
          ref={(ref) => this.query = ref}/>
      </form>
    );
  }
}

DefaultItemSearchContent.propTypes = {
  onQueryChange: React.PropTypes.func.isRequired
};
```
The following props will be available for the component:

* **onQueryChange(query: string) => void**: Must be called to actually filter the list. The `itemSearchPredicate` (defined below) will be used to filter the list with the given *query*.

### itemSearchPredicate(item: object, query: string) => bool (REQUIRED if `showItemSearch` is set to `true`)
Specifies a predicate to be used when filtering the list.

### onItemSearch(query: string) => void (OPTIONAL)
Specifies a callback to be fired whenever the list is filtered with the given *query*.

### itemContent: React Component (DEFAULTS to `DefaultItemContent`)
Specifies a component to be used to render each item in the list. Defaults to:

``` javascript
class DefaultItemContent extends React.Component {
  _onRemove(event) {
    event.preventDefault();

    this.props.onRemove();
  }

  render() {
    return (
      <li>
        {JSON.stringify(this.props.item.toJS())}
        <div>
          <a
            href="#"
            onClick={this._onRemove.bind(this)}>
            Remove
          </a>
        </div>
      </li>
    );
  }
}

DefaultItemContent.propTypes = {
  item: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};
```

The following props will be available for the component:

* **onRemove() => void**: Can be called to remove the item from the list.
* **onEdit(newItem: object) => void**: Can be called to edit the item with the content specified in the *newItem*.

### onItemsSet(oldItems: array&lt;object&gt;, newItems: array&lt;object&gt;) => void (OPTIONAL)
Specifies a callback to be fired whenever the list is replaced, receiving the *oldItems* and *newItems* as parameters.

### onItemsClear(items: array&lt;object&gt;) => void (OPTIONAL)
Specifies a callback to be fired whenever the list is cleared, receiving the cleared *items* as a parameter.

### onItemPush(item: object) => void (OPTIONAL)
Specifies a callback to be fired whenever an *item* is pushed to the list.

### onItemUnshift(item: object) => void (OPTIONAL)
Specifies a callback to be fired whenever an *item* is unshifted to the list.

### onItemAddBelow(key: number, existingItem: object, newItem: object) => void (OPTIONAL)
Specifies a callback to be fired whenever a *newItem* is added below another one (*existingItem* corresponding to the given *key*) in the list.

### onItemAddAbove(key: number, existingItem: object, newItem: object) => void (OPTIONAL)
Specifies a callback to be fired whenever a *newItem* is added above another one (*existingItem* corresponding to the given *key*) in the list.

### onItemRemove(key: number, item: object) => void (OPTIONAL)
Specifies a callback to be fired whenever an *item* is removed from the list, receiving also its *key* as a parameter.

### onItemEdit(key: number, oldItem: object, editedItem: object) => void (OPTIONAL)
Specifies a callback to be fired whenever an item (*oldItem* corresponding to the given *key*) is edited, receiving also the new content (*editedItem*) as a parameter.

### itemsEmptyContent: React Component (DEFAULTS to `DefaultItemsEmptyContent`)
Specifies a component to be used to render the widget to show when the list is empty. Defaults to:

``` javascript
class DefaultItemsEmptyContent extends React.Component {
  render() {
    return (
      <span>No items.</span>
    );
  }
}
```
