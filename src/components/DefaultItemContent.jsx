import React from 'react';

class DefaultItemContent extends React.Component {
  render() {
    return (
      <li>
        {this.props.item.toList().toJS()}
        <div>
          <a
            href="#"
            onClick={this.props.onRemove}>
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
