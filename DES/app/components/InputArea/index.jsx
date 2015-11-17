import React, {PropTypes} from 'react';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';
import Input from 'components/Input';
import InfoMessage from 'components/InfoMessage';
import Button from 'components/Button';
import Select from 'react-select';
import {generateText} from 'core/des';
import './styles.scss';
import 'react-select/dist/react-select.css';


export default class Application extends React.Component {
  static propTypes = {
    setTextToCrypt: PropTypes.func,
    hideOutputArea: PropTypes.func,
    changeMode: PropTypes.func,
    changeCheckMode: PropTypes.func,
    setText: PropTypes.func,
    setKey: PropTypes.func,
    setGeneratedText: PropTypes.func,
    setGeneratedKey: PropTypes.func,
    text: PropTypes.string,
    key: PropTypes.string,
    decodeMode: PropTypes.bool,
    checkMode: PropTypes.bool,
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
      mode: '',
      shakeInfo: false,
      encrypt: false,
      decodeMode: false,
      hoverAnimation: false,
    };

    this.modeOptions = [
      { value: 'ECB', label: 'ECB' },
      { value: 'OFB', label: 'OFB' },
    ];
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
      showTextError: false,
    });

    return false;
  }

  setGeneratedKey = (e) => {
    e.preventDefault();

    this.setState({
      key: generateText(128),
      showKeyError: false,
    });

    return false;
  }

  checkData = (e) => {
    if (!this.state.text || !this.state.key) {
      e.preventDefault();

      this.setState({
        showTextError: true,
        showKeyError: true,
      });
    }
  }

  textChange = (e) => {
    if (e.target.value.length === 0) {
      this.props.hideOutputArea();
    }
    this.setState({
      text: e.target.value,
      showTextError: false,
    });
  }

  keyChange = (e) => {
    if (e.target.value.length === 0) {
      this.props.hideOutputArea();
    }
    this.setState({
      key: e.target.value,
      showKeyError: false,
    });
  }

  selectMode = (e) => {
    this.setState({
      mode: e,
    });
  }

  startHoverAnimation = () => {
    this.setState({
      hoverAnimation: true,
    });
  }


  stopHoverAnimation = () => {
    this.setState({
      hoverAnimation: false,
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
            onMouseOver={this.startHoverAnimation}
            onMouseOut={this.stopHoverAnimation}
          >
            <InfoMessage
              className='input-area__info-message'
              type={this.state.info.type}
              shake={this.state.shakeInfo}
            >{this.state.info.text}</InfoMessage>
            <div className='input-area__row'>
              <Input
                className={cx('input-area__input', {
                  'input_type_error': this.state.showTextError,
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
                title='Change mode(code|decode)'
              ></div>
              <Motion
                defaultStyle={{x: spring(500)}}
                style={{x: spring(this.state.hoverAnimation ? 0 : 500, [140, 22])}}
                >
                {interpolatedStyle => <div
                  className='input-area__button input-area__button_generate'
                  style={{transform: `translateX(${interpolatedStyle.x}px)`}}
                  onClick = {this.setGeneratedText}
                  title='Generate text'
                ><span className='symbol'>⚙</span></div>
                }
              </Motion>
            </div>
            <div className='input-area__row'>
              <Input
                className={cx('input-area__input', {
                  'input_type_error': this.state.showKeyError,
                })}
                value={this.state.key}
                name='key'
                placeholder='Key'
                onChange={this.keyChange}
              />
              <div
                className={cx('input-area__button input-area__check-mode', {
                  'input-area__check-mode_active': this.props.checkMode,
                })}
                onClick={this.props.changeCheckMode}
                title='Change checkMode'
              >
                <span className='symbol'>♻</span>
              </div>
               <Motion
                defaultStyle={{x: spring(500)}}
                style={{x: spring(this.state.hoverAnimation ? 0 : 500, [140, 22])}}
                >
                {interpolatedStyle => <div
                  className='input-area__button input-area__button_generate'
                  style={{transform: `translateX(${interpolatedStyle.x}px)`}}
                  onClick = {this.setGeneratedKey}
                  title='Generate key'
                ><span className='symbol'>⚙</span></div>
                }
              </Motion>
            </div>
            <div className='input-area__row_submit'>
             <div className='input-area__select-area'>
               <Select
                  name='mode'
                  value={this.state.mode}
                  options={this.modeOptions}
                  onChange={this.selectMode}
                />
              </div>
              <Button
                className='input-area__submit-button'
                type='submit'
                inProgress={this.state.inProgress}
                onClick={this.checkData}
              >{this.state.inProgress ? 'Processing' : (this.props.decodeMode ? 'Decode' : 'Code')}</Button>
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
