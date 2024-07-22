import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
`;

const TimeBox = styled.div`
    margin: 0 3px 0 3px;
    text-align: center;
`;
const DateBox = styled.div`
    display: flex;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 10px;
    border: 3px solid var(--Button-button_pink, #FFDADC);
    background: var(--Button-button_solid_border, #292627);
    box-shadow: 2px 2px 0px 0px #000;
    box-sizing: border-box;
`;

const formatTime = (time) => {
  	return time < 10 ? `0${time}` : time;
};

const Countdown = ({ endDate, startDate }) => {
    const { t, i18n } = useTranslation();

    const calculateTimeLeft = (difference) => {
        const startDifference = new Date(startDate) - new Date();
        let timeLeft = {};
        if (startDifference < 0) {
          	timeLeft = {
          	  	days: formatTime(Math.floor(difference / (1000 * 60 * 60 * 24))),
          	  	hours: formatTime(Math.floor((difference / (1000 * 60 * 60)) % 24)),
          	  	minutes: formatTime(Math.floor((difference / 1000 / 60) % 60)),
          	  	seconds: formatTime(Math.floor((difference / 1000) % 60)),
          	};
        } else {
          	timeLeft = {
          	  	days: '00',
          	  	hours: '00',
          	  	minutes: '00',
          	  	seconds: '00',
          	};
        }

        return timeLeft;
    };

  const [timeLeft, setTimeLeft] = useState({days: '00', hours: '00', minutes: '00', seconds: '00',});

  useEffect(() => {
    const timer = setInterval(() => {
      	const difference = new Date(endDate) - new Date();
		
      	if (difference > 0) {
      	  	const newTimeLeft = calculateTimeLeft(difference);
      	  	setTimeLeft(newTimeLeft);
      	}else {
      	  	clearInterval(timer);
      	}
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate, startDate]);

  return (
    <CountdownContainer>
      <TimeBox>
        <DateBox>
            <TextStyle color={'#FEFEFE'} size={12} hsize={12}>
                {timeLeft.days}d
            </TextStyle>
        </DateBox>
      </TimeBox>
      <TimeBox>
        <TextStyle color={'#000'} size={12}>:</TextStyle>
      </TimeBox>
      <TimeBox>
        <DateBox>
            <TextStyle color={'#FEFEFE'} size={12} hsize={12}>
                {timeLeft.hours}h
            </TextStyle>
        </DateBox>
      </TimeBox>
      <TimeBox>
        <TextStyle color={'#000'} size={12}>:</TextStyle>
      </TimeBox>
      <TimeBox>
        <DateBox>
            <TextStyle color={'#FEFEFE'} size={12} hsize={12}>
                {timeLeft.minutes}m
            </TextStyle>
        </DateBox>
      </TimeBox>
      <TimeBox>
        <TextStyle color={'#000'} size={12}>:</TextStyle>
      </TimeBox>
      <TimeBox>
        <DateBox>
            <TextStyle color={'#FEFEFE'} size={12} hsize={12}>
                {timeLeft.seconds}s
            </TextStyle>
        </DateBox>
      </TimeBox>
    </CountdownContainer>
  );
};

export default Countdown;
