import React, {PropTypes} from 'react';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';
import Input from 'components/Input';
import InfoMessage from 'components/InfoMessage';
import Button from 'components/Button';
import {generateText} from 'core/idea';
import './styles.scss';


export default class Application extends React.Component {
  static propTypes = {
    setTextToCrypt: PropTypes.func,
    hideOutputArea: PropTypes.func,
    changeMode: PropTypes.func,
    decodeMode: PropTypes.bool,
    setText: PropTypes.func,
    setKey: PropTypes.func,
    text: PropTypes.string,
    key: PropTypes.string,
    setGeneratedText: PropTypes.func,
    setGeneratedKey: PropTypes.func,
  };


  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Введите текст для шифрования',
      },
      text: '',
      key: '',
      shakeInfo: false,
      encrypt: false,
      decodeMode: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.decodeMode) {
      this.setState({
        info: {
          type: 'info',
          text: 'Введите текст для дешифрования',
        },
      });
    } else {
      this.setState({
        info: {
          type: 'info',
          text: 'Введите текст для шифрования',
        },
      });
    }
  }


  setGeneratedText = (e) => {
    e.preventDefault();

    this.setState({
      text: generateText(64),
    });

    return false;
  }

  setGeneratedKey = (e) => {
    e.preventDefault();

    this.setState({
      key: generateText(128),
    });

    return false;
  }

  textChange = (e) => {
    if (e.target.value.length === 0) {
      this.props.hideOutputArea();
    }
    this.setState({
      text: e.target.value,
    });
  }

  keyChange = (e) => {
    if (e.target.value.length === 0) {
      this.props.hideOutputArea();
    }
    this.setState({
      key: e.target.value,
    });
  }


  render() {
    const getContent = interpolated => (
      <div className={cx('input-area', {
        'input-area_top': this.state.text.length > 0,
      })}>
        <div
          className='input-area__content'
          style={Object.assign({}, {transform: `scale(${interpolated.scale})`})}
        >
          <form
            className='input-area__form'
            onSubmit={this.props.setTextToCrypt}
          >
            <InfoMessage
              className='input-area__info-message'
              type={this.state.info.type}
              shake={this.state.shakeInfo}
            >{this.state.info.text}</InfoMessage>
            <div className='input-area__row'>
              <Input
                className={cx('input-area__input', {
                  'input_type_error': this.state.showEmailError,
                })}
                value={this.state.text}
                name='text'
                placeholder='Text'
                onChange={this.textChange}
              />
              <div
                className={cx('input-area__type-button', {
                  'input-area__type-button_decode': this.props.decodeMode,
                })}
                onClick={this.props.changeMode}
              ></div>
              <Button
                className='input-area__button'
                inProgress={this.state.inProgress}
                onClick = {this.setGeneratedText}
              >{this.state.inProgress ? 'Generating' : 'Generate'}</Button>
            </div>
            <div className='input-area__row'>
              <Input
                className={cx('input-area__input', {
                  'input_type_error': this.state.showEmailError,
                })}
                value={this.state.key}
                name='key'
                placeholder='Key'
                onChange={this.keyChange}
              />
              <div
                className={cx('input-area__type-button', {
                  'input-area__type-button_decode': this.props.decodeMode,
                })}
                onClick={this.props.changeMode}
              ></div>
              <Button
                className='input-area__button'
                inProgress={this.state.inProgress}
                onClick = {this.setGeneratedKey}
              >{this.state.inProgress ? 'Generating' : 'Generate'}</Button>
            </div>
            <div className='input-area__row_submit'>
              <Button
                className='input-area__submit-button input-area__submit-button_left'
                type='submit'
                inProgress={this.state.inProgress}
              >{this.state.inProgress ? 'Processing' : 'Code'}</Button>
              <Button
                className='input-area__submit-button input-area__submit-button_right'
                type='submit'
                inProgress={this.state.inProgress}
              >{this.state.inProgress ? 'Processing' : 'Check'}</Button>
            </div>
          </form>
        </div>
      </div>
    );

    return (
      <Motion
        defaultStyle={{scale: spring(0)}}
        style={{scale: spring(1, [120, 11])}}
      >
       {interpolated => getContent(interpolated)}
      </Motion>
    );
  }
}
