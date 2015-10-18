import React, {PropTypes} from 'react';
import cx from 'classnames';
import {Motion, spring} from 'react-motion';
import './styles.scss';


export default class Application extends React.Component {
  static propTypes = {
    coding: PropTypes.bool.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      info: {
        type: 'info',
        text: 'Введите текст для шифрования',
      },
      text: '',
      shakeInfo: false,
      encrypt: false,
    };
  }

  textChange = e => {
    this.setState({
      text: e.target.value,
    });
  }


  render() {
    const getContent = interpolated => (
      <div className={cx('output-area__wrapper', {})}>
        <div
          className='output-area'
          style={Object.assign({}, {transform: `translateY(-${interpolated.y}%)`})}
        >
        </div>
      </div>
    );

    return (
      <Motion
        defaultStyle={{y: spring(0)}}
        style={{y: spring( this.props.coding ? 35 : 0, [120, 11])}}
      >
       {interpolated => getContent(interpolated)}
      </Motion>
    );
  }
}
