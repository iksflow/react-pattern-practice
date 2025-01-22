# Redux Fundamentals > Part 2. Concepts and Data Flow

**What You'll Learn**

- Redux를 사용하기 위한 주요 용어와 개념
- Redux 앱에서의 데이터 흐름

<br/><br/><br/>

**주의사항**  
이 튜토리얼은 의도적으로 오래된 스타일의 Redux 로직 패턴을 보여줍니다.  
이는 현재 Redux 앱을 구축하는 올바른 접근 방식으로 가르치는 Redux Toolkit을 사용한 "현대적인 Redux" 패턴보다 더 많은 코드가 필요합니다.  
이는 Redux의 원리와 개념을 설명하기 위한 것이며, 프로덕션용 프로젝트를 위한 것이 아닙니다.

Redux Toolkit으로 "현대적인 Redux"를 사용하는 방법을 배우려면 다음 페이지들을 참고하세요:

- 전체 "Redux Essentials" 튜토리얼 - Redux Toolkit을 사용하여 실제 앱을 위한 "Redux를 올바르게 사용하는 방법"을 가르칩니다. 모든 Redux 학습자들이 "Essentials" 튜토리얼을 읽을 것을 권장합니다!
- Redux Fundamentals, Part 8: Redux Toolkit을 사용한 현대적인 Redux - 이전 섹션의 저수준 예제들을 현대적인 Redux Toolkit 방식으로 변환하는 방법을 보여줍니다.

## 1. 기본 개념

실제 코드를 살펴보기 전에, Redux를 사용하기 위해 알아야 할 용어와 개념들에 대해 이야기해 보겠습니다.

### 상태 관리

작은 React 카운터 컴포넌트를 살펴보면서 시작해보겠습니다.  
이 컴포넌트는 컴포넌트 상태에서 숫자를 추적하고, 버튼을 클릭하면 그 숫자를 증가시킵니다:

```js
function Counter() {
  // State: a counter value
  const [counter, setCounter] = useState(0);

  // Action: code that causes an update to the state when something happens
  const increment = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  // View: the UI definition
  return (
    <div>
      Value: {counter} <button onClick={increment}>Increment</button>
    </div>
  );
}
```

이는 다음과 같은 부분들로 구성된 독립적인 앱입니다:

- 상태(state), 우리 앱을 구동하는 진실의 원천
- 뷰(view), 현재 상태를 기반으로 한 UI의 선언적 설명
- 액션(actions), 사용자 입력을 기반으로 앱에서 발생하고 상태 업데이트를 트리거하는 이벤트들

이것은 "단방향 데이터 흐름"의 작은 예시입니다:

- 상태는 특정 시점의 앱 상태를 설명합니다
- UI는 해당 상태를 기반으로 렌더링됩니다
- 무언가가 발생하면(예: 사용자가 버튼을 클릭), 발생한 일을 기반으로 상태가 업데이트됩니다
- UI는 새로운 상태를 기반으로 다시 렌더링됩니다

<br/>

![단방향 데이터 흐름](src/assets/images/one-way-data-flow.png)

<br/>

하지만 여러 컴포넌트가 동일한 상태를 공유하고 사용해야 할 때, 특히 이러한 컴포넌트들이 애플리케이션의 다른 부분에 위치해 있을 때는 이러한 단순성이 깨질 수 있습니다.  
때로는 상태를 부모 컴포넌트로 "끌어올리는" 것으로 해결할 수 있지만, 항상 도움이 되는 것은 아닙니다.

이를 해결하는 한 가지 방법은 컴포넌트에서 공유 상태를 추출하여 컴포넌트 트리 외부의 중앙 집중식 위치에 두는 것입니다.  
이렇게 하면 컴포넌트 트리가 하나의 큰 "뷰"가 되고, 트리의 어느 위치에 있든 모든 컴포넌트가 상태에 접근하거나 액션을 트리거할 수 있습니다!

상태 관리와 관련된 개념을 정의하고 분리하며, 뷰와 상태 간의 독립성을 유지하는 규칙을 적용함으로써, 우리의 코드에 더 나은 구조와 유지보수성을 부여할 수 있습니다.

이것이 Redux의 기본 아이디어입니다: 애플리케이션의 전역 상태를 담는 단일 중앙 집중식 장소와, 코드를 예측 가능하게 만들기 위해 해당 상태를 업데이트할 때 따라야 할 특정 패턴들입니다.

<br/><br/><br/>

## 2. 불변성

"Mutable"은 "변경 가능한"을 의미합니다. 어떤 것이 "immutable"하다면, 그것은 절대 변경될 수 없습니다.  
JavaScript의 객체와 배열은 기본적으로 모두 가변적(mutable)입니다.  
객체를 생성하면 그 필드의 내용을 변경할 수 있고, 배열을 생성해도 마찬가지로 내용을 변경할 수 있습니다:

```js
const obj = { a: 1, b: 2 };
// still the same object outside, but the contents have changed
obj.b = 3;

const arr = ['a', 'b'];
// In the same way, we can change the contents of this array
arr.push('c');
arr[1] = 'd';
```

이를 객체나 배열을 변이(mutating)한다고 합니다.  
메모리상의 동일한 객체나 배열 참조이지만, 객체 내부의 내용이 변경된 것입니다.

값을 불변하게 업데이트하기 위해서는, 기존 객체/배열의 복사본을 만든 다음 그 복사본을 수정해야 합니다.  
이는 JavaScript의 배열/객체 전개 연산자를 사용하거나, 원본 배열을 변이하는 대신 새로운 배열 복사본을 반환하는 배열 메서드를 사용하여 수동으로 수행할 수 있습니다:

```js
const obj = {
  a: {
    // To safely update obj.a.c, we have to copy each piece
    c: 3,
  },
  b: 2,
};

const obj2 = {
  // copy obj
  ...obj,
  // overwrite a
  a: {
    // copy obj.a
    ...obj.a,
    // overwrite c
    c: 42,
  },
};

const arr = ['a', 'b'];
// Create a new copy of arr, with "c" appended to the end
const arr2 = arr.concat('c');

// or, we can make a copy of the original array:
const arr3 = arr.slice();
// and mutate the copy:
arr3.push('c');
```

Redux는 모든 상태 업데이트가 불변하게 이루어질 것을 기대합니다.  
이것이 왜 중요한지, 그리고 불변 업데이트 로직을 더 쉽게 작성하는 방법에 대해서는 나중에 살펴보겠습니다.

## 3. Redux 용어

계속 진행하기 전에 알아야 할 중요한 Redux 용어들이 있습니다:

### Actions

액션은 type 필드를 가진 일반 JavaScript 객체입니다.  
액션은 애플리케이션에서 발생한 일을 설명하는 이벤트로 생각할 수 있습니다.  
type 필드는 해당 액션을 설명하는 이름을 가진 문자열이어야 합니다(예: "todos/todoAdded").  
일반적으로 이 type 문자열은 "도메인/이벤트이름" 형식으로 작성되며, 첫 번째 부분은 이 액션이 속한 기능이나 카테고리를, 두 번째 부분은 구체적으로 발생한 일을 나타냅니다.

액션 객체는 발생한 일에 대한 추가 정보를 담은 다른 필드들을 가질 수 있습니다.  
관례적으로, 이러한 정보는 payload라는 필드에 넣습니다.

일반적인 액션 객체는 다음과 같은 모습입니다:

```js
const addTodoAction = {
  type: 'todos/todoAdded',
  payload: 'Buy milk',
};
```

<br/>

### Reducers

리듀서는 현재 상태와 액션 객체를 받아서, 필요한 경우 상태를 업데이트하는 방법을 결정하고 새로운 상태를 반환하는 함수입니다:

```js
(state, action) => newState;
```

리듀서는 수신된 액션(이벤트) 타입에 기반하여 이벤트를 처리하는 이벤트 리스너로 생각할 수 있습니다.

"리듀서" 함수는 Array.reduce() 메서드에 전달하는 콜백 함수와 유사하기 때문에 이런 이름이 붙었습니다.

<br/>

리듀서는 항상 다음과 같은 특정 규칙을 따라야 합니다:

- 상태와 액션 인자만을 기반으로 새로운 상태 값을 계산해야 합니다
- 기존 상태를 직접 수정할 수 없습니다. 대신 기존 상태를 복사하고 복사된 값을 변경하는 불변 업데이트를 해야 합니다
- 비동기 로직을 수행하거나, 랜덤 값을 계산하거나, 다른 "부수 효과"를 발생시켜서는 안 됩니다

리듀서의 규칙이 왜 중요한지, 그리고 이를 올바르게 따르는 방법에 대해서는 나중에 더 자세히 다루겠습니다.

리듀서 함수 내부의 로직은 일반적으로 다음과 같은 단계를 따릅니다:

- 리듀서가 이 액션에 관심이 있는지 확인
  - 관심이 있다면, 상태를 복사하고 새로운 값으로 복사본을 업데이트한 후 반환
- 그렇지 않다면, 기존 상태를 변경 없이 반환

다음은 각 리듀서가 따라야 할 단계를 보여주는 간단한 리듀서 예시입니다:

```js
const initialState = { value: 0 };

function counterReducer(state = initialState, action) {
  // Check to see if the reducer cares about this action
  if (action.type === 'counter/incremented') {
    // If so, make a copy of `state`
    return {
      ...state,
      // and update the copy with the new value
      value: state.value + 1,
    };
  }
  // otherwise return the existing state unchanged
  return state;
}
```

리듀서는 새로운 상태를 결정하기 위해 내부적으로 if/else, switch, 반복문 등 어떤 종류의 로직도 사용할 수 있습니다.

> **상세 설명: 왜 '리듀서'라고 불리나요?**

Array.reduce() 메서드는 배열의 값들을 받아서 각 항목을 하나씩 처리하고 최종적으로 단일 결과를 반환할 수 있게 해줍니다.  
이는 "배열을 하나의 값으로 축소한다"고 생각할 수 있습니다.

Array.reduce()는 콜백 함수를 인자로 받으며, 이 콜백은 배열의 각 항목마다 한 번씩 호출됩니다.  
이 콜백은 두 개의 인자를 받습니다:

- previousResult, 콜백이 마지막으로 반환한 값
- currentItem, 배열의 현재 항목

콜백이 처음 실행될 때는 previousResult가 없으므로, 첫 번째 previousResult로 사용될 초기값도 함께 전달해야 합니다.  
만약 숫자 배열의 총합을 구하고 싶다면, 다음과 같은 reduce 콜백을 작성할 수 있습니다:

```js
const numbers = [2, 5, 8];

const addNumbers = (previousResult, currentItem) => {
  console.log({ previousResult, currentItem });
  return previousResult + currentItem;
};

const initialValue = 0;

const total = numbers.reduce(addNumbers, initialValue);
// {previousResult: 0, currentItem: 2}
// {previousResult: 2, currentItem: 5}
// {previousResult: 7, currentItem: 8}

console.log(total);
// 15
```

이 addNumbers "reduce 콜백" 함수는 자체적으로 어떤 것도 추적할 필요가 없다는 점에 주목하세요.  
previousResult와 currentItem 인자를 받아서, 이들을 가지고 무언가를 수행한 다음, 새로운 결과값을 반환합니다.

Redux 리듀서 함수는 이 "reduce 콜백" 함수와 정확히 같은 개념입니다!  
"이전 결과"(상태)와 "현재 항목"(액션 객체)을 받아서, 이 인자들을 기반으로 새로운 상태 값을 결정하고, 그 새로운 상태를 반환합니다.

만약 Redux 액션들의 배열을 만들고, reduce()를 호출하여 리듀서 함수를 전달한다면, 같은 방식으로 최종 결과를 얻을 수 있을 것입니다:

```js
const actions = [
  { type: 'counter/incremented' },
  { type: 'counter/incremented' },
  { type: 'counter/incremented' },
];

const initialState = { value: 0 };

const finalResult = actions.reduce(counterReducer, initialState);
console.log(finalResult);
// {value: 3}
```

### Store

현재 Redux 애플리케이션의 상태는 스토어라고 불리는 객체에 저장됩니다.  
스토어는 리듀서를 전달하여 생성되며, 현재 상태 값을 반환하는 getState라는 메서드를 가지고 있습니다:

```js
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({ reducer: counterReducer });

console.log(store.getState());
// {value: 0}
```

### Dispatch

Redux 스토어는 dispatch라는 메서드를 가지고 있습니다.  
상태를 업데이트하는 유일한 방법은 store.dispatch()를 호출하고 액션 객체를 전달하는 것입니다.  
스토어는 리듀서 함수를 실행하고 새로운 상태 값을 내부에 저장하며, getState()를 호출하여 업데이트된 값을 가져올 수 있습니다:

```js
store.dispatch({ type: 'counter/incremented' });

console.log(store.getState());
// {value: 1}
```

액션을 디스패치하는 것은 애플리케이션에서 "이벤트를 트리거하는 것"으로 생각할 수 있습니다.  
무언가가 발생했고, 우리는 스토어가 이를 알기를 원합니다.  
리듀서는 이벤트 리스너처럼 동작하며, 관심 있는 액션을 감지하면 그에 대한 응답으로 상태를 업데이트합니다.

### Selectors

셀렉터는 스토어의 상태 값에서 특정 정보를 추출하는 방법을 알고 있는 함수입니다.  
애플리케이션이 커질수록, 앱의 여러 부분에서 동일한 데이터를 읽어야 할 때 반복되는 로직을 피하는 데 도움이 됩니다:

```js
const selectCounterValue = (state) => state.value;

const currentValue = selectCounterValue(store.getState());
console.log(currentValue);
// 2
```

## 4. 핵심 개념 및 원칙

전반적으로, Redux의 설계 의도를 다음 3가지 기본 개념으로 요약할 수 있습니다.  

### 상태의 단일 출처(Single Source of Truth)
애플리케이션의 전역 상태는 단일 스토어 내부에 있는 개체에 저장됩니다.어떤 주어진 데이터도 여러 곳에 복제되지 않고 한 곳에만 존재해야 합니다.  
이렇게 하면 애플리케이션의 상태가 변경되는 것을 디버그하고 검사하는 것이 쉬워지며, 애플리케이션의 중앙에 있는 로직을 중앙 집중식으로 처리할 수 있습니다.  


이것은 애플리케이션의 모든 상태가 Redux 스토어에 들어가야 한다는 것을 의미하지 않습니다!  
상태가 Redux에 들어가거나 UI 컴포넌트에 들어가야할지 결정해야 하며, 필요한 곳에 따라 결정해야 합니다.

### 상태는 읽기 전용이어야 합니다(State is Read-Only)
상태를 변경하는 유일한 방법은 무슨 일이 일어났는지 설명하는 객체인 액션을 디스패치하는 것입니다.  
이렇게 하면 UI가 데이터를 실수로 덮어쓰지 않게 되고, 상태 업데이트가 왜 발생했는지 추적하기가 더 쉬워집니다.    
액션은 일반 JS 객체이기 때문에 로깅, 직렬화, 저장 및 나중에 디버깅이나 테스트 목적으로 재생할 수 있습니다.  


### 상태 변경은 순수 리듀서 함수로 이루어집니다(Changes are Made with Pure Reducer Functions)

상태 트리가 액션을 기반으로 업데이트되는 방법을 지정하려면 리듀서 함수를 작성해야 합니다.  
리듀서는 이전 상태와 액션을 받아서 다음 상태를 반환하는 순수 함수입니다.  
다른 함수와 마찬가지로, 작업을 돕기 위해 리듀서를 더 작은 함수로 분할하거나, 공통 작업을 위한 재사용 가능한 리듀서를 작성할 수 있습니다.

### 리덕스 애플리케이션 데이터 흐름
앞서 "단방향 데이터 흐름"에 대해 이야기했으며, 이는 앱을 업데이트하는 일련의 단계를 설명합니다:
- 상태는 특정 시점의 앱 상태를 설명합니다.
- UI는 해당 상태를 기반으로 렌더링됩니다.
- 무언가가 발생하면(예: 사용자가 버튼을 클릭), 발생한 일을 기반으로 상태가 업데이트됩니다.
- UI는 새로운 상태를 기반으로 다시 렌더링됩니다.

Redux의 경우, 이러한 단계를 더 자세히 나눌 수 있습니다:

- 초기 설정:
  - Redux 스토어는 루트 리듀서 함수를 사용하여 생성됩니다.
  - 스토어는 루트 리듀서를 한 번 호출하고, 반환된 값을 초기 상태로 저장합니다.
  - UI가 처음 렌더링될 때, UI 컴포넌트는 Redux 스토어의 현재 상태에 접근하고, 해당 데이터를 사용하여 렌더링할 내용을 결정합니다.  또한, 상태 변경을 알기 위해 스토어 업데이트를 구독합니다.

- 업데이트:
  - 앱에서 무언가가 발생합니다(예: 사용자가 버튼을 클릭).
  - 앱 코드는 Redux 스토어에 액션을 디스패치합니다(예: `dispatch({type: 'counter/incremented'})`).
  - 스토어는 이전 상태와 현재 액션을 사용하여 리듀서 함수를 다시 실행하고, 반환된 값을 새로운 상태로 저장합니다.
  - 스토어는 구독된 모든 UI 부분에 스토어가 업데이트되었음을 알립니다.
  - 스토어에서 데이터를 필요로 하는 각 UI 컴포넌트는 필요한 상태 부분이 변경되었는지 확인합니다.
  - 데이터가 변경된 것을 확인한 각 컴포넌트는 새로운 데이터로 다시 렌더링하여 화면에 표시되는 내용을 업데이트합니다.



# What You've Learned

## Summary

- Redux의 의도는 세 가지 원칙으로 요약될 수 있습니다:
  - 전역 앱 상태는 단일 스토어에 저장됩니다.
  - 스토어 상태는 앱의 나머지 부분에 대해 읽기 전용입니다.
  - 리듀서 함수는 액션에 응답하여 상태를 업데이트하는 데 사용됩니다.
- Redux는 "단방향 데이터 흐름" 앱 구조를 사용합니다.
  - 상태는 특정 시점의 앱 상태를 설명하며, UI는 해당 상태를 기반으로 렌더링됩니다.
  - 앱에서 무언가가 발생하면:
    - UI는 액션을 디스패치합니다.
    - 스토어는 리듀서를 실행하고, 발생한 일을 기반으로 상태를 업데이트합니다.
    - 스토어는 상태가 변경되었음을 UI에 알립니다.
  - UI는 새로운 상태를 기반으로 다시 렌더링됩니다.