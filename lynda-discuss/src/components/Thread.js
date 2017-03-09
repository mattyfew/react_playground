import React, {Component, PropTypes} from 'react';

class Thread extends Component {
    componentDidMount() {
        this.props.fetchNames(this.props.nameIds)
    }

    handleSubmit (e) {
        e.preventDefault()
        this.props.addName(this.refs.newNameInput.value, this.props._id);
        this.refs.newNameInput.value = ''
    }

    render() {
        return (
            <div className="Thread">
                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">Thread Description</h3>
                    </div>
                    <div className="panel-body">
                      <div className="contest-description">
                        {this.props.text}
                      </div>
                    </div>
                  </div>

                  <div className="panel panel-default">
                    <div className="panel-heading">
                      <h3 className="panel-title">Proposed Names</h3>
                    </div>
                    <div className="panel-body">
                      <ul className="list-group">
                        {this.props.nameIds.map(nameId =>
                          <li key={nameId} className="list-group-item">
                            {this.props.lookupName(nameId).name}
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="panel panel-info">
                    <div className="panel-heading">
                      <h3 className="panel-title">Propose a New Name</h3>
                    </div>
                    <div className="panel-body">
                      <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                          <input type="text"
                             placeholder="New Name Here..."
                             ref="newNameInput"
                             className="form-control" />
                          <span className="input-group-btn">
                            <button type="submit" className="btn btn-info">
                               Sumbit
                            </button>
                          </span>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div className="home-link link"
                       onClick={this.props.threadListClick}>
                    Thread List
                  </div>
                </div>
        )
    }
}

Thread.propTypes = {
    _id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    threadListClick: PropTypes.func.isRequired,
    fetchNames: PropTypes.func.isRequired,
    nameIds: PropTypes.array.isRequired,
    addName: PropTypes.func.isRequired,
    lookupName: PropTypes.func.isRequired
}

export default Thread
