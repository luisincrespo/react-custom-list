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
  addItem(event) {
    event.preventDefault();

    this.reactList.addItem({
      name: 'Item X'
    });
  }

  removeFirstItem(event) {
    event.preventDefault();

    this.reactList.removeItem(0);
  }

  editFirstItem(event) {
    event.preventDefault();

    const newItem = {
      name: 'New Name'
    };

    this.reactList.editItem(0, newItem);
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
          ref={(ref) => this.reactList = ref}/>
        <button onClick={this.addItem.bind(this)}>Add Item</button>
        <button onClick={this.removeFirstItem.bind(this)}>
          Remove First Item
        </button>
        <button onClick={this.editFirstItem.bind(this)}>
          Edit First Item
        </button>
      </div>
    );
  }
}

ReactDOM.render(<DummyComponent/>, document.getElementById('main'));
```
