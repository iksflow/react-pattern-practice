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

# Hello Sagas!
우리는 우리의 첫 번째 Saga를 만들 것입니다.  
전통을 따라, Sagas의 'Hello, world' 버전을 작성할 것입니다.  

`sagas.js` 파일을 생성한 후 다음 코드를 추가합니다:   

```javascript
export function* helloSaga() {
  console.log('Hello Sagas!')
}
```
그래서 무서운 것은 없고, 단지 일반 함수입니다(\*를 제외하고).  
이 함수는 콘솔에 인사말 메시지를 출력하는 것뿐입니다.  

우리의 Saga를 실행하려면 다음이 필요합니다:
Saga를 실행할 목록과 함께 Saga 미들웨어를 생성합니다(현재는 helloSaga 하나만 있습니다).  
- Saga 미들웨어를 Redux 스토어에 연결합니다.  
- main.js에 다음과 같은 변경을 할 것입니다:

```javascript
// main.js
// ...
import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

// ...
import { helloSaga } from './sagas'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(
  reducer,
  applyMiddleware(sagaMiddleware)
)
sagaMiddleware.run(helloSaga)

const action = type => store.dispatch({type})

// rest unchanged
```