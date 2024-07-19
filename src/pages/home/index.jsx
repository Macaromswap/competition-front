import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { useNetworkStore } from "../../store";
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import { getSwapTx, getSwapRank } from "../../api";
import { TextStyle } from '../../components/Text/TextCss'
import { formattedNumber, numFloor } from "../../utils/numbers.js";
import xLeft from '../../assets/img/xLeft.svg'
import xRight from '../../assets/img/xRight.svg'
import data1 from '../../assets/img/data1.svg'
import data2 from '../../assets/img/data2.svg'
import data3 from '../../assets/img/data3.svg'
import homebg from "../../assets/img/homebg.png";
import homebgH5 from "../../assets/img/homebgH5.png";
import tokenImg2 from "../../assets/img/tokenImg2.png";
import tokenImg2h5 from "../../assets/img/tokenImg2h5.png";
import activityList from "../../assets/json/activity.json";
import Menu from '../../components/Menu'
import PageBottom from "../../components/PageBottom";
import GaugeMini from "../../components/GaugeMini";
import CountdownMini from "../../components/CountdownMini";
import { Skeleton } from "../../components/Skeleton";

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
        background-image: url(${homebgH5});
        background-position-y: 120px;
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
        background-image: url(${tokenImg2h5});
        background-size: 100% auto;
        padding: 40px 0 20px;
    }
`
const Title = styled.div`
    text-align: center;
    @media screen and (max-width: 690px) {
        margin-bottom: 12px;
    }
`

const LeftimgIcon = styled.img`
    position: absolute;
    bottom: 50%;
    left: -16px;
    transform: translateY(50%);
    @media screen and (max-width: 690px) {
        height: 80px;
        position: relative;
        transform: none;
        bottom: 0;
        left: 0;
    }
`
const RightimgIcon = styled.img`
    position: absolute;
    bottom: 50%;
    right: 0;
    transform: translateY(50%);
    @media screen and (max-width: 690px) {
        height: 80px;
        transform: none;
        bottom: 24px;
    }
`
const DataBox = styled.div`
    display: flex;
    gap: 30px;
    flex-wrap: wrap;
    @media screen and (max-width: 690px) {
        gap: 16px;
    }
`
const DataStyle = styled.div`
    min-width: 300px;
    flex: 1;
    display: flex;
    padding: 20px 30px;
    justify-content: space-between;
    align-items: center;
    border-radius: 20px;
    border: 2px solid var(--Text-heading, #000);
    background: #FFF;
    box-shadow: 4px 4px 0px 0px #000;
    box-sizing: border-box;
    @media screen and (max-width: 690px) {
        min-width: 100%;
        padding: 12px 20px;
    }
`
const DataImg = styled.img`
    width: ${(props) => props.w + 'px'};
    height: ${(props) => props.h + 'px'};
    border-radius: 9999px;
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
    @media screen and (max-width: 690px) {
        width: 100%;
        justify-content: space-between;
    }
`
const CalendarBox = styled.div`
    text-wrap: nowrap;
    text-align: center;
    @media screen and (max-width: 600px) {
        position: absolute;
        top: 19%;
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
    cursor: pointer;
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
    align-items: stretch;
    justify-content: space-between;
    flex-wrap: wrap;
`
const Ended = styled(Border)`
    width: 48.5%;
    margin-bottom:30px;
    cursor: pointer;
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
    const navigate = useNavigate();
    const { activeNetwork, userAddress } = useNetworkStore()
    const [coming, setComing] = useState([]);
    const [ongoing, setOngoing] = useState([]);
    const [ended, setEnded] = useState([]);
    const [user, setUser] = useState(0);
    
    const getTx = async ({time, address, number}) => {
        const params = {
            start_time: time[0],
            end_time: time[1],
            limit: 1,
            pair_address: address
        };
        const res = await getSwapTx(activeNetwork, params);
        if (res.code === 1) {
            const {total} = res.data;
            const txtotal = total || 0;
            const num = Number(number.replace(/,/g, ''))
            const perc = txtotal / num * 100;
            return {perc, total: txtotal};
        }
    };
    
    const getVol = async ({time, address, number}) => {
        const params = {
            start_time: time[0],
            end_time: time[1],
            limit: 1,
            pair_address: address
        };
        const res = await getSwapRank(activeNetwork, params);
        if (res.code === 1) {
            const {total} = res.data;
            const voltotal = total || 0;
            const num = Number(number.replace(/,/g, ''))
            const perc = voltotal / num * 100;
            return {perc, total:voltotal};
        }
    };
    
    const handleList = async (data) => {
        const promises = data.map(async item => {
            const detailsPromises = item.details.map(async det => {
                if(det.value === null) {
                    const param = {
                        time: item.cycle,
                        address: item.pair_address,
                        number: det.number
                    };
                    let result;
                    if (det.type === 1) {
                        result = await getTx(param);
                    } else {
                        result = await getVol(param);
                    }
                    if (result) {
                        det.value = numFloor(result.total);
                        det.percen = result.perc;
                    }
                }
                return det;
            });
            item.details = await Promise.all(detailsPromises);
            return item;
        });
    
        const updatedData = await Promise.all(promises);
        setOngoing(updatedData);
    };

    useEffect(() => {
        let comList = []
        let ongoList = []
        let endList = []
        const date = new Date();

        activityList.forEach(item => {
            const startDate = new Date(item.cycle[0]);
            const endDate = new Date(item.cycle[1]);
            console.log(item.name, date, startDate, endDate);

            if (startDate > date) {
                comList.push(item);
            } else if (startDate < date && endDate > date) {
                ongoList.push(item);
            } else {
                endList.push(item);
            }
        });
        
        setComing(comList)
        setEnded(endList)
        handleList(ongoList)
        const timer = setInterval(() => {
            handleList(ongoList);
        }, 60000);

        return () => clearInterval(timer);
    }, [activityList]);

    useEffect(() => {
        const fetchData = async () => {
            const param = {
                start_time: 1717502400000,
                end_time: 1717847940000,
                limit: 1
            };
            try {
                const res = await getSwapTx(activeNetwork, param);
                if (res.code === 1) {
                    const { user_count } = res.data;
                    setUser(user_count);
                }
            } catch (error) {
                console.error("Failed to fetch data", error);
            }
        };

        fetchData();
    }, [activeNetwork]);

    const toRoute = (route) => {
        navigate(route)
    }
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
                            <DataImg src={data1} w={48} h={48} hw={44} hh={44} />
                            <div style={{textAlign: "right"}}>
                                <TextStyle size={16} hsize={14} color={'#E27625'}>{t('funded_project')}</TextStyle>
                                <TextStyle size={24} hsize={16} color={'#000'}>3</TextStyle>
                            </div>
                        </DataStyle>
                        <DataStyle>
                            <DataImg src={data2} w={48} h={48} hw={44} hh={44} />
                            <div style={{textAlign: "right"}}>
                                <TextStyle size={16} hsize={14} color={'#E27625'}>{t('total_reward')}</TextStyle>
                                <TextStyle size={24} hsize={16} color={'#000'}>$ 190,000</TextStyle>
                            </div>
                        </DataStyle>
                        <DataStyle>
                            <DataImg src={data3} w={48} h={48} hw={44} hh={44} />
                            <div style={{textAlign: "right"}}>
                                <TextStyle size={16} hsize={14} color={'#E27625'}>{t('trading_vol')}</TextStyle>
                                <TextStyle size={24} hsize={16} color={'#000'}>{numFloor(user)}</TextStyle>
                            </div>
                        </DataStyle>
                    </DataBox>
                    { coming.length &&
                        <>
                            <TextCss>
                                <TextStyle size={48} hsize={36} color={'#24282B'}>{t('coming_soon')}</TextStyle>
                            </TextCss>
                            <FlexGap gap={30} hgap={20}>
                                { coming.map((row, key) => (
                                    <Coming key={key}>
                                        <ComingIn>
                                            <TextStyle size={18} hsize={14} color={'#E27625'}>{t(row.describe)}</TextStyle>
                                            <FlexGap gap={20} hgap={26}>
                                                <ProjectName>
                                                    <DataImg src={row.image} w={60} h={60} hw={43} hh={43} />
                                                    <TextStyle size={36} hsize={20} color={'#000'}>{row.name}</TextStyle>
                                                </ProjectName>
                                                <FlexGap gap={30} hgap={24}>
                                                    { row.details.map((item, itemkey) => (
                                                        <FlexGap gap={14} hgap={14}>
                                                            <GaugeMini percentage={0} />
                                                            <RightWidth>
                                                                <TextStyle size={14} color={'#6A6969'}>{t(item.title)}</TextStyle>
                                                                <TextStyle size={16} color={'#24282B'}>{item.number}</TextStyle>
                                                            </RightWidth>
                                                        </FlexGap>
                                                    ))
                                                    }
                                                </FlexGap>
                                            </FlexGap>
                                        </ComingIn>
                                        <CalendarBox>
                                            <Calendar>
                                                <Month>
                                                    <TextStyle size={16} hsize={14} color={'#FEFEFE'}>{t(row.month)}</TextStyle>
                                                </Month>
                                                <Day>
                                                    <TextStyle size={36} hsize={24} color={'#6A6969'}>{row.day}</TextStyle>
                                                </Day>
                                            </Calendar>
                                            <TextStyle size={16} hsize={12} color={'#6A6969'}>{row.time}</TextStyle>
                                        </CalendarBox>
                                    </Coming>
                                ))
                                }
                            </FlexGap>
                        </>
                    }
                    { ongoing.length>0 &&
                        <>
                            <TextCss>
                                <TextStyle size={48} hsize={36} color={'#24282B'}>{t('ongoing')}</TextStyle>
                            </TextCss>
                            <FlexGap gap={30} hgap={20}>
                                { ongoing.map((row, key) => (
                                    <Ongoing onClick={() => toRoute(row.route)}>
                                        <TextStyle size={18} hsize={14} color={'#E27625'}>{t(row.describe)}</TextStyle>
                                        <OngoingIn>
                                            <ProjectNameTime>
                                                <FlexGap gap={12} hgap={8}>
                                                    <DataImg src={row.image} w={60} h={60} hw={43} hh={43} />
                                                    <TextStyle size={36} hsize={20} color={'#000'}>{row.name}</TextStyle>
                                                </FlexGap>
                                                <CountdownMini endDate={row.end} startDate={row.start}/>
                                            </ProjectNameTime>
                                            <FlexGap gap={40} hgap={24}>
                                                {row.details.map((item, itemkey) => (
                                                    <FlexGap gap={14} hgap={14} key={itemkey}>
                                                        <GaugeMini percentage={item.percen} color={item.color} />
                                                        <RightWidth>
                                                            <TextStyle size={14} color={'#6A6969'}>{t(item.title)}</TextStyle>
                                                            <FlexGap gap={0} hgap={0}>
                                                                <TextStyle size={16} color={'#24282B'}>{item.type === 1? item.value: `$ ${item.value}`}</TextStyle>
                                                                {
                                                                    item.type === 1?
                                                                    <TextStyle size={16} color={'#999'}>{item.number? `/${item.number}`: '' }</TextStyle>
                                                                    :
                                                                    <TextStyle size={16} color={'#999'}>{item.number? `/$${item.number}`: '' }</TextStyle>
                                                                }
                                                            </FlexGap>
                                                        </RightWidth>
                                                    </FlexGap>
                                                ))}
                                            </FlexGap>
                                        </OngoingIn>
                                    </Ongoing>
                                ))}
                            </FlexGap>
                        </>
                    }
                    { ended.length > 0 &&
                        <>
                            <TextCss>
                                <TextStyle size={48} hsize={36} color={'#24282B'}>{t('ended')}</TextStyle>
                            </TextCss>
                            <EndList>
                                {ended.map((row, index) => (
                                    <Ended key={index} onClick={() => toRoute(row.route)}>
                                        <EndedIn>
                                            <ProjectName>
                                                <LogoImg src={row.image} w={60} h={60} hw={43} hh={43} />
                                                <TextStyle size={36} hsize={20} color={'#000'}>{row.name}</TextStyle>
                                            </ProjectName>
                                            <EndedBtn>
                                                <TextStyle size={16} color={'#000'}>{t('end_in')}{t(row.monthEnd)} {row.dayEnd}</TextStyle>
                                            </EndedBtn>
                                        </EndedIn>
                                        <TextBott>
                                            <TextStyle size={14} color={'#E27625'}>{t(row.describe)}</TextStyle>
                                        </TextBott>
                                        <FlexGap gap={30} hgap={24}>
                                            {row.details.map((item, itemkey) => (
                                                <FlexGap gap={14} hgap={14} key={itemkey}>
                                                    <GaugeMini percentage={item.percen} color={item.color} />
                                                    <div>
                                                        <TextStyle size={14} color={'#6A6969'}>{t(item.title)}</TextStyle>
                                                        <FlexGap gap={0} hgap={0}>
                                                            {
                                                                item.type === 1?
                                                                <>
                                                                    <TextStyle size={16} color={'#24282B'}>{item.value? item.value : <Skeleton width={60} height={16} />}</TextStyle>
                                                                    <TextStyle size={16} color={'#999'}>{item.number? `/${item.number}`: '' }</TextStyle>   
                                                                </>
                                                                :
                                                                <>
                                                                    <TextStyle size={16} color={'#24282B'}>{item.value? `$ ${item.value}`: <Skeleton width={60} height={16} />}</TextStyle>
                                                                    <TextStyle size={16} color={'#999'}>{item.number? `/$${item.number}`: '' }</TextStyle>
                                                                </>
                                                            }
                                                        </FlexGap>
                                                    </div>
                                                </FlexGap>
                                            ))}
                                        </FlexGap>
                                    </Ended>
                                ))}
                            </EndList>
                        </>
                    }
                </Wrapper>
            </PageWidth>
            <PageBottom />
        </PageBg>
    )
}

export default Home