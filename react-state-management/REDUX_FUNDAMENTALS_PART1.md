# Redux Fundamentals > Part 1. Redux Overview

**What You'll Learn**

- Redux가 무엇이고 왜 사용해야 하는지
- Redux 앱을 구성하는 기본 요소들

<br/><br/><br/>

## 1. Redux는 무엇인가?

Redux는 "액션"이라고 불리는 이벤트를 사용하여 애플리케이션 상태를 관리하고 업데이트하기 위한 패턴이자 라이브러리입니다.  
전체 애플리케이션에서 사용해야 하는 상태를 위한 중앙 집중식 저장소 역할을 하며, 상태가 예측 가능한 방식으로만 업데이트될 수 있도록 하는 규칙을 가지고 있습니다.

<br/><br/><br/>

## 2. Redux를 왜 사용해야 하는가?

Redux는 애플리케이션의 여러 부분에서 필요한 상태인 "전역" 상태를 관리하는 데 도움을 줍니다.  
Redux가 제공하는 패턴과 도구를 통해 애플리케이션의 상태가 언제, 어디서, 왜, 어떻게 업데이트되는지, 그리고 이러한 변경이 발생할 때 애플리케이션 로직이 어떻게 동작할지 더 쉽게 이해할 수 있습니다.  
Redux는 예측 가능하고 테스트 가능한 코드를 작성하도록 안내하여 애플리케이션이 예상대로 작동할 것이라는 확신을 갖게 해줍니다.

<br/><br/><br/>

## 3. Redux를 언제 사용해야 하는가?

Redux는 공유 상태 관리를 다루는 데 도움이 되지만, 다른 도구들과 마찬가지로 장단점이 있습니다.  
더 많은 개념을 배워야 하고, 더 많은 코드를 작성해야 합니다.  
또한 코드에 간접성을 추가하고 특정 제약을 따르도록 요구합니다.  
이는 단기적 생산성과 장기적 생산성 사이의 균형을 맞추는 것입니다.

Redux는 다음과 같은 경우에 더 유용합니다:

- 앱의 여러 곳에서 필요한 대량의 애플리케이션 상태가 있는 경우
- 앱 상태가 시간이 지남에 따라 자주 업데이트되는 경우
- 상태를 업데이트하는 로직이 복잡할 수 있는 경우
- 앱이 중간 규모 이상의 코드베이스를 가지고 있고, 여러 사람이 작업할 수 있는 경우

모든 앱이 Redux를 필요로 하는 것은 아닙니다.  
여러분이 만들고 있는 앱의 종류에 대해 시간을 들여 생각해보고, 직면한 문제를 해결하는 데 가장 적합한 도구가 무엇인지 결정하세요.

<br/><br/><br/>

## 4. Redux Libraries and Tools

Redux는 작은 독립형 JS 라이브러리입니다.  
하지만 일반적으로 다음과 같은 여러 패키지와 함께 사용됩니다:

**React-Redux**

Redux는 모든 UI 프레임워크와 통합될 수 있으며, React와 가장 자주 사용됩니다.  
React-Redux는 React 컴포넌트가 상태를 읽고 스토어를 업데이트하기 위한 액션을 디스패치하여 Redux 스토어와 상호작용할 수 있게 해주는 공식 패키지입니다.

**Redux Toolkit**

Redux Toolkit은 Redux 로직을 작성하는 데 권장되는 접근 방식입니다.  
Redux 앱을 구축하는 데 필수적이라고 생각하는 패키지와 기능들이 포함되어 있습니다.  
Redux Toolkit은 권장하는 모범 사례들을 내장하고 있으며, 대부분의 Redux 작업을 단순화하고, 일반적인 실수를 방지하며, Redux 애플리케이션을 더 쉽게 작성할 수 있게 해줍니다.

**Redux DevTools 확장 프로그램**

Redux DevTools 확장 프로그램은 시간이 지남에 따라 Redux 스토어의 상태 변화 기록을 보여줍니다.  
이를 통해 "시간 여행 디버깅"과 같은 강력한 기술을 포함하여 애플리케이션을 효과적으로 디버깅할 수 있습니다.

<br/><br/><br/>

## 5. Redux Basics

**The Redux Store**
모든 Redux 애플리케이션의 중심에는 스토어가 있습니다.  
"스토어"는 애플리케이션의 전역 상태를 보관하는 컨테이너입니다.
스토어는 일반적인 전역 객체와 구별되는 몇 가지 특별한 기능과 능력을 가진 JavaScript 객체입니다:

- Redux 스토어 내부에 보관된 상태를 절대 직접 수정하거나 변경해서는 안 됩니다.
- 대신, 상태를 업데이트하는 유일한 방법은 "애플리케이션에서 발생한 일"을 설명하는 일반 액션 객체를 생성한 다음, 해당 액션을 스토어에 디스패치하여 무슨 일이 일어났는지 알리는 것입니다.
- 액션이 디스패치되면 스토어는 루트 리듀서 함수를 실행하고, 이전 상태와 액션을 기반으로 새로운 상태를 계산하도록 합니다.
- 마지막으로, 스토어는 구독자들에게 상태가 업데이트되었음을 알려 UI가 새로운 데이터로 업데이트될 수 있도록 합니다.

<br/><br/>

### 5.1. State, Actions, and Reducers

**State**

우리는 애플리케이션을 설명하는 초기 상태 값을 정의하여 시작합니다.

```js
const initialState = {
  value: 0,
};
```

이 앱에서는 카운터의 현재 값을 나타내는 단일 숫자를 추적할 것입니다.  
Redux 앱은 일반적으로 상태의 루트 부분으로 JS 객체를 가지며, 해당 객체 내부에 다른 값들이 포함됩니다.  
그런 다음 리듀서 함수를 정의합니다.

<br/><br/>

**Reducers**

리듀서는 `state`와 발생한 일을 설명하는 `action 객체`, 두 가지 인자를 받습니다.  
Redux 앱이 시작될 때는 아직 상태가 없으므로, 이 리듀서의 기본값으로 `initialState`를 제공합니다:

```js
// Create a "reducer" function that determines what the new state
// should be when something happens in the app
function counterReducer(state = initialState, action) {
  // Reducers usually look at the type of action that happened
  // to decide how to update the state
  switch (action.type) {
    case 'counter/incremented':
      return { ...state, value: state.value + 1 };
    case 'counter/decremented':
      return { ...state, value: state.value - 1 };
    default:
      // If the reducer doesn't care about this action type,
      // return the existing state unchanged
      return state;
  }
}
```

**Action 객체**

액션 객체는 항상 `type` 필드를 가지고 있으며, 이는 액션의 고유한 이름 역할을 하는 문자열입니다.  
`type`은 코드를 보는 누구나 그 의미를 이해할 수 있도록 읽기 쉬운 이름이어야 합니다.  
이 경우, 우리는 액션 타입의 첫 번째 부분으로 'counter'라는 단어를 사용하고, 두 번째 부분은 "무슨 일이 일어났는지"에 대한 설명입니다.  
이 예시에서는 'counter'가 'incremented'되었으므로, 액션 타입을 'counter/incremented'로 작성합니다.  
액션의 타입에 따라, 우리는 새로운 상태 결과가 될 새로운 객체를 반환하거나, 변경이 필요 없는 경우 기존 상태 객체를 반환해야 합니다.  
원본 객체를 직접 수정하는 대신, 기존 상태를 복사하고 복사본을 업데이트하는 방식으로 상태를 불변하게 업데이트한다는 점에 주목하세요.

<br/><br/>

**Store**

리듀서 함수가 있으면, Redux 라이브러리의 `createStore` API를 호출하여 스토어 인스턴스를 생성할 수 있습니다.

```js
// Create a new Redux store with the `createStore` function,
// and use the `counterReducer` for the update logic
const store = Redux.createStore(counterReducer);
```

리듀서 함수를 `createStore`에 전달하여, 초기 상태를 생성하고 미래의 업데이트를 계산하는 데 사용합니다.

## 6. Data Flow

Dispatch action > Run reducer > Update state > Render UI

다음 다이어그램으로 Redux 앱의 데이터 흐름을 요약할 수 있습니다. 이는 다음과 같은 과정을 보여줍니다:

- 클릭과 같은 사용자 상호작용에 대한 응답으로 액션이 디스패치됨
- 스토어가 리듀서 함수를 실행하여 새로운 상태를 계산
- UI가 새로운 상태를 읽어 새로운 값을 표시

![alt text](src/assets/images/redux-data-flow.gif)

## What You've Learned

이 카운터 예제는 작지만, 실제 Redux 앱의 모든 작동 요소를 보여줍니다.  
다음 섹션에서 다룰 모든 내용은 이러한 기본 요소들을 확장한 것입니다.
이를 염두에 두고, 지금까지 배운 내용을 검토해 보겠습니다:

**Summary**

- Redux는 전역 애플리케이션 상태를 관리하기 위한 라이브러리입니다
  - Redux는 일반적으로 Redux와 React를 통합하기 위해 React-Redux 라이브러리와 함께 사용됩니다
  - Redux Toolkit은 Redux 로직을 작성하는 표준 방식입니다
- Redux의 업데이트 패턴은 "무슨 일이 일어났는지"와 "상태가 어떻게 변하는지"를 분리합니다
  - 액션은 type 필드가 있는 일반 객체이며, 앱에서 "무슨 일이 일어났는지"를 설명합니다
  - 리듀서는 이전 상태와 액션을 기반으로 새로운 상태 값을 계산하는 함수입니다
  - Redux 스토어는 액션이 디스패치될 때마다 루트 리듀서를 실행합니다
- Redux는 "단방향 데이터 흐름" 앱 구조를 사용합니다
  - 상태는 특정 시점의 앱 상태를 설명하며, UI는 해당 상태를 기반으로 렌더링됩니다
  - 앱에서 무언가가 발생할 때:
    - UI가 액션을 디스패치합니다
    - 스토어가 리듀서를 실행하고, 발생한 일에 기반하여 상태가 업데이트됩니다
    - 스토어가 UI에 상태가 변경되었음을 알립니다
  - UI는 새로운 상태를 기반으로 다시 렌더링됩니다
