import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useNetworkStore } from "../../store";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { TextStyle } from '../../components/Text/TextCss'
import xLeft from '../../assets/img/xLeft.svg'
import xRight from '../../assets/img/xRight.svg'
import data1 from '../../assets/img/data1.svg'
import data2 from '../../assets/img/data2.svg'
import data3 from '../../assets/img/data3.svg'
import homebg from "../../assets/img/homebg.png";
import satBackgroundImgH5 from "../../assets/img/satBackgroundImgH5.png";
import tokenImg2 from "../../assets/img/tokenImg2.png";
import tokenImgh5 from "../../assets/img/tokenImgh5.png";
import Menu from '../../components/Menu'
import PageBottom from "../../components/PageBottom";
import GaugeMini from "../../components/GaugeMini";
import CountdownMini from "../../components/CountdownMini";

const PageBg = styled.div`
    height: 100%;
    background: #F3FFCF;
    background-image: url(${homebg});
    background-position: top center;
    background-size: 100% auto;
    background-repeat: no-repeat;
    object-fit: contain;
    overflow-y: auto;
    overflow-x: hidden;
    @media screen and (max-width: 600px) {
        background-image: url(${satBackgroundImgH5});
        background-position: bottom left;
        background-size: 100% auto;
    }
`
const PageWidth = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0px 16px;
`
const Wrapper = styled.div`
    padding: 0px 0 70px;
    @media screen and (max-width: 860px) {
        padding: 0px 0 26px;
    }
`
const MiddlePart = styled.div`
    background-image: url(${tokenImg2});
    background-size: 60% 100%;
    background-position: top center;
    background-repeat: no-repeat;
    position: relative;
    padding: 90px 0 116px;
    @media screen and (max-width: 690px) {
        background-image: url(${tokenImgh5});
        background-size: 100% auto;
        margin-bottom: 10px;
        padding: 40px 0 32px;
    }
`
const Title = styled.div`
    text-align: center;
    @media screen and (max-width: 690px) {
        text-align: left;
    }
`

const LeftimgIcon = styled.img`
    position: absolute;
    bottom: 50%;
    left: -16px;
    transform: translateY(50%);
    @media screen and (max-width: 690px) {
        display: none;
    }
`
const RightimgIcon = styled.img`
    position: absolute;
    bottom: 50%;
    right: 0;
    transform: translateY(50%);
    @media screen and (max-width: 690px) {
        display: none;
    }
`
const DataBox = styled.div`
    display: flex;
    gap: 30px;
`
const DataStyle = styled.div`
    flex: 1;
    display: flex;
    padding: 20px 30px;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    border: 2px solid var(--Text-heading, #000);
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
`
const DataImg = styled.img`
    width: ${(props) => props.w + 'px'};
    height: ${(props) => props.h + 'px'};
    @media screen and (max-width: 600px) {
        width: ${(props) => props.hw + 'px'};
        height: ${(props) => props.hh + 'px'};
    }
`
const LogoImg = styled(DataImg)`
    padding: 5px;
`
const TextCss = styled.div`
    margin-bottom:  24px;
    margin-top: 70px;
    @media screen and (max-width: 600px) {
        margin-top: 40px;
        margin-bottom:  20px;
    }
`
const Border = styled.div`
    border-radius: 20px;
    border: 2px solid var(--Text-heading, #000);
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
    box-sizing: border-box;
    padding: 20px 30px;
    @media screen and (max-width: 600px) {
        padding: 16px 20px 20px;
    }
`
const Coming = styled(Border)`
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    align-self: stretch;
    position: relative;
`
const ComingIn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`
const FlexGap = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: ${(props) => props.gap + 'px'};
    @media screen and (max-width: 600px) {
        gap: ${(props) => props.hgap + 'px'};
    }
`
const ProjectName = styled.div`
    width: 340px;
    display: flex;
    align-items: center;
    gap: 12px;
    @media screen and (max-width: 600px) {
        width: auto;
        gap: 8px;
        padding: 16px 0;
    }
`
const ProjectNameTime = styled(ProjectName)`
    width: auto;
`
const CalendarBox = styled.div`
    text-wrap: nowrap;
    @media screen and (max-width: 600px) {
        position: absolute;
        top: 84px;
        right: 20px;
    }
`
const Calendar = styled.div`
    display: flex;
    width: 84px;
    height: 84px;
    flex-direction: column;
    margin: 0 auto;
    @media screen and (max-width: 600px) {
        width: 56px;
        height: 56px;
        margin-bottom: 4px;
    }
`
const Month = styled.div`
    width: 100%;
    display: flex;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 12px 12px 0px 0px;
    background: #E27625;
`
const Day = styled.div`
    width: 100%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 0px 0px 12px 12px;
    border: 2px solid #999;
    border-top: none;
    box-sizing: border-box;
`
const Ongoing = styled(Border)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 20px;
`
const OngoingIn = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
`
const RightWidth = styled.div`
    min-width: 190px;
    @media screen and (max-width: 600px) {
        width: auto;
    }
`
const EndList = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
`
const Ended = styled(Border)`
    width: 48.5%;
    margin-bottom:30px;
    @media screen and (max-width: 750px) {
        width: 100%;
        margin-bottom:20px;
    }
`
const EndedIn = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    @media screen and (max-width: 600px) {
        align-items: center;
    }
`
const EndedBtn = styled.div`
    padding: 5px 12px 3px;
    border-radius: 10px;
    border: 2px solid #000;
    background: #E1FA95;
    box-shadow: 2px 2px 0px 0px #000;
    text-wrap: nowrap;
`
const TextBott = styled.div`
    margin: 4px 0 30px;
    @media screen and (max-width: 600px) {
        margin: 10px 0 12px;
    }
`
    
function Home() {
    const { t, i18n } = useTranslation();
    const { activeNetwork, userAddress } = useNetworkStore()
    const qqq = 'trading_competition'

    return(
        <PageBg>
            <PageWidth>
                <Menu/>
                <Wrapper>
                    <MiddlePart>
                        <Title>
                            <TextStyle size={56} hsize={34} color={'#24282B'}>
                                {t('trading_competition')}
                            </TextStyle>
                        </Title>
                        <LeftimgIcon src={xLeft} />
                        <RightimgIcon src={xRight} />
                    </MiddlePart>
                    <DataBox>
                        <DataStyle>
                            <DataImg src={data1} w={48} h={48} hw={28} hh={28} />
                            <div style={{textAlign: "right"}}>
                                <TextStyle size={16} color={'#E27625'}>Funded Project</TextStyle>
                                <TextStyle size={24} color={'#000'}>4</TextStyle>
                            </div>
                        </DataStyle>
                        <DataStyle>
                            <DataImg src={data2} w={48} h={48} hw={28} hh={28} />
                            <div style={{textAlign: "right"}}>
                                <TextStyle size={16} color={'#E27625'}>Funded Project</TextStyle>
                                <TextStyle size={24} color={'#000'}>4</TextStyle>
                            </div>
                        </DataStyle>
                        <DataStyle>
                            <DataImg src={data3} w={48} h={48} hw={28} hh={28} />
                            <div style={{textAlign: "right"}}>
                                <TextStyle size={16} color={'#E27625'}>Funded Project</TextStyle>
                                <TextStyle size={24} color={'#000'}>4</TextStyle>
                            </div>
                        </DataStyle>
                    </DataBox>
                    <TextCss>
                        <TextStyle size={48} hsize={36} color={'#24282B'}>Coming Soon</TextStyle>
                    </TextCss>
                    <FlexGap gap={30} hgap={20}>
                        <Coming>
                            <ComingIn>
                                <TextStyle size={18} hsize={14} color={'#E27625'}>Trade CBD to Split  [$50,000 BTC + 100,000,000 CBDs + 50,000 veMACAs]</TextStyle>
                                <FlexGap gap={20} hgap={26}>
                                    <ProjectName>
                                        <DataImg src={data1} w={60} h={60} hw={43} hh={43} />
                                        <TextStyle size={36} hsize={20} color={'#000'}>CBD</TextStyle>
                                    </ProjectName>
                                    <FlexGap gap={30} hgap={24}>
                                        <FlexGap gap={14} hgap={14}>
                                            <GaugeMini percentage={0} />
                                            <RightWidth>
                                                <TextStyle size={14} color={'#6A6969'}>Real-time TX Number</TextStyle>
                                                <TextStyle size={16} color={'#24282B'}>100,000</TextStyle>
                                            </RightWidth>
                                        </FlexGap>
                                        <FlexGap gap={14} hgap={14}>
                                            <GaugeMini percentage={0} color={'#FFCC14'} />
                                            <RightWidth>
                                                <TextStyle size={14} color={'#6A6969'}>Real-time TX Number</TextStyle>
                                                <TextStyle size={16} color={'#24282B'}>100,000</TextStyle>
                                            </RightWidth>
                                        </FlexGap>
                                    </FlexGap>
                                </FlexGap>
                            </ComingIn>
                            <CalendarBox>
                                <Calendar>
                                    <Month>
                                        <TextStyle size={16} hsize={14} color={'#FEFEFE'}>JULY</TextStyle>
                                    </Month>
                                    <Day>
                                        <TextStyle size={36} hsize={24} color={'#6A6969'}>25</TextStyle>
                                    </Day>
                                </Calendar>
                                <TextStyle size={16} hsize={12} color={'#6A6969'}>16:00 UTC+8</TextStyle>
                            </CalendarBox>
                        </Coming>
                    </FlexGap>
                    <TextCss>
                        <TextStyle size={48} hsize={36} color={'#24282B'}>Ongoing</TextStyle>
                    </TextCss>
                    <FlexGap gap={30} hgap={20}>
                        <Ongoing>
                            <TextStyle size={18} hsize={14} color={'#E27625'}>Trade CBD to Split  [$50,000 BTC + 100,000,000 CBDs + 50,000 veMACAs]</TextStyle>
                            <OngoingIn>
                                <ProjectNameTime>
                                    <DataImg src={data1} w={60} h={60} hw={43} hh={43} />
                                    <TextStyle size={36} hsize={20} color={'#000'}>CBD</TextStyle>
                                    <CountdownMini endDate={'2024-07-22 20:00:00'} startDate={'2024-6-12 00:00:00'}/>
                                </ProjectNameTime>
                                <FlexGap gap={40} hgap={24}>
                                    <FlexGap gap={14} hgap={14}>
                                        <GaugeMini percentage={80} />
                                        <RightWidth>
                                            <TextStyle size={14} color={'#6A6969'}>Real-time TX Number</TextStyle>
                                            <FlexGap gap={0} hgap={0}>
                                                <TextStyle size={16} color={'#24282B'}>9,999</TextStyle>
                                                <TextStyle size={16} color={'#999'}>/100,000</TextStyle>
                                            </FlexGap>
                                        </RightWidth>
                                    </FlexGap>
                                    <FlexGap gap={14} hgap={14}>
                                        <GaugeMini percentage={100} color={'#FFCC14'} />
                                        <RightWidth>
                                            <TextStyle size={14} color={'#6A6969'}>Real-time TX Number</TextStyle>
                                            <FlexGap gap={0} hgap={0}>
                                                <TextStyle size={16} color={'#24282B'}>$ 9,999,999.99</TextStyle>
                                                <TextStyle size={16} color={'#999'}>/$2,000,000</TextStyle>
                                            </FlexGap>
                                        </RightWidth>
                                    </FlexGap>
                                </FlexGap>
                            </OngoingIn>
                        </Ongoing>
                    </FlexGap>
                    <TextCss>
                        <TextStyle size={48} hsize={36} color={'#24282B'}>Ended</TextStyle>
                    </TextCss>
                    <EndList>
                        <Ended>
                            <EndedIn>
                                <ProjectName>
                                    <LogoImg src={data1} w={60} h={60} hw={43} hh={43} />
                                    <TextStyle size={36} hsize={20} color={'#000'}>CBD</TextStyle>
                                </ProjectName>
                                <EndedBtn>
                                    <TextStyle size={16} color={'#000'}>End in June 15</TextStyle>
                                </EndedBtn>
                            </EndedIn>
                            <TextBott>
                                <TextStyle size={14} color={'#E27625'}>Trade CBD to Split  [$50,000 BTC + 100,000,000 CBDs + 50,000 veMACAs] </TextStyle>
                            </TextBott>
                            <FlexGap gap={30} hgap={24}>
                                <FlexGap gap={14} hgap={14}>
                                    <GaugeMini percentage={80} />
                                    <div>
                                        <TextStyle size={14} color={'#6A6969'}>Real-time TX Number</TextStyle>
                                        <FlexGap gap={0} hgap={0}>
                                            <TextStyle size={16} color={'#24282B'}>9,999</TextStyle>
                                            <TextStyle size={16} color={'#999'}>/100,000</TextStyle>
                                        </FlexGap>
                                    </div>
                                </FlexGap>
                                <FlexGap gap={14} hgap={14}>
                                    <GaugeMini percentage={100} color={'#FFCC14'} />
                                    <div>
                                        <TextStyle size={14} color={'#6A6969'}>Real-time TX Number</TextStyle>
                                        <FlexGap gap={0} hgap={0}>
                                            <TextStyle size={16} color={'#24282B'}>$ 9,999,999.99</TextStyle>
                                            <TextStyle size={16} color={'#999'}>/$2,000,000</TextStyle>
                                        </FlexGap>
                                    </div>
                                </FlexGap>
                            </FlexGap>
                        </Ended>
                    </EndList>
                </Wrapper>
            </PageWidth>
            <PageBottom />
        </PageBg>
    )
}

export default Home