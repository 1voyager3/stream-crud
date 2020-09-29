import React, {Component, Fragment} from "react";
import {connect} from "react-redux";
import {Link} from 'react-router-dom';
import Modal from "../Modal";
import history from "../../history";
import {fetchStream, deleteStream} from "../../actions";

class StreamDelete extends Component {

    componentDidMount() {
        this.props.fetchStream(this.props.match.params.id)
    }

    renderActions() {
        // the same below with destruction const id = this.props.match.params.id;
        const {id} = this.props.match.params;
        return (
            // React.Fragment to avoid the div wrapping for acton buttons to be correctly positioned
            // or use "<> </>" - shortcut of Fragment
            // but preferably to use <Fragment></Fragment> because some tools can show the error
            <Fragment>
                <button
                    onClick={() => this.props.deleteStream(id)}
                    className="ui button negative"
                >
                    Delete
                </button>
                <Link
                    to="/"
                    className="ui button"
                >
                    Cancel
                </Link>
            </Fragment>
        )
    }

    renderContent() {
        if (!this.props.stream) {
            return "Are you sure you want to delete this stream?";
        }
        return `Are you sure you want to delete the stream with title: ${this.props.stream.title} ?`;
    }

    render() {
        return (
                <Modal
                    title="Delete Stream"
                    content={this.renderContent()}
                    actions={this.renderActions()}
                    onDismissed={() => history.push('/')}
                />
        );
    }
}



const mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams[ownProps.match.params.id]
    }
}

export default connect(
    mapStateToProps,
    {fetchStream, deleteStream}
)(StreamDelete);