import React, { Component } from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <div className='feed-wrapper'>
      <h1 className='header'>Feed</h1>
        <div className='feed-container'>
          <div className='images'><img src="./assets/image1.jpg" alt="one"></img></div>
          <p style={{ textAlign: 'center' }}>I see these bright lights every night I walk home...</p>
        </div>
        <div className='feed-container'>
          <div className='images'><img src="./assets/image2.jpg" alt="two"></img></div>
          <p style={{ textAlign: 'center' }}>I see these bright lights every night I walk home...</p>
        </div>
        <div className='feed-container'>
          <div className='images'><img src="./assets/image3.jpg" alt="three"></img></div>
          <p style={{ textAlign: 'center' }}>I see these bright lights every night I walk home...</p>
        </div>

      </div>
    );
  }
}
