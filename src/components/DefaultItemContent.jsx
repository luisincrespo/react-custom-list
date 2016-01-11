import React from 'react';

class DefaultItemContent extends React.Component {
  _onRemove(event) {
    event.preventDefault();

    this.props.onRemove();
  }

  render() {
    return (
      <li>
        {this.props.item.toList().toJS()}
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

export default DefaultItemContent;
