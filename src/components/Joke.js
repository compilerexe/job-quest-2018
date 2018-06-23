import React from 'react';
import styled from 'styled-components';

const styles = {
  column: { marginTop: '20px' },
};

const StyledBgColor = styled.div`
      background: linear-gradient(to right, #b4d0fd, #c2e9fb);
      box-shadow: 4px 4px #888888;
    `;

export default props => (
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
