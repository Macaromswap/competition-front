import React from 'react';
import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 120px;
  height: 120px;
  position: relative;
`;

const Svg = styled.svg`
  transform: rotate(-90deg);
`;

const CircleBackground = styled.circle`
  fill: none;
  stroke: rgba(178, 197, 215, 0.40);
  stroke-width: 17;
`;

const CircleProgress = styled.circle`
  fill: none;
  stroke: #6fd765;
  stroke-width: 17;
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


const Gauge = ({ percentage }) => {
    const size = 120;
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const dashOffset = circumference * (1 - percentage / 100);

    return (
        <Container>
            <Svg width={size} height={size}>
                <CircleBackground cx="60" cy="60" r={radius} />
                <CircleProgress
                  cx="60"
                  cy="60"
                  r={radius}
                  dashArray={circumference}
                  dashOffset={dashOffset}
                />
            </Svg>
            <StatusText>
                <TextStyle color={'#24282B'} size={25} hsize={18}>{`${percentage.toFixed(2)}%`}</TextStyle>
                <TextStyle color={'#24282B'} size={12}>当前进度</TextStyle>
            </StatusText>
        </Container>
    );
};

export default Gauge;
