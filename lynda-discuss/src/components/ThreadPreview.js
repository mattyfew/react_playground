import React, {Component} from 'react';

class ThreadPreview extends Component {
    handleClick() {
        this.props.onClick(this.props._id)
    };

    render() {
        return (
            <div className="link ThreadPreview" onClick={(e) => this.handleClick(e)}>
                <div className="category-name">
                    {this.props.category}
                </div>
                <div className="thread-name">
                    {this.props.name}
                </div>
            </div>
        );
    }
}

ThreadPreview.propTypes = {
    id: React.PropTypes.string.isRequired,
    category: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    onClick: React.PropTypes.func.isRequired
};

export default ThreadPreview;
