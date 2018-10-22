import React, { Component } from 'react';
import PropTypes from 'proptypes';

let friendID;


class MainWindow extends Component {
  /**
   * Start the call with or without video
   * @param {Boolean} video
   */
   
 
  callWithVideo(video) {
	 
    const config = { audio: true };
    config.video = video;
    return () => this.props.startCall(true, friendID, config);
  }
  
 
  UserId(userId) {
	 
	 return () => 
	 document.getElementsByClassName("main-wrap")[0].style.display = "block";
	
	 this.props.setUserId(document.getElementsByClassName("txt-clientId")[0].value);
  }
  render() {
    const { clientId } = this.props;
    document.title = `${clientId} - VideoCall`;
    return (
      <div className="container main-window">
        <div>
          <h3>
            <span className="main-title-wrap">Hi, Please create your ID, </span>
			
            <input type="text"
			className="txt-clientId"
			 placeholder="Enter Your ID"
			/>
			<button
              className="btn-action fa fa-plus"
              onClick={this.UserId('rta')}
            />
			
          </h3>
		  <div className="main-wrap">
		  <span className="green_class"> ID has been created.</span>
          <h4 className="dynamic_text">Please give it to your friend to start the chatting. </h4>
		  </div>
        </div>
        <div>
          <input
            type="text"
            className="txt-clientId"
            spellCheck={false}
            placeholder="Enter Your friend ID"
            onChange={event => friendID = event.target.value}
          />
          <div>
            <button
              className="btn-action fa fa-video-camera"
              onClick={this.callWithVideo(true)}
            />
            <button
              className="btn-action fa fa-phone"
              onClick={this.callWithVideo(false)}
            />
          </div>
        </div>
      </div>
    );
  }
}

MainWindow.propTypes = {
  clientId: PropTypes.string.isRequired,
  startCall: PropTypes.func.isRequired,
  setUserId: PropTypes.func.isRequired
};

export default MainWindow;
