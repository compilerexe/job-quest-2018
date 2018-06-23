import React from 'react';
import styled from 'styled-components';

const Nav = ({ className }) => (
  <nav className="navbar-section" style={{ paddingTop: '20px', paddingBottom: '20px' }}>
    <header className="navbar">
      <section className="navbar-section">
        <a href="/" className={`navbar-brand mr-2 ${className}`}>
TakeMeJoke
        </a>
      </section>
    </header>
  </nav>
);

const StyledNav = styled(Nav)`
  background: linear-gradient(to right, #30CFD0, #330867);
  color:transparent;
  -webkit-background-clip: text;
  background-clip: text;
`;

export default () => <StyledNav />;
