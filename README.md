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
          onItemsClear={
            (items) => {
              console.log(items);
            }
          }
          onItemPush={(item) => console.log(item)}
          onItemUnshift={(item) => console.log(item)}
          onItemAddBelow={
            (key, item) => {
              console.log(key);
              console.log(item);
            }
          }
          onItemAddAbove={
            (key, item) => {
              console.log(key);
              console.log(item);
            }
          }
          onItemRemove={
            (key, item) => {
              console.log(key);
              console.log(item);
            }
          }
          onItemEdit={
            (key, oldItem, newItem) => {
              console.log(key);
              console.log(oldItem);
              console.log(newItem);
            }
          }
          ref={(ref) => this.reactList = ref}/>
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

### getKey(predicate: func) => number
Returns the key for the first item that fulfills the given *predicate*, which must be a function of the form:

* predicate(item: object) => bool

If no item meets the condition, `undefined` is returned.

### getItems() => array&lt;object&gt;
Returns every item in the list, in the same order as they appear.

### getItem(key: number) => object
Returns the item corresponding to the given *key*. If the *key* doesn't exist, `undefined` is returned.

### getFirstItem() => object
Returns the first item of the list if it exists, `undefined` otherwise.

### getLastItem() => object
Returns the last item of the list if it exists, `undefined` otherwise.

### clearItems() => void
Removes all items from the list.

### pushItem(item: object) => void
Adds the given *item* to the end of the list.

### unshiftItem(item: object) => void
Adds the given *item* to the beginning of the list.

### addItemBelow(key: number, item: object) => void
Adds the given *item* directly below the item that corresponds to the given *key*. If the *key* does not exist, the *item* will be added at the beginning of the list.

### addItemAbove(key: number, item: object) => void
Adds the given *item* directly above the item that corresponds to the given *key*. If the *key* does not exist, the *item* will be added at the beginning of the list.

### removeItem(key: number) => void
Removes the item corresponding to the given *key* if it exists.

### editItem(key: number, item: object) => void
Edits the item corresponding to the given *key* if it exists, merging with the content of the given *item*.

## Props

### initialItems: array&lt;object&gt;
Specifies initial items to be rendered.

### showItemSearch: bool
Specifies wether or not to show the search widget. Defaults to `false`.

### itemSearchContent: React Component
Component to be used to render the search widget. Defaults to:

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

**onQueryChange(query: string) => void** is available as prop and must be called in order to filter the list.

### itemSearchPredicate(item: object, query: string) => bool
If *showItemSearch* is set to true, this prop must be specified.

### onItemSearch(query: string) => void
This callback will be fired whenever the **onQueryChange(query: string) => void** prop in the search widget is called. The *query* is received as a parameter.

### itemContent: React Component
Component to be used to render each item in the list. Defaults to:

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

Both **onRemove() => void** and **onEdit(newItem: object) => void** are available as props and can be used in order to remove or edit items correspondingly.

### onItemsClear(items: array&lt;object&gt;) => void
This callback will be fired whenever the list is cleared. The cleared *items* are received as a parameter.

### onItemPush(item: object) => void
This callback will be fired whenever an *item* is pushed to the list. The pushed *item* is received as a parameter.

### onItemUnshift(item: object) => void
This callback will be fired whenever an *item* is unshifted to the list. The unshifted *item* is received as a parameter.

### onItemAddBelow(key: number, item: object) => void
This callback will be fired whenever an *item* is added below another one in the list. The *item* added along with the *key* of the existing item are received as parameters.

### onItemAddAbove(key: number, item: object) => void
This callback will be fired whenever an *item* is added above another one in the list. The *item* added along with the *key* of the existing item are received as parameters.

### onItemRemove(key: number, item: object) => void
This callback will be fired whenever an *item* is removed from the list. The *item* removed along with its *key* are received as parameters.

### onItemEdit(key: number, oldItem: object, newItem: object) => void
This callback will be fired whenever an *item* is edited. The *oldItem* along with its *key* and the *newItem* are received as parameters.

### itemsEmptyContent: React Component
Component to be used to render the content to show when there are no items in the list. Defaults to:

``` javascript
class DefaultItemsEmptyContent extends React.Component {
  render() {
    return (
      <span>No items.</span>
    );
  }
}
```
