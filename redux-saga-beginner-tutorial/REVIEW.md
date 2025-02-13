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

# Making Asynchronous calls
Now let's add something closer to the original Counter demo.  
To illustrate asynchronous calls, we will add another button to increment the counter 1 second after the click.  
First things first, we'll provide an additional button and a callback onIncrementAsync to the UI component.  

We will make the changes to Counter.js:
```javascript
const Counter = ({ value, onIncrement, onDecrement, onIncrementAsync }) =>
  <div>
    <button onClick={onIncrementAsync}>
      Increment after 1 second
    </button>
    {' '}
    <button onClick={onIncrement}>
      Increment
    </button>
    {' '}
    <button onClick={onDecrement}>
      Decrement
    </button>
    <hr />
    <div>
      Clicked: {value} times
    </div>
  </div>
```

Next we should connect the onIncrementAsync of the Component to a Store action.

We will modify the main.js module as follows

```javascript
function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action('INCREMENT')}
      onDecrement={() => action('DECREMENT')}
      onIncrementAsync={() => action('INCREMENT_ASYNC')} />,
    document.getElementById('root')
  )
}
```

Note that unlike in redux-thunk, our component dispatches a plain object action.  
Now we will introduce another Saga to perform the asynchronous call.  
Our use case is as follows:

On each INCREMENT_ASYNC action, we want to start a task that will do the following
Wait 1 second then increment the counter

Add the following code to the sagas.js module: 
```javascript
import { put, takeEvery } from 'redux-saga/effects'

const delay = (ms) => new Promise(res => setTimeout(res, ms))

// ...

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

// Our watcher Saga: spawn a new incrementAsync task on each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}
```

설명 시간입니다.
우리는 지정된 밀리초 후에 해결될 Promise를 반환하는 delay 함수를 생성합니다.  
이 함수를 사용하여 Generator를 차단할 것입니다.
Sagas는 redux-saga 미들웨어에 객체를 yield하는 Generator 함수로 구현됩니다.  
yield된 객체는 미들웨어가 해석할 일종의 명령입니다.  
Promise가 미들웨어에 yield되면, 미들웨어는 Promise가 완료될 때까지 Saga를 일시 중지합니다.  
위의 예에서, incrementAsync Saga는 delay가 반환한 Promise가 1초 후에 해결될 때까지 일시 중지됩니다.  

Promise가 해결되면, 미들웨어는 Saga를 재개하여 다음 yield까지 코드를 실행합니다.  
이 예에서, 다음 문장은 또 다른 yield된 객체입니다: put({type: 'INCREMENT'})를 호출한 결과로, 이는 미들웨어에 INCREMENT 액션을 디스패치하도록 지시합니다.  

put은 우리가 Effect라고 부르는 것의 한 예입니다.  
Effect는 미들웨어가 이행해야 하는 명령을 포함하는 일반 JavaScript 객체입니다.  
미들웨어가 Saga에 의해 yield된 Effect를 검색하면, Saga는 Effect가 이행될 때까지 일시 중지됩니다.  

따라서 요약하면, incrementAsync Saga는 delay(1000)를 호출하여 1초 동안 대기한 후 INCREMENT 액션을 디스패치합니다.  

다음으로, 우리는 또 다른 Saga인 watchIncrementAsync를 생성했습니다.  
redux-saga에서 제공하는 도우미 함수인 takeEvery를 사용하여 디스패치된 INCREMENT_ASYNC 액션을 듣고 매번 incrementAsync를 실행합니다.  

이제 우리는 2개의 Saga가 있으며, 이를 한 번에 모두 시작해야 합니다.  
이를 위해, 다른 Saga를 시작하는 책임이 있는 rootSaga를 추가할 것입니다.  
동일한 파일 sagas.js에서 파일을 다음과 같이 리팩터링합니다:

```js
import { put, takeEvery, all } from 'redux-saga/effects'

export const delay = (ms) => new Promise(res => setTimeout(res, ms))

export function* helloSaga() {
  console.log('Hello Sagas!')
}

export function* incrementAsync() {
  yield delay(1000)
  yield put({ type: 'INCREMENT' })
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync)
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([
    helloSaga(),
    watchIncrementAsync()
  ])
}
```