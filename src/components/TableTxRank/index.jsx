import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { TextStyle } from '../../components/Text/TextCss';
import { Skeleton } from "../../components/Skeleton";
import staricon from "../../assets/img/staricon.png";
import { TableWrapper, PaginationWrapper, PaginationButtonBack, PaginationButton, PaginationButtonGo } from "../Table";
import { useNetworkStore } from "../../store";
import { formatTime } from "../../utils/date";
import { formattedNumber } from "../../utils/numbers";
import { useTranslation } from 'react-i18next';

const RowColumns = styled.div`
    height: 72px;
    box-sizing: border-box;
    padding: 0px 60px;
    background-color: #FFF;
    border: 2px solid #000;
    position: relative;
    z-index:999;
    cursor: pointer;
    display: grid;
    align-items: center;
    gap: 10px;
    grid-template-columns: 80px repeat(2, 1fr);
    @media screen and (max-width: 1000px) {
        height:100%;
        padding: 14px 20px;
        border:none;
    }
    @media screen and (max-width: 690px) {
        grid-template-columns: 40px repeat(2, 1fr);
    }
}
`
const HeaderRow = styled(RowColumns)`
    @media screen and (max-width: 1000px) {
        padding: 14px 20px;
    }
`
const TableRow = styled(RowColumns)`
    cursor: pointer;
    margin-top: 20px;
    @media screen and (max-width: 1000px) {
        margin-top: 0;
        border-top: 1px solid #F2F2F2;
    }
`
const TableCol = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    justify-content: center;
    overflow: hidden;
    &:nth-child(1) {
        justify-content: flex-start;
    }
    &:nth-child(2) {
        justify-content: flex-start;
    }
    &:nth-child(3) {
        justify-content: flex-end;
    }
`
const RowShadow = styled.div `
    position: relative;
    &::after {
        content: "";
        display: block;
        width: 67.3%;
        height: 20px;
        position: absolute;
        left: 16.6%;
        top: -20px;
        z-index: 9;
        background-color: #000;
        transform: skewX(-84deg);
        @media screen and (max-width: 1000px) {
            display: none;
        }
    }
`
const Text = styled(TextStyle)`
    display: flex;
    align-items: center;
    gap: 5px;
    position: relative;
`

const ArrowImg = styled.img`
    width: 14px;
    height: 14px;
    position: absolute;
    right: -22px;
    top: -2px;
    @media screen and (max-width: 600px) {
        right: -20px;
        top: 3px;
    }
`
const ImgStyle = styled.img`
    width: 23px;
    height: 23px;
    @media screen and (max-width: 600px) {
        width: 18px;
        height: 18px;
    }
`
const IndexBox = styled.div`
    padding: 0 10px;
`
const Ellipsis = styled(TextStyle)`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`
const TrophyImg = styled.img`
    width: 48px;
    height: 48px;
    @media screen and (max-width: 600px) {
        width: 24px;
        height: 24px;
    }
`

const Trophy = ({ src }) => {
    const [iconSrc, setIconSrc] = useState('');
  
    useEffect(() => {
      const loadIcon = async () => {
        const icon = await import(`../../assets/img/${src}.png`);
        setIconSrc(icon.default);
      };
      
      loadIcon();
    }, [src]);
  
    return (
      <TrophyImg src={iconSrc} alt="Trophy" />
    );
};

const Tables = ({ data }) => {
    const { t, i18n } = useTranslation();
    const navigate = useNavigate();
    const { activeNetwork } = useNetworkStore()
    const [page, setPage] = useState(1)
    const [maxPage, setMaxPage] = useState(1)

    useEffect(() => {
      let extraPages = 1
      if (data) {
        if (Object.keys(data).length % 10 === 0) {
          extraPages = 0
        }
        setMaxPage(Math.floor(Object.keys(data).length / 10) + extraPages)
      }
    }, [ data ])

    const sortedData = useMemo(() => {
        return data.length? data.slice(10 * (page - 1), page * 10): []
    },[data, page])

    const shortenAddress = (address) => {
        if(address === '') {
            return '-'
        }
        return `${address.substring(0, 6)}...${address.substring(42 - 4)}`
    }
    return (
        <>
            <TableWrapper>
                <RowShadow>
                    <HeaderRow grid={3}>
                        <TableCol>
                            <IndexBox>
                                <TextStyle color={'#6A6969'} size={16} hsize={14} justify={'true'}>#</TextStyle>
                            </IndexBox>
                        </TableCol>
                        <TableCol>
                            <Text color={'#6A6969'} size={16} hsize={12} justify={'true'}>
                                {t('wallet_address')}
                            </Text>
                        </TableCol>
                        <TableCol>
                            <Text color={'#6A6969'} size={16} hsize={12} justify={'true'}>
                                {t('trans_number')}
                            </Text>
                        </TableCol>
                    </HeaderRow>
                </RowShadow>
                { sortedData.length? sortedData.map((row, index) => (
                    <RowShadow>
                        <TableRow grid={3} key={row.index}>
                            <TableCol>
                                {
                                    row.index < 4?
                                    <Trophy src={`trophy${row.index}`} />
                                    :
                                    <IndexBox>
                                        <TextStyle color={'#24282B'} size={36} hsize={14}>{row.index}</TextStyle>
                                    </IndexBox>
                                }
                            </TableCol>
                            <TableCol>
                                <Ellipsis color={'#24282B'} size={16} hsize={14} justify={'true'}>{shortenAddress(row.creator)}</Ellipsis>
                            </TableCol>
                            <TableCol>
                                <TextStyle color={'#24282B'} size={16} hsize={14} justify={'true'}>{formattedNumber(row.swap_count)}</TextStyle>
                            </TableCol>
                        </TableRow>
                    </RowShadow>
                )):[1, 2, 3].map(value => (
                    <RowShadow>
                        <TableRow grid={4} key={value}>
                            <Skeleton height={16} />
                            <Skeleton height={16} />
                            <Skeleton height={16} />
                        </TableRow>
                    </RowShadow>
                ))}
            </TableWrapper>
            <PaginationWrapper>
                <PaginationButtonBack
                    faded={page === 1 ? true : false}
                    onClick={() => {
                        setPage(page === 1 ? page : page - 1)
                    }}
                />
                <PaginationButton>
                    <ImgStyle src={staricon} />
                    <TextStyle color={'#000'} size={16} hsize={14}>
                        {`${t('page')} ${page}`}
                    </TextStyle>
                    <ImgStyle src={staricon} />
                </PaginationButton>
                <PaginationButtonGo 
                    onClick={() => {
                        setPage(page >= maxPage ? page : page + 1)
                      }}
                    faded={page >= maxPage ? true : false}
                />
            </PaginationWrapper>
        </>
    )
}

export default Tables;
