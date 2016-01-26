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
          onItemAdd={(item) => console.log(item)}
          onItemRemove={
            (index, item) => {
              console.log(index);
              console.log(item);
            }
          }
          onItemEdit={
            (index, oldItem, newItem) => {
              console.log(index);
              console.log(oldItem);
              console.log(newItem);
            }
          }
          ref={(ref) => this.reactList = ref}/>
        <button onClick={this.addItem.bind(this)}>Add Item</button>
        <button onClick={this.editFirstItem.bind(this)}>Edit 1st Item</button>
        <button onClick={this.removeFirstItem.bind(this)}>Remove 1st Item</button>
      </div>
    );
  }
}

ReactDOM.render(<DummyComponent/>, document.getElementById('main'));
```
