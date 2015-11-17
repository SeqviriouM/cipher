import React from 'react';
import {connect} from 'react-redux';
import BitArray from 'node-bitarray';
import InputArea from 'components/InputArea';
import OutputArea from 'components/OutputArea';
import {encrypt, decrypt} from 'core/des';
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
      text: '',
      key: '',
      codingText: '',
      decodeMode: false,
      checkMode: false,
    };
  }


  setTextToCrypt = (e) => {
    e.preventDefault();

    const text = e.target.text.value;
    const key = e.target.key.value;
    const mode = e.target.mode.value;
    const inputText = text.split('').map(item => +item);
    const inputKey = key.split('').map(item => +item);

    if (this.state.checkMode) {
      const encodedText = encrypt(inputText, inputKey, mode);
      const decodedText = decrypt(encodedText, inputKey, mode);

      this.setState({
        coding: (e.target.text.value.length !== 0) ? true : false,
        codingText: e.target.text.value,
        encodedText,
        decodedText,
      });
    } else if (!this.state.decodeMode) {
      const outputText = encrypt(inputText, inputKey, mode);

      this.setState({
        coding: (e.target.text.value.length !== 0) ? true : false,
        codingText: e.target.text.value,
        encodedText: outputText,
      });
    } else {
      const encodedText = decrypt(inputText, inputKey, mode);

      this.setState({
        coding: (e.target.text.value.length !== 0) ? true : false,
        codingText: e.target.text.value,
        encodedText,
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

  changeCheckMode = (e) => {
    e.preventDefault();

    this.setState({
      checkMode: !this.state.checkMode,
      decodedText: '',
    });
  }

  render() {
    return (
      <div className='cipher'>
        <InputArea
          setTextToCrypt={this.setTextToCrypt}
          hideOutputArea={this.hideOutputArea}
          changeMode={this.changeMode}
          changeCheckMode={this.changeCheckMode}
          decodeMode={this.state.decodeMode}
          setText={this.setState}
          setKey={this.setKey}
          setGeneratedText={this.setGeneratedText}
          setGeneratedKey={this.setGeneratedKey}
          text={this.state.text}
          key={this.state.key}
          checkMode={this.state.checkMode}
        />
        <OutputArea
          coding={this.state.coding}
          encodedText={this.state.encodedText}
          decodedText={this.state.decodedText}
          checkMode={this.state.checkMode}
        />
      </div>
    );
  }
}
