import React, {Component, createRef} from "react";
import {connect} from "react-redux";
// the package video lib
// flv is about downloading a video stream and then converting to some file
// that actually play in the normal html video player. FLV something like axios
// it is going to reach out some remote server, get some resource and then serve that data
// to our app to be consumed on the screen
import flv from 'flv.js';
import {fetchStream} from "../../actions";

class StreamShow extends Component {
    constructor(props) {
        super(props);

        // to get access to the video element in the render method
        this.videoRef = createRef();
    }

    // (1) the idea when our component first renders attempt to build the player "this.buildPlayer();"
    componentDidMount() {
        const {id} = this.props.match.params;

         this.props.fetchStream(id);

        this.buildPlayer();
    }

    // (2) and then if out component fetches the stream successfully at some point in the future
    // and the component Re-renders component it update will be called and we will attempt to call build player
    // in there as well. Essentially at any point at StreamShow component gets rendered either
    // the initial render or any follow up render we are always going to attempt to build a player.
    componentDidUpdate(prevProps, prevState, snapshot) {
        this.buildPlayer();
    }

    // Lifecycle method in order to clean up some resources
    // when component StreamShow Unmount for instant move to another webpage we are going to
    // clean up our video resource
    componentWillUnmount() {
        // when we destroy on the player it's going to essentially tell the player to stop
        // attempting to stream the video and detach itself from that video element that we had created
        // down inside in the render method
        this.player.destroy();
    }

    buildPlayer() {
        if (this.player || !this.props.stream) {
            return;
        }

        const {id} = this.props.match.params;

        this.player = flv.createPlayer({
            // to designate the type of video that we are going to receive
            type: "flv",
            url: `http://localhost:8000/live/${id}.flv`
        });

        this.player.attachMediaElement(this.videoRef.current);
        this.player.load();
    }

    render() {
        if (!this.props.stream) {
            return <div>Loading ...</div>
        }
        // this.props.stream.title
        //this.props.stream.description
        const {title, description} = this.props.stream

        return (
            <div>
                <video
                    ref={this.videoRef}
                    style={{width: "100%"}}
                    controls

                />
                <h1>{title}</h1>
                <h5>{description}</h5>
            </div>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return { stream: state.streams[ownProps.match.params.id]}
}

export default connect(
    mapStateToProps,
    {fetchStream}
)(StreamShow);