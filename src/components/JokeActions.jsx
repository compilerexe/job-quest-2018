import React, { Component } from 'react';
import styled from 'styled-components';

const StyledBgColor = styled.div`
      background: linear-gradient(to right, #b4d0fd, #c2e9fb);
      box-shadow: 4px 4px #888888;
    `;

export default class JokeActions extends Component {
  constructor(props) {
    super(props);
    this.data = props.data;
  }

  componentDidMount() {
    console.log(`componentDidMount >>>> ${this.data.jokeId}`);
  }

  onPressButton(e, action) {
    e.preventDefault();
    console.log(`onPresss ${this.data.jokeId}`);
    this.firebaseStore(action);
  }

  firebaseStore(action) {
    if (action === 'like') {
      this.data.refIP.update({ like: !this.data.log.like, dislike: false });
    } else {
      this.data.refIP.update({ dislike: !this.data.log.dislike, like: false });
    }

    if (action === 'like') {
      let snapLike = this.data.like;
      let snapDislike = this.data.dislike;

      if (snapLike === 0) {
        snapLike += 1;
        if (snapDislike > 0) {
          snapDislike -= 1;
        }
      } else {
        snapLike -= 1;
      }

      this.data.refJoke.update({ like: snapLike, dislike: snapDislike });
      this.data = { ...this.data, like: snapLike, dislike: snapDislike };
      this.forceUpdate();
    } else {
      let snapLike = this.data.like;
      let snapDislike = this.data.dislike;

      if (snapDislike === 0) {
        snapDislike += 1;
        if (snapLike > 0) {
          snapLike -= 1;
        }
      } else {
        snapDislike -= 1;
      }

      this.data.refJoke.update({ dislike: snapDislike, like: snapLike });
      this.data = { ...this.data, like: snapLike, dislike: snapDislike };
      this.forceUpdate();
    }
  }

  render() {
    const styles = {
      column: { marginTop: '20px' },
      btnLike: { marginRight: '10px' },
    };

    return (
      <article className="form-group" style={styles.column}>
        <div className="card">
          <StyledBgColor className="card-header">
            <div className="card-title h5">
              {this.data.joke}
            </div>
            <div style={{ marginTop: '10px' }}>
              <button
                type="button"
                className="btn btn-success"
                style={styles.btnLike}
                onClick={e => this.onPressButton(e, 'like')}
              >
                <i className="icon icon-emoji" />
                {' '}
                {this.data.like}
              </button>
              <button
                type="button"
                className="btn btn-error"
                onClick={e => this.onPressButton(e, 'dislike')}
              >
                <i className="icon icon-flag" />
&nbsp;
                {this.data.dislike}
              </button>
            </div>
          </StyledBgColor>
        </div>
      </article>
    );
  }
}
