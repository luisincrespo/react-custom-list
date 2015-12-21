import React from 'react';

class DefaultContent extends React.Component {
  render() {
    return (
      <li>
        {this.props.item}
        <span>
          <a
            href="#"
            onClick={this.props.onRemove}>
            Remove
          </a>
        </span>
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
