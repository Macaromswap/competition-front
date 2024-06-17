import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss'
import { useTranslation } from 'react-i18next';

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: baseline;
  margin-bottom: 14px;
`;

const TimeBox = styled.div`
  margin: 0 5px;
  text-align: center;
`;
const DateBox = styled.div`
    display: flex;
    width: 60px;
    height: 60px;
    justify-content: center;
    align-items: center;
    border-radius: 20px;
    border: 4.178px solid var(--Button-button_pink, #FFDADC);
    background: var(--Button-button_solid_border, #292627);
    box-shadow: 2px 4px 0px 0px #000;
    margin-bottom: 6px;
    @media screen and (max-width: 600px) {
        width: 48px;
        height: 48px;
    }
`;

const formatTime = (time) => {
  	return time < 10 ? `0${time}` : time;
};

const Countdown = ({ endDate, startDate=1 }) => {
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

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

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
            <TextStyle color={'#FEFEFE'} size={30} hsize={24}>
                {timeLeft.days}
            </TextStyle>
        </DateBox>
        <TextStyle color={'#000'} size={12}>{t('days')}</TextStyle>
      </TimeBox>
      <TimeBox>
        <TextStyle color={'#000'} size={30}>:</TextStyle>
      </TimeBox>
      <TimeBox>
        <DateBox>
            <TextStyle color={'#FEFEFE'} size={30} hsize={24}>
                {timeLeft.hours}
            </TextStyle>
        </DateBox>
        <TextStyle color={'#000'} size={12}>{t('hours')}</TextStyle>
      </TimeBox>
      <TimeBox>
        <TextStyle color={'#000'} size={30}>:</TextStyle>
      </TimeBox>
      <TimeBox>
        <DateBox>
            <TextStyle color={'#FEFEFE'} size={30} hsize={24}>
                {timeLeft.minutes}
            </TextStyle>
        </DateBox>
        <TextStyle color={'#000'} size={12}>{t('minutes')}</TextStyle>
      </TimeBox>
      <TimeBox>
        <TextStyle color={'#000'} size={30}>:</TextStyle>
      </TimeBox>
      <TimeBox>
        <DateBox>
            <TextStyle color={'#FEFEFE'} size={30} hsize={24}>
                {timeLeft.seconds}
            </TextStyle>
        </DateBox>
        <TextStyle color={'#000'} size={12}>{t('seconds')}</TextStyle>
      </TimeBox>
    </CountdownContainer>
  );
};

export default Countdown;
