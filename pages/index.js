// This is an example page from a next.js app
// I've added buttons below the player to control seeking and speed
// As well as keyboard shortcuts and swiping to control the seeking
// I wanted users to be able to seek around the video and see the timecode pop up
// wherever they were on the page, even if the video was far out of view.

import Layout from '../components/Layout'
import VisibilitySensor from 'react-visibility-sensor';
import keydown from 'react-keydown'
// Using react-player
import ReactPlayer from 'react-player'
// And react-swipeable
import Swipeable from 'react-swipeable'

// HOTKEYS used by react-keydown to trigger the seeking and pausing
const HOTKEYS = [ 'shift+left', 'shift+right', 'ctrl+left', 'ctrl+right', 'cmd+left', 'cmd+right', 'shift+space', 'ctrl+space', 'space' ];

// To convert the seconds into a nice timecode to display when user seeks
function toMMSS(sec) {
    var sec_num = parseInt(sec, 10); // don't forget the second param
    var hours   = Math.floor(sec_num / 3600);
    var minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    var seconds = sec_num - (hours * 3600) - (minutes * 60);

    if (hours   < 10) {hours   = "0"+hours;}
    if (minutes < 10) {minutes = "0"+minutes;}
    if (seconds < 10) {seconds = "0"+seconds;}
    return minutes+':'+seconds;
}

@keydown( HOTKEYS )
class SwipeablePlayerPage extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            playbackRate: 1,
            playing: false,
            timecodeDisplay: null
        };
        this.PlayerControls = this.PlayerControls.bind(this);
        this.seekBack = this.seekBack.bind(this);
        this.seekForward = this.seekForward.bind(this);
        this.swipedLeft = this.swipedLeft.bind(this);
        this.swipedRight = this.swipedRight.bind(this);
        this.visibilityChange = this.visibilityChange.bind(this);
    }

    timecodeTimer = null;

    // Keyhandling functions
    componentWillReceiveProps( { keydown } ) {
        if (keydown.event) {
            if ( keydown.event.key == 'ArrowRight' ) {
                keydown.event.preventDefault();
                this.seekForward();
            }
            if ( keydown.event.key == 'ArrowLeft' ) {
                keydown.event.preventDefault()
                this.seekBack();
            }
            if ( keydown.event.key == ' ' ) {
                keydown.event.preventDefault();
                this.setState(prevState => ({
                    playing: !prevState.playing 
                }));
            }
        }
    }

    seekInterval = 2.5;

    setPlaybackRate = e => {
        this.setState({ playbackRate: parseFloat(e) })
    }

    ref = player => {
        this.player = player
    }

    // Function to seek backwards and display a timecode overlay 
    seekBack() {
        const timecodeDisplayTime = 1200;
        this.player.seekTo(this.player.getCurrentTime() - this.seekInterval);
        const seconds = this.player.getCurrentTime();
        this.setState({ timecodeDisplay: toMMSS(seconds) });
        if (this.timecodeTimer) {
            clearTimeout(this.timecodeTimer);
            this.timecodeTimer = setTimeout(() => this.setState({ timecodeDisplay: null}), timecodeDisplayTime);
        }
        else this.timecodeTimer = setTimeout(() => this.setState({ timecodeDisplay: null}), timecodeDisplayTime);
    }

    // Function to seek forwards and display a timecode overlay 
    seekForward() {
        const timecodeDisplayTime = 1200;
        this.player.seekTo(this.player.getCurrentTime() + this.seekInterval);
        const seconds = this.player.getCurrentTime();
        this.setState({ timecodeDisplay: toMMSS(seconds) });
        if (this.timecodeTimer) {
            clearTimeout(this.timecodeTimer);
            this.timecodeTimer = setTimeout(() => this.setState({ timecodeDisplay: null}), timecodeDisplayTime);
        }
        else this.timecodeTimer = setTimeout(() => this.setState({ timecodeDisplay: null}), timecodeDisplayTime);
    }
    
    // Function handlers called on swipe actions.
    swipedRight() {
        this.seekForward();
    }

    swipedLeft() {
        this.seekBack();
    }

    // Checking if the player has been scrolled out of view (to display the timecode as an overlay when necessary)
    visibilityChange(isVisible) {
        this.setState({ playerIsVisible: isVisible ? true : false });
    }

    // Extra buttons below the player for seeking and speed control
    PlayerControls() {
        return ( 
            <div className="player-controls">
                <div className="controls-centered">
                    <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => this.setPlaybackRate(0.5)}>0.5x</button>
                    <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => this.setPlaybackRate(0.75)}>0.75x</button>
                    <button className="mini-btn" onClick={() => this.setPlaybackRate(1)}>1x</button>
                </div>
                <div className="controls-left">
                    <button className="mini-btn" onClick={this.seekBack}>{`<<`}</button>
                </div>
                <div className="controls-right">
                    <button className="mini-btn" onClick={this.seekForward}>{`>>`}</button>
                </div>
                <style jsx>{`
                    .player-controls {
                        margin-top: 0.5em;
                        margin-bottom: 0.5em;
                        font-size: 13px;
                        display: flex;
                    }
                    .controls-left {
                        order: -1;
                    }
                    .controls-centered {
                        flex: 1;
                        text-align: center;
                    }
                    .mini-btn {
                        background: white;
                        font: inherit;
                        padding: 0.1em 0.4em;
                        margin: 0 0.1em;
                        border: 0.5px solid grey;
                        border-radius: 5px;
                    }
                    .mini-btn:active {
                        background: #eee;
                    }
                    .mini-btn:focus {
                        outline: none;
                    }
                    .mini-btn:hover {
                        cursor: pointer;
                    }
                    .mini-btn-right {
                        float: right;
                    }
                `}</style>
            </div>
        )
    }

    // Extra buttons below the player for seeking and speed control
    PlayerControls() {
        return ( 
            <div className="player-controls">
                <div className="controls-centered">
                    <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => this.setPlaybackRate(0.5)}>0.5x</button>
                    <button className="mini-btn" style={{ marginRight: '5px' }} onClick={() => this.setPlaybackRate(0.75)}>0.75x</button>
                    <button className="mini-btn" onClick={() => this.setPlaybackRate(1)}>1x</button>
                </div>
                <div className="controls-left">
                    <button className="mini-btn" onClick={this.seekBack}>{`<<`}</button>
                </div>
                <div className="controls-right">
                    <button className="mini-btn" onClick={this.seekForward}>{`>>`}</button>
                </div>
                <style jsx>{`
                    .player-controls {
                        margin-top: 0.5em;
                        margin-bottom: 0.5em;
                        font-size: 13px;
                        display: flex;
                    }
                    .controls-left {
                        order: -1;
                    }
                    .controls-centered {
                        flex: 1;
                        text-align: center;
                    }
                    .mini-btn {
                        background: white;
                        font: inherit;
                        padding: 0.1em 0.4em;
                        margin: 0 0.1em;
                        border: 0.5px solid grey;
                        border-radius: 5px;
                    }
                    .mini-btn:active {
                        background: #eee;
                    }
                    .mini-btn:focus {
                        outline: none;
                    }
                    .mini-btn:hover {
                        cursor: pointer;
                    }
                    .mini-btn-right {
                        float: right;
                    }
                `}</style>
            </div>
        )
    }

    render() {
        return (
            <Layout>
                {/* Swipeable area covering the whole page */}
                <Swipeable onSwipedRight={this.swipedRight} onSwipedLeft={this.swipedLeft}>
                    <h2>{this.props.title}</h2>
                    {/* Display time code overlay when seeking when the player is out of view or playing */}
                    { ((this.state.playing || !this.state.playerIsVisible) && this.state.timecodeDisplay) && <div style={{ position: 'fixed', left: 0, right: 0, margin: '5% auto', zIndex: '5', top: '40px', backgroundColor: 'rgba(190, 190, 190, 0.8)', color: 'white', borderRadius: '5px', margin: '0 auto', width: '40px', padding: '5px 10px' }}>{this.state.timecodeDisplay}</div>}
                    {/* Video Player Block */}
                    <div style={{ maxWidth: '600px'}}>
                        <div className="player-wrapper">
                            <ReactPlayer 
                                url='https://www.youtube.com/watch?v=L_XJ_s5IsQc'
                                ref={this.ref}
                                controls={true}
                                width='100%'
                                height='100%'
                                playbackRate={this.state.playbackRate}
                                onPlay={() => this.setState({ playing: true })}
                                onPause={() => this.setState({ playing: false })}
                                playing={this.state.playing}
                                style={{ position: 'absolute',
                                    top: 0,
                                    left: 0 }}
                            />
                        </div>
                        {/* Sense if player's moved out of screen */}
                        <VisibilitySensor onChange={this.visibilityChange} />
                        {/* Extra controls for speed and seeking below player */}
                        <this.PlayerControls />
                    </div>
                    <div>
                        <p>Other Page Content Here</p>
                        <p>A bunch of stuff...</p>
                        <p>Can swipe anywhere here</p>
                        <p>Or however big the page gets</p>
                        <p>Also you can press shift/ctl/cmd + left/right to seek back and forth</p>
                        <p>And shift/ctl/cmd + space to play/pause</p>
                    </div>
                </Swipeable>           
                <style jsx>{`
                    .player-wrapper {
                        position: relative;
                        padding-top: 56.25% /* Player ratio: 100 / (1280 / 720) */
                    }
                    .text-block {
                        margin-top: 1em;
                    }
                    .small-clickable {
                        float: right;
                        margin-right: 0;
                    }
                    .small-clickable:hover {
                        cursor: pointer;
                    }
                    .flex-grid {
                        display: flex;
                        justify-content: flex-start;
                        flex-flow: row wrap;
                    }
                    @media (max-width: 400px) {
                        .flex-grid {
                            display: block;
                        }
                    }
                `}</style>
            </Layout>
        )
    }
}

export default SwipeablePlayerPage
