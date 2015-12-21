import React from 'react';

class DefaultContent extends React.Component {
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

DefaultContent.propTypes = {
  item: React.PropTypes.object.isRequired,
  onRemove: React.PropTypes.func.isRequired,
  onEdit: React.PropTypes.func.isRequired
};

export default DefaultContent;
