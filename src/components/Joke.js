import React, { Component } from 'react';
import styled from 'styled-components';

export default (props) => {
  const styles = {
    column: { marginTop: '20px' },
  };

  const StyledBgColor = styled.div`
      background: linear-gradient(to right, #b4d0fd, #c2e9fb);
      box-shadow: 4px 4px #888888;
    `;

  const Joke = () => (
    <article className="form-group" style={styles.column}>
      <div className="card">
        <StyledBgColor className="card-header">
          <div className="card-title h5">
            {props.data.joke}
          </div>
        </StyledBgColor>
      </div>
    </article>
  );

  return <Joke />;
};
