import React from 'react';
import {connect} from 'react-redux';
import BitArray from 'node-bitarray';
import InputArea from 'components/InputArea';
import OutputArea from 'components/OutputArea';
import {crypt, decrypt} from 'core/idea';
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

    debugger;

    const text = e.target.text.value;
    const key = e.target.key.value;
    const inputText = text.split('').map(item => +item);
    const inputKey = key.split('').map(item => +item);

    if (!this.state.decodeMode) {
      const outputText = crypt(inputText, inputKey);

      this.setState({
        coding: (e.target.text.value.length !== 0) ? true : false,
        codingText: e.target.text.value,
        encodeText: outputText,
      });
    } else {
      const outputText = decrypt(inputText, inputKey);

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

  changeCheckMode = () => {
    this.setState({
      checkMode: !this.state.checkMode,
    });
  }

  render() {
    return (
      <div className='cipher'>
        <InputArea
          setTextToCrypt={this.setTextToCrypt}
          hideOutputArea={this.hideOutputArea}
          changeMode={this.changeMode}
          decodeMode={this.state.decodeMode}
          setText={this.setState}
          setKey={this.setKey}
          text={this.state.text}
          key={this.state.key}
          setGeneratedText={this.setGeneratedText}
          setGeneratedKey={this.setGeneratedKey}
        />
        <OutputArea coding={this.state.coding} encodeText={this.state.encodeText}/>
      </div>
    );
  }
}
