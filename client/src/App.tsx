import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
        선택 과목이 함수는 돌연변이 함수가 실행되기 전에 실행되며 돌연변이 함수가 받는 것과 동일한 변수가 전달됩니다.돌연변이가 성공하기를 바라며 리소스에 대한 낙관적 업데이트를 수행하는 데 유용합니다.이 함수에서 반환된 값은 변형 실패 시 onError및 함수 모두에 전달되며 낙관적 업데이트를 롤백하는 데 유용할 수 있습니다.onSettled
        </p>
      </header>
    </div>
  );
}

export default App;
