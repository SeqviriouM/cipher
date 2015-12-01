import React from 'react';
import {connect} from 'react-redux';
import InputArea from 'components/InputArea';
import OutputArea from 'components/OutputArea';
import {encrypt, decrypt} from 'core/rsa';
import 'styles/main.scss';


@connect(state => ({
  crypt: state.crypt,
  local: state.local,
}))

export default class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      coding: false,
      codingText: '',
      decodeMode: false,
      textMode: false,
    };
  }

  setTextToCrypt = (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    const inputText = this.state.textMode ? text.split('').map((item) => (item.charCodeAt())) : text.split('-');

    if (!this.state.decodeMode) {
      const outputText = encrypt(inputText);

      this.setState({
        coding: (e.target.text.value.length !== 0) ? true : false,
        codingText: e.target.text.value,
        encodeText: outputText,
      });
    } else {
      const outputText = decrypt(inputText);

      this.setState({
        coding: (e.target.text.value.length !== 0) ? true : false,
        codingText: e.target.text.value,
        encodeText: outputText,
      });
    }
    return false;
  }

  hideOutputArea = () => {
    this.setState({
      coding: false,
    });
  }

  changeMode = () => {
    this.setState({
      decodeMode: !this.state.decodeMode,
    });
  }

  changeTextMode = () => {
    this.setState({
      textMode: !this.state.textMode,
    });
  }

  render() {
    return (
      <div className='cipher'>
        <InputArea
          setTextToCrypt={this.setTextToCrypt}
          hideOutputArea={this.hideOutputArea}
          changeMode={this.changeMode}
          changeTextMode={this.changeTextMode}
          decodeMode={this.state.decodeMode}
          textMode={this.state.textMode}
        />
        <OutputArea coding={this.state.coding} decodeMode={this.state.decodeMode} encodeText={this.state.encodeText}/>
      </div>
    );
  }
}
