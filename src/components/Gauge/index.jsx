import React from 'react';
import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';
import { numFloor } from "../../utils/numbers.js";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 94px; /* 修改容器的宽度为84px */
  height: 94px; /* 修改容器的高度为84px */
  position: relative;
`;

const Svg = styled.svg`
  transform: rotate(-90deg);
  width: 100%; /* 让SVG元素填充其父容器的宽度 */
  height: 100%; /* 让SVG元素填充其父容器的高度 */
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: rgba(178, 197, 215, 0.40);
  stroke-width: 10; /* 修改背景圆环的宽度为10 */
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: ${(props) => props.color};
  stroke-width: 10; /* 修改进度圆环的宽度为10 */
  stroke-linecap: round;
  stroke-dasharray: ${(props) => props.dashArray};
  stroke-dashoffset: ${(props) => props.dashOffset};
  transition: stroke-dashoffset 0.5s ease;
`;

const Text = styled.text`
  fill: #000;
  font-size: 0.9em;
  text-anchor: middle;
  dominant-baseline: middle;
  transform: rotate(90deg); /* Rotate text back */
  transform-origin: center; /* Ensure rotation is from the center */
`;

const StatusText = styled.div`
    position: absolute;
    text-align: center;
`;


const Gauge = ({ percentage, color="#6fd765" }) => {
    const { t, i18n } = useTranslation();
    const size = '100%';
    const radius = 42; /* 将半径修改为42 */
    const circumference = 2 * Math.PI * radius;
    const perc = percentage > 100? 100 : numFloor(percentage)
    const dashOffset = circumference * (1 - perc / 102);

    return (
        <Container>
            <Svg width={size} height={size}>
                <CircleBackground cx="47" cy="47" r={radius} />
                <CircleProgress
                  cx="47"
                  cy="47"
                  r={radius}
                  color={color}
                  dashArray={circumference}
                  dashOffset={dashOffset}
                />
            </Svg>
            <StatusText>
                <TextStyle color={'#24282B'} size={20} hsize={18}>{perc}%</TextStyle>
                <TextStyle color={'#24282B'} size={12}>{t('progress')}</TextStyle>
            </StatusText>
        </Container>
    );
};

export default Gauge;