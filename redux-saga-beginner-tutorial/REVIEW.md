# Getting Started, Usage Example
사용자 인터페이스에서 버튼을 클릭할 때 원격 서버에서 일부 사용자 데이터를 가져오는 UI가 있다고 가정해 봅시다.  
(간결함을 위해 액션 트리거링 코드만 보여드리겠습니다.)

```javascript
class UserComponent extends React.Component {
  ...
  onSomeButtonClicked() {
    const { userId, dispatch } = this.props
    dispatch({type: 'USER_FETCH_REQUESTED', payload: {userId}})
  }
  ...
}
```

컴포넌트는 Store에 평범한 객체 액션을 디스패치합니다.  
우리는 모든 USER_FETCH_REQUESTED 액션을 감시하고 사용자 데이터를 가져오는 API 호출을 트리거하는 Saga를 생성할 것입니다.

sagas.js 파일에 다음과 같이 작성합니다.

```javascript
// sagas.js

import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import Api from '...'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
    try {
        const user = yield call(Api.fetchUser, action.payload.userId)
        yield put({ type: 'USER_FETCH_SUCCEEDED', user: user })
    } catch (e) {
        yield put({ type: 'USER_FETCH_FAILED', message: e.message })
    }
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
    yield takeEvery('USER_FETCH_REQUESTED', fetchUser)
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
function* mySaga() {
    yield takeLatest('USER_FETCH_REQUESTED', fetchUser)
}

export default mySaga
```

우리의 Saga를 실행하려면 redux-saga 미들웨어를 사용하여 Redux Store에 연결해야 합니다.

```javascript
// main.js
import { configureStore } from '@reduxjs/toolkit'
import createSagaMiddleware from 'redux-saga'

import reducer from './reducers'
import mySaga from './sagas'

// create the saga middleware
const sagaMiddleware = createSagaMiddleware()
// mount it on the Store
const store = configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
})

// then run the saga
sagaMiddleware.run(mySaga)

// render the application
```


# Beginner Tutorial
이 튜토리얼의 목표:
이 튜토리얼은 redux-saga를 (가능하면) 쉽게 소개하려고 합니다.
시작 튜토리얼에서는 Redux 저장소의 간단한 Counter 데모를 사용할 것입니다.    
이 애플리케이션은 매우 기본적이지만, redux-saga의 기본 개념을 과도한 세부 사항 없이 설명하기에 적합합니다.  

# 



