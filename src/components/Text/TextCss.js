import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const lineHeightList = {
    12: 20,
    13: 20,
    14: 22,
    15: 24,
    16: 24,
    18: 28,
    20: 28,
    22: 35,
    24: 38,
    26: 42,
    30: 48,
    32: 38,
    36: 44,
    40: 48,
    44: 52,
    48: 58,
    54: 54,
    56: 68,
};

const rem = ($px) => {
    return $px / 75 + 'rem';
};

const lineH = (size) => {
    return size * 0.86 + 'px';
};

const TextStyle = styled.div `
  font-family: ${(props) => (props.isEnglish ? 'ENGLISH-VILANE-MEDIUM' : 'CHINESE-HYQiHei-70S')};
  color: ${(props) => (props.color ? props.color : '#000000')};
  ${(props) => props.justify && 'text-align: justify'};
  
  // pc
  @media screen and (min-width: 600px) {
    font-size: ${(props) => props.size + 'px'};
    line-height: ${(props) => lineHeightList[props.size] + 'px'};
    ${(props) => props.spac && `letter-spacing: ${props.spac}px`};
  }

  // H5
  @media screen and (max-width: 600px) {
    font-size: ${(props) => (props.hsize ? props.hsize + 'px' : props.size + 'px')};
    line-height: ${(props) => (props.hsize ? lineHeightList[props.hsize] + 'px' : lineHeightList[props.size] + 'px')};
  }
`;

const TextComponent = ({ children, size, color, justify, spac, hsize }) => {
  const { i18n } = useTranslation();
  const isEnglish = ['en', 'vi'].includes(i18n.language);

  return (
    <TextStyle 
      size={size}
      color={color}
      justify={justify}
      spac={spac}
      hsize={hsize}
      isEnglish={isEnglish}
    >
      {children}
    </TextStyle>
  );
};

export {
  TextComponent as TextStyle,
};