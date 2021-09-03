import React, { Component } from 'react'
import axios from 'axios'
import styles from '../../src/styles'
// 타임라인 화면을 정의하는 컴포넌트
export default class Timeline extends Component {
  constructor(props) {
    super(props)
    this.state = { timelines: [], comment: '' }
  }
  componentWillMount() {
    this.loadTimelines()
  }
  loadTimelines() { // 타임라인 추출 --- (※1)
    axios
      .get('/api/get_friends_timeline', {
        params: {
          userid: window.localStorage.sns_id,
          token: window.localStorage.sns_auth_token
        }
      })
      .then(res => {
        this.setState({ timelines: res.data.timelines })
      }).catch(err => {
        console.log(err);
      })
  }
  post() { // 자신의 타임라인에 글쓰기 --- (※2)
    axios
      .get('/api/add_timeline', {
        params: {
          userid: window.localStorage.sns_id,
          token: window.localStorage.sns_auth_token,
          comment: this.state.comment
        }
      })
      .then(res => {
        this.setState({ comment: '' })
        this.loadTimelines()
      }).catch(err => {
        console.log(err);
      })
  }
  render() {
    // 타임라인 데이터를 하나씩 생성 --- (※3)
    const timelines = this.state.timelines.map(e => {
      return (
        <div key={e._id} style={styles.timeline}>
          <img src={'user.png'} style={styles.tl_img} />
          <div style={styles.userid}>{e.userid}:</div>
          <div style={styles.comment}>{e.comment}</div>
          <p style={{ clear: 'both' }} />
        </div>
      )
    })
    return (
      <div>
        <h1>타임라인</h1>
        <div>
          <input value={this.state.comment} size={40}
            onChange={e => this.setState({ comment: e.target.value })} />
          <button onClick={e => this.post()}>작성하기</button>
        </div>
        <div>{timelines}</div>
        <hr />
        <p><a href={'/users'}>→친구 추가하기</a></p>
        <p><a href={'/login'}>→다른 사용자로 로그인</a></p>
      </div>
    )
  }
}