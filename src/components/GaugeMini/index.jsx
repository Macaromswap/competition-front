import React from 'react';
import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';
import { numFloor } from "../../utils/numbers.js";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px; 
  position: relative;
`;

const Svg = styled.svg`
  transform: rotate(-90deg);
  width: 100%;
  height: 100%;
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: rgba(178, 197, 215, 0.40);
  stroke-width: 5; /* 修改背景圆环的宽度为10 */
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: ${(props) => props.color};
  stroke-width: 5; /* 修改进度圆环的宽度为10 */
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


const Gauge = ({ percentage=0, color="#6fd765" }) => {
    const { t, i18n } = useTranslation();
    const size = '100%';
    const radius = 22; /* 将半径修改为42 */
    const circumference = 2 * Math.PI * radius;
    const perc = percentage > 100? 100 : numFloor(percentage)
    const dashOffset = circumference * (1 - perc / 102);

    return (
        <Container>
            <Svg width={size} height={size}>
                <CircleBackground cx="25" cy="25" r={radius} />
                <CircleProgress
                  cx="25"
                  cy="25"
                  r={radius}
                  color={color}
                  dashArray={circumference}
                  dashOffset={dashOffset}
                />
            </Svg>
            <StatusText>
                <TextStyle color={'#24282B'} size={12}>{perc}%</TextStyle>
            </StatusText>
        </Container>
    );
};

export default Gauge;