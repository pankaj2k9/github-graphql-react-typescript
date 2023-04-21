import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Container, GithubLogo, SearchForm } from './styles';
import { ThemeName } from '../../styles/themes';

interface ThemeProps {
  themeName: ThemeName;
  setThemeName: (newName: ThemeName) => void;
  search: string;
  setSearch: (searchText: string) => void;
}

const Header: React.FC<ThemeProps> = ({
  themeName,
  setThemeName,
  search,
  setSearch
}) => {
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    navigate('/search?q=' + search.toLowerCase().trim());
  }

  function switchTheme() {
    navigate('/');
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  }

  return(
    <Container>
      <GithubLogo onClick={switchTheme}/>
      <SearchForm onSubmit={handleSubmit}>
        <input
          placeholder="Enter username..."
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
        />
      </SearchForm>
    </Container>
  );
} 

export default Header;