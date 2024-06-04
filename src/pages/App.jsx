import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePoolStore, useNetworkStore } from "../store";
import styled from 'styled-components'
import Home from './home'
import Menu from '../components/Menu'
import PageBottom from "../components/PageBottom";
import { useTranslation } from 'react-i18next';

const PageWidth = styled.div`
  max-width: 1200px;
  // height: 100%;
  margin: 0 auto;
  padding: 0 16px;
`
const Pages = styled.div`
  padding: 60px 0 60px;
  @media screen and (max-width: 860px) {
    padding: 40px 0 76px;
  }
`
function App() {
  const { i18n } = useTranslation();
  const { activeNetwork } = useNetworkStore()
  const { updateAllList } = usePoolStore()

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const lang = params.get('lang');
  useEffect(() => {
    const lng = ['en', 'ja', 'vi', 'zh-CN', 'zh-HK']
    if(lng.includes(lang)) {
      i18n.changeLanguage(lang)
    }
  }, [lang])

  // useEffect(() => {
  //   updateAllList(activeNetwork)
  // }, [activeNetwork])

  return (
    <div className="App">
      <PageWidth>
        <>
          <Menu></Menu>
          <Pages>
            <Routes>
              <Route path="/leaderboard" element={<Home />} />
              <Route path="/" element={<Home />}/>
            </Routes>
          </Pages>
        </>
      </PageWidth>
      <PageBottom />
    </div>
  );
}

export default App;
