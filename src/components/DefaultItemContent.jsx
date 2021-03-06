import React from 'react';

class DefaultItemContent extends React.Component {
  constructor(props) {
    super(props);
    this._onRemove = this._onRemove.bind(this);
  }

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
            onClick={this._onRemove}
          >
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
