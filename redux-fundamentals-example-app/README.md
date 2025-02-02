# Redux Fundamentals Tutorial Example

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `yarn build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify


# combineReducers
- slice로 분리한 reducer를 합쳐서 rootReducer를 만들어주는 함수.


# createStore
- rootReducer와 middleware를 받아 store를 만들어주는 함수.
- preloadedState를 받아 초기 state를 설정할 수 있다.

# store enhancer
- store 생성 함수를 확장하는 함수.
- original store를 한층 더 감싸서 store를 확장한다. 
- enhancer는 dispatch, getState, subscribe를 override할 수 있다.
- enhancer는 아래와 같은 형태로 사용한다.
```js
export const sayHiOnDispatch = (createStore) => {
  return (rootReducer, preloadedState, enhancers) => {
    const store = createStore(rootReducer, preloadedState, enhancers)

    function newDispatch(action) {
      const result = store.dispatch(action)
      console.log('Hi!')
      return result
    }

    return { ...store, dispatch: newDispatch }
  }
}

```
- 이렇게 만든 enhancer를 createStore에 넣어준다.
```js
const store = createStore(rootReducer, undefined, sayHiOnDispatch)
```

- 여러개의 enhancer를 사용하려면 compose를 사용한다.
```js
const composedEnhancer = compose(sayHiOnDispatch, includeMeaningOfLife);
const store = createStore(rootReducer, undefined, composedEnhancer);
```

# middleware
- middleware는 dispatch한 Action이 store에 도달해서 Reducer가 동작하기 전에 실행되는 함수이다.
- enhancer와 다르게 dispatch의 커스터마이즈에만 집중한다.
- middleware는 아래와 같은 형태로 사용한다.

middleware 함수를 정의하는 방법은 아래와 같다.
```js
export const print1 = (storeAPI) => (next) => (action) => {
  console.log('1')
  return next(action)
}
```

여러개의 middleware를 사용하려면 applyMiddleware를 사용한다.
그런 다음 createStore에 enhancer로 넣어준다.  
preloadedState는 없어도 된다.  
오버로드한 createStore를 사용하기 때문에 enhancer를 두번째 인자로 넣어준다.
```js
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducer';
import { print1, print2, print3 } from './exampleAddons/middleware';

const middlewareEnhancer = applyMiddleware(print1, print2, print3);

// Pass enhancer as the second arg, since there's no preloadedState
const store = createStore(rootReducer, middlewareEnhancer);

export default store;
```

미들웨어는 스토어의 `dispatch` 메서드를 둘러싼 파이프라인을 형성합니다.  
`store.dispatch(action)`을 호출하면 실제로는 파이프라인의 첫 번째 미들웨어를 호출하는 것입니다.    
이 미들웨어는 액션을 확인하고 원하는 작업을 수행할 수 있습니다.  
일반적으로 미들웨어는 리듀서처럼 특정 타입의 액션인지 확인하고, 맞다면 커스텀 로직을 실행합니다.    
그렇지 않으면 다음 미들웨어로 액션을 전달합니다.  

리듀서와 달리, 미들웨어는 타임아웃 및 기타 비동기 로직을 포함한 side effect을 가질 수 있습니다.
이 경우, 액션은 다음 단계를 거칩니다:
- `print1` 미들웨어 (우리가 보는 `store.dispatch`)
- `print2` 미들웨어
- `print3` 미들웨어
- 원래의 `store.dispatch`
- 스토어 내부의 루트 리듀서

그리고 이것들은 모두 함수 호출이기 때문에, 모두 그 호출 스택에서 반환됩니다.  
따라서 `print1` 미들웨어가 가장 먼저 실행되고, 가장 마지막에 완료됩니다.  

# Writing Custom Middleware
우리는 또한 커스텀 미들웨어를 작성할 수 있습니다.  
항상 필요한 것은 아니지만, 커스텀 미들웨어는 Redux 애플리케이션에 특정 동작을 추가하는 훌륭한 방법입니다.
Redux 미들웨어는 세 개의 중첩된 함수 시리즈로 작성됩니다.  
이 패턴이 어떻게 생겼는지 살펴보겠습니다.  
function 키워드를 사용하여 이 미들웨어를 작성해 보겠습니다.  
이렇게 하면 무슨 일이 일어나고 있는지 더 명확해집니다:


```js
// Middleware written as ES5 functions

// Outer function:
function exampleMiddleware(storeAPI) {
  return function wrapDispatch(next) {
    return function handleAction(action) {
      // Do anything here: pass the action onwards with next(action),
      // or restart the pipeline with storeAPI.dispatch(action)
      // Can also use storeAPI.getState() here

      return next(action)
    }
  }
}
```

이 세 함수가 무엇을 하고, 그 인수가 무엇인지 살펴보겠습니다.

- exampleMiddleware: 가장 바깥쪽 함수는 실제로 "미들웨어" 자체입니다. 이 함수는 applyMiddleware에 의해 호출되며, store의 {dispatch, getState} 함수들을 포함하는 storeAPI 객체를 받습니다. 이 dispatch 함수를 호출하면 액션을 미들웨어 파이프라인의 시작으로 보냅니다. 이 함수는 한 번만 호출됩니다.
- wrapDispatch: 중간 함수는 next라는 함수를 인수로 받습니다. 이 함수는 실제로 파이프라인의 다음 미들웨어입니다. 이 미들웨어가 시퀀스의 마지막이라면, next는 실제로 원래의 store.dispatch 함수입니다. next(action)을 호출하면 액션이 파이프라인의 다음 미들웨어로 전달됩니다. 이 함수도 한 번만 호출됩니다.
- handleAction: 마지막으로, 가장 안쪽 함수는 현재 액션을 인수로 받으며, 액션이 디스패치될 때마다 호출됩니다.

이것들은 일반 함수이기 때문에, ES2015 화살표 함수를 사용하여 작성할 수도 있습니다.  
이렇게 하면 화살표 함수는 return 문을 가질 필요가 없기 때문에 더 짧게 작성할 수 있지만, 화살표 함수와 암시적 반환에 익숙하지 않다면 읽기 어려울 수 있습니다.  

위의 예제를 화살표 함수를 사용하여 다시 작성해 보겠습니다:
```js
const anotherExampleMiddleware = storeAPI => next => action => {
  // Do something in here, when each action is dispatched

  return next(action)
}
```

middleware는 아무 값이나 반환할 수 있습니다.
```js
const alwaysReturnHelloMiddleware = storeAPI => next => action => {
  const originalResult = next(action)
  // Ignore the original result, return something else
  return 'Hello!'
}

const middlewareEnhancer = applyMiddleware(alwaysReturnHelloMiddleware)
const store = createStore(rootReducer, middlewareEnhancer)

const dispatchResult = store.dispatch({ type: 'some/action' })
console.log(dispatchResult)
// log: 'Hello!'
```

만약 특정 Action에 대해서만 middleware를 실행하고 싶다면, 아래와 같이 작성할 수 있습니다.
```js
const delayedMessageMiddleware = storeAPI => next => action => {
    if (action.type === 'todos/todoAdded') {
        setTimeout(() => {
            console.log('Added a new todo: ', action.payload)
        }, 1000)
    }

    return next(action)
}
```

# Middleware Use Cases
그렇다면 미들웨어로 무엇을 할 수 있을까요? 정말 많습니다!

미들웨어는 디스패치된 액션을 볼 때 원하는 모든 작업을 수행할 수 있습니다:

- 콘솔에 무언가를 기록하기
- 타임아웃 설정하기
- 비동기 API 호출하기
- 액션 수정하기
- 액션을 일시 중지하거나 완전히 중지하기

# Redux Devtools Extension

설치는 아래 명령어로.
참고 - `npm install redux-devtools-extension`을 실행하면 에러가 발생한다.  
redux-devtools-extension패키지는 deprecated 되었다.
```sh
npm install @redux-devtools/extension
```

# React-Redux 설치
버전을 명시하여 설치한다.
```sh
npm install react-redux@8.1.3
```

# 기본 Redux 및 UI 통합
어떤 UI 레이어와 Redux를 함께 사용하려면 몇 가지 일관된 단계가 필요합니다:

1. Redux 스토어 생성
2. 업데이트 구독
3. 구독 콜백 내부:
   1. 현재 스토어 상태 가져오기
   2. 이 UI 조각에 필요한 데이터 추출
   3. 데이터로 UI 업데이트
4. 필요한 경우 초기 상태로 UI 렌더링
5. UI 입력에 응답하여 Redux 액션 디스패치

어떤 UI 레이어를 사용하든 Redux는 모든 UI에서 동일한 방식으로 작동합니다.  
실제 구현은 성능 최적화를 돕기 위해 일반적으로 조금 더 복잡하지만, 매번 동일한 단계로 진행됩니다.
Redux는 별도의 라이브러리이기 때문에, 특정 UI 프레임워크와 함께 Redux를 사용하기 위한 다양한 "바인딩" 라이브러리가 있습니다. 이러한 UI 바인딩 라이브러리는 스토어에 구독하고 상태가 변경될 때 UI를 효율적으로 업데이트하는 세부 사항을 처리하므로, 직접 해당 코드를 작성할 필요가 없습니다.  
React에서는 React-Redux가 이러한 바인딩 라이브러리 역할을 합니다.  

다른 많은 라이브러리와 마찬가지로, React-Redux는 컴포넌트에서 사용할 수 있는 자체 커스텀 훅을 포함하고 있습니다.  
React-Redux 훅을 사용하면 React 컴포넌트가 Redux 스토어와 통신하여 상태를 읽고 액션을 디스패치할 수 있습니다.

# React-Redux Hook

## 1. useSelector 
이 훅을 사용하면 React 컴포넌트가 Redux 스토어에서 데이터를 읽을 수 있습니다.  
useSelector는 단일 함수를 인수로 받으며, 이 함수를 선택자 함수라고 부릅니다.  
선택자는 전체 Redux 스토어 상태를 인수로 받아서 상태에서 값을 읽고 그 결과를 반환하는 함수입니다.
예를 들어, 우리의 todo 앱의 Redux 상태가 state.todos로 todo 항목 배열을 유지하고 있다는 것을 알고 있습니다.  
이 todos 배열을 반환하는 작은 선택자 함수를 작성할 수 있습니다.

하지만, {type: 'todos/todoAdded'}와 같은 액션을 디스패치하면 어떻게 될까요?   
Redux 상태는 리듀서에 의해 업데이트되지만, 우리의 컴포넌트는 변경 사항을 알고 새로운 todo 목록으로 다시 렌더링해야 합니다.  
store.subscribe()를 호출하여 스토어의 변경 사항을 들을 수 있다는 것을 알고 있으므로, 모든 컴포넌트에서 스토어에 구독하는 코드를 작성할 수 있습니다.   
하지만, 이는 매우 반복적이고 다루기 어려울 것입니다.  

다행히도, useSelector는 자동으로 Redux 스토어에 구독합니다!  
따라서, 액션이 디스패치될 때마다 선택자 함수를 다시 호출합니다.  
선택자가 반환하는 값이 마지막 실행 때와 다르면, useSelector는 컴포넌트를 강제로 다시 렌더링하여 새로운 데이터를 반영합니다.  
컴포넌트에서 useSelector()를 한 번 호출하기만 하면 나머지 작업은 자동으로 처리됩니다.  

하지만, 여기서 매우 중요한 점이 있습니다:

경고:
useSelector는 엄격한 === 참조 비교를 사용하여 결과를 비교하므로, 선택자 결과가 새로운 참조일 때마다 컴포넌트가 다시 렌더링됩니다! 이는 선택자에서 새로운 참조를 생성하고 반환하면, 데이터가 실제로 다르지 않더라도 액션이 디스패치될 때마다 컴포넌트가 다시 렌더링될 수 있음을 의미합니다.  
이것은 불필요한 렌더링을 유발할 수 있으므로, 선택자 함수가 새로운 참조를 반환하지 않도록 주의해야 합니다.  
아래와 같은 경우 항상 리렌더링 되므로 주의해야합니다.
```js
// Bad: always returning a new reference
const selectTodoDescriptions = state => {
  // This creates a new array reference!
  return state.todos.map(todo => todo.text)
}
```


## 2. useDispatch
이제 컴포넌트에서 Redux 스토어의 데이터를 읽는 방법을 알았습니다.  
하지만, 컴포넌트에서 스토어로 액션을 어떻게 디스패치할 수 있을까요?  
React 외부에서는 store.dispatch(action)을 호출할 수 있다는 것을 알고 있습니다.  
컴포넌트 파일에서는 스토어에 접근할 수 없기 때문에, 컴포넌트 내부에서 디스패치 함수를 얻을 수 있는 방법이 필요합니다.
React-Redux useDispatch 훅은 스토어의 디스패치 메서드를 결과로 제공합니다. (사실, 이 훅의 구현은 return store.dispatch와 같습니다.)
따라서, 액션을 디스패치해야 하는 모든 컴포넌트에서 const dispatch = useDispatch()를 호출하고, 필요한 경우 dispatch(someAction)을 호출할 수 있습니다.
