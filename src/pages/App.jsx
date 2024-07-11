import './App.css';
import React, { useEffect, useState } from 'react';
import { Routes, Route, NavLink, useLocation, useNavigate, useParams } from 'react-router-dom'
import { usePoolStore, useNetworkStore } from "../store";
import styled from 'styled-components'
import CBD from './cbd'
import RunesX from './runesX'
import Lorenzo from './lorenzo'
import Satoshi from './satoshi'
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
  	padding: 48px 0 60px;
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
    	    <Routes>
    	      	<Route path="/" element={<RunesX />} />
    	      	<Route path="/satoshi" element={<Satoshi />} />
    	      	<Route path="/runesx" element={<RunesX />}/>
    	      	<Route path="/cbd" element={<CBD />}/>
    	      	{/* <Route path="/lorenzo" element={<Lorenzo />} /> */}
    	    </Routes>
    	</div>
  	);
}

export default App;
