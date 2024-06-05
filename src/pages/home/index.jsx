import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import TableRank from "../../components/TableRank";
import TableTxRank from "../../components/TableTxRank";
import Tabs from "../../components/Tabs";
import { getSwapRank, getSwapTx } from "../../api";
import { useNetworkStore } from "../../store";
import { formatTime } from "../../utils/date";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { TextStyle } from '../../components/Text/TextCss'
import { ReactComponent as LeftimgIcon } from '../../assets/img/leftimg.svg'
import { ReactComponent as RightimgIcon } from '../../assets/img/right.svg'
import { ReactComponent as ImgIcon } from '../../assets/img/group.svg'
import staricon from "../../assets/img/staricon.png";
import question from "../../assets/img/question.png";
import telegram from "../../assets/img/telegram.png";
import { formattedNumber } from "../../utils/numbers.js";
import LeftTooltip from "../../components/LeftTooltip";
import RightTooltip from "../../components/RightTooltip";
import Gauge from "../../components/Gauge";
import PopUp from "../../components/PopUp";
import Countdown from "../../components/Countdown";
import { toMacaronRoute, goLink } from "../../utils";

const Wrapper = styled.div`
`
const Title = styled.div`
    text-align: center;
    margin-bottom: 36px;
    @media screen and (max-width: 690px) {
        text-align: left;
    }
    div{
        &:nth-child(1) {
            margin-bottom: 10px;
        }
    }
`
const TableBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    min-width: 980px;
    @media screen and (max-width: 690px) {
        min-width: auto;
    }
`
const LeftTable = styled.div`
    width: 580px;
    @media screen and (max-width: 690px) {
        width: 100%;
        &.open {
            display: block;
        }
        &.close {
            display: none;
        }
    }
`
const RightTable = styled.div`
    width: 580px;
    @media screen and (max-width: 690px) {
        width: 100%;
        &.open {
            display: block;
        }
        &.close {
            display: none;
        }
    }
`
const FlexStyle = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-bottom: 29px;
    @media screen and (max-width: 600px) {
        margin-bottom: 24px;
    }
`
const BtnStyle = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    @media screen and (max-width: 600px) {
        display: none;
    }
`
const BtnStyleH5 = styled.div`
    display: none;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    margin-bottom: 10px;
    @media screen and (max-width: 600px) {
        display: flex;
    }
`
const SwapNow = styled.div`
    display: flex;
    height: 60px;
    padding: 0px 80px;
    justify-content: center;
    align-items: center;
    border-radius: 44px;
    border: 2px solid var(--Black, #24282B);
    background: #FFDADC;
    box-shadow: 4px 4px 0px 0px #000;
    cursor: pointer;
    &:hover {
        background: #FFDB58;
    }
    @media screen and (max-width: 690px) {
        height: 50px;
        padding: 0px 50px;
    }
`
const Rules = styled.div`
    text-decoration-line: underline;
    cursor: pointer;
`
const FelxTextStyle = styled.div`
    display: flex;
    align-items: baseline;
    margin-bottom: 12px;
    gap: 6px;
    @media screen and (max-width: 690px) {
        justify-content: center;
        flex-wrap: wrap;
    }
`
const FelxText = styled.div`
    display: flex;
    align-items: baseline;
    gap: 10px;
`
const AnalysisBox = styled.div`
    display: flex;
    padding: 20px 18px;
    align-items: center;
    gap: 48px;
    border: 2px solid var(--Black, #24282B);
    background: #FFF;
    height: 140px;
    box-sizing: border-box;
    margin-bottom: 20px;
    justify-content: center;
    @media screen and (max-width: 1000px) {
        border-radius: 14px;
        border: 2px solid var(--Black, #0B0F17);
        background: #FFF;
        box-shadow: 4px 4px 0px 0px #000;
    }
    @media screen and (max-width: 690px) {
        padding: 24px 0px;
        gap: 30px;
        height: auto;
    }
`
const FlexColumn = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2px;
`

const FlexVolume = styled.div`
    display: flex;
    align-items: center;
    @media screen and (max-width: 690px) {
        align-items: flex-start;
        flex-direction: column;
        img {
            display: none;
        }
    }
`
const ImgStar = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 5px;
`
const ImgIconWidth = styled(ImgIcon)`
    @media screen and (max-width: 690px) {
        width: 103px;
    }
`
const Image = styled.img`
    width: 20px;
    height: 20px;
    display: none;
    @media screen and (max-width: 690px) {
        display: block;
    }
`;
const BtnTg = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    @media screen and (max-width: 690px) {
        gap: 12px;
    }
`
const TgImg = styled.img`
    width: 48px;
    height: 48px;
    cursor: pointer;
    border-radius: 50px;
`

function Home() {
    const { t, i18n } = useTranslation();
    const { activeNetwork, userAddress } = useNetworkStore()
    const [rankData, setRankData] = useState([])
    const [rankTotal, setRankTotal] = useState(0)
    const [rankCurrent, setRankCurrent] = useState({})
    const [txData, setTxData] = useState([])
    const [txTotal, setTxTotal] = useState(0)
    const [txCurrent, setTxCurrent] = useState({})
    const [ percent, setPercent ] = useState(0.00);
    const [ activeTab, setActiveTab ] = useState(1);
    const targetDate = '2024-06-08 07:59:00'
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState(1);

    const tabItems = [
        { label: t('trans_number'), index: 1 },
        { label: t('tr_vol'), index: 2 },
    ]
    const handleTabClick = (index) => {
        setActiveTab(index);
    }
    const allList = (params) => {
        getSwapRank(activeNetwork, params).then((res) => {
            const {list, total, current} = res.data
            setRankData(list)
            const swaptotal = total || 0
            setRankTotal(swaptotal)
            setRankCurrent(current)
        })
        getSwapTx(activeNetwork, params).then(res => {
            const {list, total, current} = res.data
            setTxData(list)
            const txtotal = total || 0
            const perc = txtotal / 100000 * 100
            setPercent(perc)
            setTxTotal(txtotal)
            setTxCurrent(current)
        })
    }
    useEffect(() => {
        const params = {
            start_time: 1717502400000,
            end_time: 1717804740000,
            limit: 70,
        }
        if(userAddress){
            params.wallet_address= userAddress
        }
        allList(params)
        const timer = setInterval(() => {
            allList(params)
        }, 6000);
      
        return () => clearInterval(timer);
    }, [userAddress]);
    const openModal = (type) => {
        setType(type)
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }
    const toSwapNow = () => {
        const route = `/swap?inputCurrency=BTC&outputCurrency=0x2729868df87d062020e4a4867ff507fb52ee697c`
        toMacaronRoute(route)
    }
    return(
        <Wrapper>
            <Title>
                <TextStyle size={56} hsize={34} color={'#24282B'}>
                    <span className={'yellow'}>CBD</span> {t('trading_competition')}
                </TextStyle>
                <TextStyle size={20} hsize={14} color={'#24282B'}>
                    {t('trade_to_split')} [
                        <span className={'orange'}> $50,000 BTC</span> + 
                        <span className={'orange'}> 100,000,000CBD</span> + 
                        <span className={'orange'}> 50,000veMACA </span> 
                    ] 
                </TextStyle>
            </Title>
            <BtnStyleH5>
                <Countdown endDate={targetDate} />
                <BtnTg>
                    <SwapNow onClick={toSwapNow}>
                        <TextStyle size={20} color={'#24282B'}>{t('swap_now')}</TextStyle>
                    </SwapNow>
                    <TgImg src={telegram} onClick={() => goLink('tgLink')} />
                </BtnTg>
                <Rules onClick={() => openModal(1)}>
                    <TextStyle size={14} color={'#6A6969'}>{t('view_rules')}</TextStyle>
                </Rules>
            </BtnStyleH5>
            <FlexStyle>
                <LeftimgIcon />
                <BtnStyle>
                    <Countdown endDate={targetDate} />
                    <BtnTg>
                        <SwapNow onClick={toSwapNow}>
                            <TextStyle size={20} color={'#24282B'}>{t('swap_now')}</TextStyle>
                        </SwapNow>
                        <TgImg src={telegram} onClick={() => goLink('tgLink')} />
                    </BtnTg>
                    <Rules onClick={() => openModal(1)}>
                        <TextStyle size={14} color={'#6A6969'}>{t('view_rules')}</TextStyle>
                    </Rules>
                </BtnStyle>
                <RightimgIcon />
            </FlexStyle>
            <PopUp open={isOpen} closeModal={closeModal} type={type}/>
            <Tabs activeTab={activeTab} onTabClick={handleTabClick} tabItems={tabItems} />
            <TableBox>
                <LeftTable className={activeTab === 1? 'open':'close'}>
                    <FelxTextStyle>
                        <TextStyle size={20} hsize={16} color={'#24282B'}>{t('reach')}</TextStyle>
                        <TextStyle size={36} hsize={24} color={'#E27625'}>$50000</TextStyle>
                        <TextStyle size={20} hsize={16} color={'#24282B'}>{t('dajiang')}</TextStyle>
                        <LeftTooltip />
                        <Image src={question}  onClick={() => openModal(2)}/>
                    </FelxTextStyle>
                    <AnalysisBox>
                        <Gauge percentage={percent} />
                        <FlexColumn>
                            <TextStyle size={18} hsize={16} color={'#000'}>{t('tx_number')}</TextStyle>
                            <FelxText>
                                <TextStyle size={36} hsize={24} color={'#000'}>{formattedNumber(txTotal)} /</TextStyle>
                                <TextStyle size={20} hsize={16} color={'#6A6969'}>100,000</TextStyle>
                            </FelxText>
                            <FlexVolume>
                                <ImgStar src={staricon} />
                                <TextStyle size={18} hsize={16} color={'#000'}>{t('your_txs')}：</TextStyle>
                                <TextStyle size={18} hsize={16} color={'#2C9F22'}>{formattedNumber(txCurrent?.swap_count || 0, 0)}</TextStyle>
                            </FlexVolume>
                        </FlexColumn>
                    </AnalysisBox>
                    <TableTxRank data={txData}></TableTxRank>
                </LeftTable>
                <RightTable className={activeTab === 2? 'open':'close'}>
                    <FelxTextStyle>
                        <TextStyle size={20} hsize={16} color={'#24282B'}>{t('prize')}</TextStyle>
                        <TextStyle size={36} hsize={24} color={'#E27625'}>CBD+VeMACAs</TextStyle>
                        <TextStyle size={20} hsize={16} color={'#24282B'}>{t('jiangli')}</TextStyle>
                        <RightTooltip/>
                        <Image src={question}  onClick={() => openModal(3)}/>
                    </FelxTextStyle>
                    <AnalysisBox>
                        <ImgIconWidth />
                        <FlexColumn>
                            <TextStyle size={18} hsize={16} color={'#000'}>{t('trading_volume')}</TextStyle>
                            <TextStyle size={36} hsize={24} color={'#24282B'}>$ {formattedNumber(rankTotal)}</TextStyle>
                            <FlexVolume>
                                <ImgStar src={staricon} />
                                <TextStyle size={18} hsize={16} color={'#000'}>{t('your_volume')}：</TextStyle>
                                <TextStyle size={18} hsize={16} color={'#2C9F22'}>{`$ ${formattedNumber(rankCurrent?.swap_amount || 0)}`}</TextStyle>
                            </FlexVolume>
                        </FlexColumn>
                    </AnalysisBox>
                    <TableRank data={rankData}></TableRank>
                </RightTable>
            </TableBox>
        </Wrapper>
    )
}

export default Home