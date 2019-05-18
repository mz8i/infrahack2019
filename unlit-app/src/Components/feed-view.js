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
      <div className='feed-container'>
        <div className='image1'></div>

        <p style={{ textAlign: 'center' }}>I see this bright lights every night I walk home</p>
      </div>
    );
  }
}
