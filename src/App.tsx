import 'react-calendar-heatmap/dist/styles.css';

import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';

import Header from './components/Header';
import Footer from './components/Footer';
import Profile from './pages/Profile';
import Repo from './pages/Repo';
import Userlist from './pages/Userlist';
import { createClient, Provider } from 'urql'

import GlobalStyles from './styles/GlobalStyles';
import { ThemeName, themes } from './styles/themes';


const client = createClient({
  url: 'https://api.github.com/graphql',
  fetchOptions: {
    headers: { authorization: `Bearer ${process.env.REACT_APP_GH_TOKEN}` }
  }
})

function App() {
  const [themeName, setThemeName] = useState<ThemeName>('light');
  const [search, setSearch] = useState('');
  const currentTheme = themes[themeName];

  return (
    <Provider value={client}>
    <ThemeProvider theme={currentTheme}>
      <BrowserRouter>
        <Header themeName={themeName} setThemeName={setThemeName} search={search} setSearch={setSearch} />
        <Routes>
          <Route path="/" element={<Profile />} />
          <Route path="/:username" element={<Profile />} />
          <Route path="/search" element={<Userlist />} />
          <Route path="/:username/:reponame" element={<Repo />} />
        </Routes>

        <Footer />

        <GlobalStyles />
      </BrowserRouter>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
