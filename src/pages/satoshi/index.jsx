import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import TablePointsRank from "../../components/TablePointsRank";
import TableTxRank from "../../components/TableTxRank";
import Tabs from "../../components/Tabs";
import { getSwapTx, getTvlRank } from "../../api";
import { useNetworkStore } from "../../store";
import { formatTime } from "../../utils/date";
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { TextStyle } from '../../components/Text/TextCss'
import satLeft from '../../assets/img/satLeft.svg'
import satRight from '../../assets/img/satRight.svg'
import staricon from "../../assets/img/staricon.png";
import question from "../../assets/img/question.png";
import telegram from "../../assets/img/telegram.png";
import satBackgroundImg from "../../assets/img/satBackgroundImg.png";
import satBackgroundImgH5 from "../../assets/img/satBackgroundImgH5.png";
import tokenImg from "../../assets/img/tokenImg.png";
import tokenImgh5 from "../../assets/img/tokenImgh5.png";
import banner1 from "../../assets/img/banner1.png";
import banner2 from "../../assets/img/banner2.png";
import banner1h5 from "../../assets/img/banner1h5.png";
import banner2h5 from "../../assets/img/banner2h5.png";
import banner1Left from "../../assets/img/banner1Left.png";
import banner1Right from "../../assets/img/banner1Right.png";
import banner2Left from "../../assets/img/banner2Left.png";
import banner2Right from "../../assets/img/banner2Right.png";
import { formattedNumber, numFloor } from "../../utils/numbers.js";
import { satStartCountdown, satEndCountdown, satTime } from "../../utils/activity.js";
import LeftTooltip from "./components/LeftTooltip";
import RightTooltip from "./components/RightTooltip";
import Gauge from "../../components/Gauge";
import PopUp from "../../components/SatPopUp";
import Countdown from "../../components/Countdown";
import { toMacaronRoute, goLink } from "../../utils";
import Menu from '../../components/Menu'
import PageBottom from "../../components/PageBottom";

const PageBg = styled.div`
    height: 100%;
    background: #F3FFCF;
    background-image: url(${satBackgroundImg});
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
    padding: 48px 0 60px;
    @media screen and (max-width: 860px) {
        padding: 40px 0 76px;
    }
`
const MiddlePart = styled.div`
    background-image: url(${tokenImg});
    background-size: auto 92%;
    background-position: top center;
    background-repeat: no-repeat;
    position: relative;
    @media screen and (max-width: 690px) {
        background-image: url(${tokenImgh5});
        background-size: 100% auto;
        margin-bottom: 10px;
    }
`
const Title = styled.div`
    text-align: center;
    margin-bottom:44px;
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
`
const LeftTable = styled.div`
    width: 580px;
    @media screen and (max-width: 900px) {
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
    @media screen and (max-width: 900px) {
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
    position: relative;
    z-index: 9;
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
    gap: 6px;
    flex-wrap: nowrap;
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
        gap: 16px;
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
        flex-direction: column;
        align-items: flex-start;
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
const LeftimgIcon = styled.img`
    position: absolute;
    bottom: 0;
    left: -16px;
    @media screen and (max-width: 690px) {
        display: none;
    }
`
const RightimgIcon = styled.img`
    position: absolute;
    bottom: 0;
    right: -26px;
    @media screen and (max-width: 690px) {
        display: none;
    }
`
const BannerBox = styled.div`
    display: flex;
    justify-content: space-between;
    gap: 20px;
    margin: 18px 0 42px;
    @media screen and (max-width: 790px) {
        flex-direction: column;
        margin: 30px 0 50px;
    }
`
const Banners = styled.div`
    width: 580px;
    height: 100px;
    background-color: #24282B;
    background-size: auto 100%;
    background-position: center center;
    background-repeat: no-repeat;
    border-radius: 20px;
    border: 4px solid #FFDB58;
    box-shadow: 4px 4px 0px 0px #000;
    box-sizing: border-box;
    position: relative;
    cursor: pointer;
    @media screen and (max-width: 790px) {
        width: 100%;
        height: 80px;
    }
`
const LeftBanner = styled(Banners)`
     background-image: url(${banner1});
     @media screen and (max-width: 690px) {
        background-image: url(${banner1h5});
    }
`
const RightBanner = styled(Banners)`
     background-image: url(${banner2});
     @media screen and (max-width: 690px) {
        background-image: url(${banner2h5});
    }
`
const BannerText = styled.div`
    padding-top: 12px;
    text-align: center;
    position: relative;
    z-index: 99;
    text-wrap: nowrap;
`
const IconPositionLeft = styled.img`
    height: 100%;
    position: absolute;
    left: 6px;
    top: 0;
`
const IconPositionRight = styled.img`
    height: 100%;
    position: absolute;
    right: 6px;
    top: 0;
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
    const [ pointsPercent, setPointsPercent ] = useState(0.00);
    const [ activeTab, setActiveTab ] = useState(1);
    const [isOpen, setIsOpen] = useState(false);
    const [type, setType] = useState(1);

    const tabItems = [
        { label: t('trans_number'), index: 1 },
        { label: t('add_liquidity'), index: 2 },
    ]
    const handleTabClick = (index) => {
        setActiveTab(index);
    }
    const allList = (txParams, tvlParams) => {
        getTvlRank(activeNetwork, tvlParams).then((res) => {
            if (res.code === 1) {
                const {list, total_points, current} = res.data
                setRankData(list)
                const total = total_points || 0
                const pointPerc = total / 2000000 * 100
                setPointsPercent(pointPerc)
                setRankTotal(total)
                setRankCurrent(current)
            }
        })
        getSwapTx(activeNetwork, txParams).then(res => {
            if (res.code === 1) {
                const {list, total, current} = res.data
                setTxData(list)
                const txtotal = total || 0
                const perc = txtotal / 80000 * 100
                setPercent(perc)
                setTxTotal(txtotal)
                setTxCurrent(current)
            }
        })
    }
    useEffect(() => {
        const txParams = {
            start_time: satTime[0],
            end_time: satTime[1],
            limit: 200,
            pair_address: "0x575212a8763db6bbaf67461440246546d4017707", // 0x575212a8763db6bbaf67461440246546d4017707
        }
        const tvlParams = {
            limit: 200,
            activity_name: 'p-0619',
            pair_address: "0x575212a8763db6bbaf67461440246546d4017707", // 0x575212a8763db6bbaf67461440246546d4017707
        }
        if(userAddress){
            txParams.wallet_address= userAddress
            tvlParams.wallet_address= userAddress
        }
        allList(txParams, tvlParams)
        const timer = setInterval(() => {
            if (txParams.end_time > Date.now()) {
                allList(txParams, tvlParams)
            } else{
                clearInterval(timer)
            }
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
    const bannerLeftClick = () => {
        const route = `/swap?inputCurrency=0xa1e63cb2ce698cfd3c2ac6704813e3b870fedadf&outputCurrency=0xff204e2681a6fa0e2c3fade68a1b28fb90e4fc5f`
        toMacaronRoute(route)
    }
    const bannerRightClick = () => {
        const route = `/add/0xa1e63cb2ce698cfd3c2ac6704813e3b870fedadf/0xff204e2681a6fa0e2c3fade68a1b28fb90e4fc5f`
        toMacaronRoute(route)
    }

    return(
        <PageBg>
            <PageWidth>
                <Menu/>
                <Wrapper>
                    <MiddlePart>
                        <Title>
                            <TextStyle size={56} hsize={34} color={'#24282B'}>
                                <span className={'yellow2'}>SAT</span> {t('trading_competition')}
                            </TextStyle>
                            <TextStyle size={24} hsize={14} color={'#24282B'}>
                                {t('trade_to_split')} [
                                    <span className={'orange'}> $60,000 USDT </span>
                                ] 
                            </TextStyle>
                        </Title>
                        <BtnStyle>
                            <Countdown endDate={satEndCountdown} startDate={satStartCountdown}/>
                            <BtnTg>
                                <SwapNow onClick={() => goLink('getSat')}>
                                    <TextStyle size={20} color={'#24282B'}>{t('get_sat')}</TextStyle>
                                </SwapNow>
                                <TgImg src={telegram} onClick={() => goLink('tgLink')} />
                            </BtnTg>
                            <Rules onClick={() => openModal(1)}>
                                <TextStyle size={14} color={'#6A6969'}>{t('view_rules')}</TextStyle>
                            </Rules>
                        </BtnStyle>
                        <LeftimgIcon src={satLeft} />
                        <RightimgIcon src={satRight} />
                    </MiddlePart>
                    <PopUp open={isOpen} closeModal={closeModal} type={type}/>
                    <BannerBox>
                        <LeftBanner onClick={bannerLeftClick}>
                            <IconPositionLeft src={banner1Left} />
                            <BannerText>
                                <TextStyle size={32} hsize={18} color={'#FEFEFE'}>{t('swap_sat')}</TextStyle>
                            </BannerText>
                            <IconPositionRight src={banner1Right} />
                        </LeftBanner>
                        <RightBanner onClick={bannerRightClick}>
                            <IconPositionLeft src={banner2Left} />
                            <BannerText>
                                <TextStyle size={32} hsize={18} color={'#FEFEFE'}>{t('add_sat')}</TextStyle>
                            </BannerText>
                            <IconPositionRight src={banner2Right} />
                        </RightBanner>
                    </BannerBox>
                    <Tabs activeTab={activeTab} onTabClick={handleTabClick} tabItems={tabItems} />
                    <TableBox>
                        <LeftTable className={activeTab === 1? 'open':'close'}>
                            <FelxTextStyle>
                                <TextStyle size={20} hsize={16} color={'#24282B'}>{t('reach')}</TextStyle>
                                <TextStyle size={36} hsize={24} color={'#E27625'}>$40000</TextStyle>
                                <TextStyle size={20} hsize={16} color={'#24282B'}>USDT</TextStyle>
                                <LeftTooltip />
                                <Image src={question}  onClick={() => openModal(2)}/>
                            </FelxTextStyle>
                            <AnalysisBox>
                                <Gauge percentage={percent} />
                                <FlexColumn>
                                    <TextStyle size={18} hsize={16} color={'#000'}>{t('tx_number')}</TextStyle>
                                    <FelxText>
                                        <TextStyle size={36} hsize={20} color={'#000'}>{formattedNumber(txTotal)}</TextStyle>
                                        <TextStyle size={36} hsize={20} color={'#000'}>/</TextStyle>
                                        <TextStyle size={20} hsize={15} color={'#6A6969'}>80,000</TextStyle>
                                    </FelxText>
                                    <FlexVolume>
                                        <ImgStar src={staricon} />
                                        <TextStyle size={18} hsize={16} color={'#000'}>{t('your_txs')}：</TextStyle>
                                        <TextStyle size={18} hsize={16} color={'#2C9F22'}>{formattedNumber(txCurrent?.swap_count || 0, 0)}</TextStyle>
                                    </FlexVolume>
                                </FlexColumn>
                            </AnalysisBox>
                            <TableTxRank data={txData} meData={txCurrent}></TableTxRank>
                        </LeftTable>
                        <RightTable className={activeTab === 2? 'open':'close'}>
                            <FelxTextStyle>
                                <TextStyle size={20} hsize={16} color={'#24282B'}>{t('sat-split')}</TextStyle>
                                <TextStyle size={36} hsize={24} color={'#E27625'}>$20000</TextStyle>
                                <TextStyle size={20} hsize={16} color={'#24282B'}>USDT</TextStyle>
                                <RightTooltip/>
                                <Image src={question}  onClick={() => openModal(3)}/>
                            </FelxTextStyle>
                            <AnalysisBox>
                                <Gauge percentage={pointsPercent} color={'#FFCC14'}/>
                                <FlexColumn>
                                    <TextStyle size={18} hsize={16} color={'#000'}>{t('accumulated')}</TextStyle>
                                    <FelxText>
                                        <TextStyle size={36} hsize={20} color={'#24282B'}>{numFloor(rankTotal)}</TextStyle>
                                        <TextStyle size={36} hsize={20} color={'#24282B'}>/</TextStyle>
                                        <TextStyle size={20} hsize={15} color={'#6A6969'}>2,000,000</TextStyle>
                                    </FelxText>
                                    <FlexVolume>
                                        <ImgStar src={staricon} />
                                        <TextStyle size={18} hsize={16} color={'#000'}>{t('your_points')}：</TextStyle>
                                        <TextStyle size={18} hsize={16} color={'#2C9F22'}>{numFloor(rankCurrent?.points || 0)}</TextStyle>
                                    </FlexVolume>
                                </FlexColumn>
                            </AnalysisBox>
                            <TablePointsRank data={rankData} meData={rankCurrent} volName={'tvl_added'}></TablePointsRank>
                        </RightTable>
                    </TableBox>
                </Wrapper>
            </PageWidth>
            <PageBottom />
        </PageBg>
    )
}

export default Home