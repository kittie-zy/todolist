import { useState, useEffect } from 'react';
import TodoInput from './components/TodoInput';
import TodoList from './components/TodoList';
import './App.css'
import { TextInput } from '@vapor-ui/core';
import { VStack, Text } from '@vapor-ui/core';

function App() {
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem("todos");
    return storedTodos ? JSON.parse(storedTodos) : [];
  });

  useEffect(() => {
    // todos 변경될 때마다 useEffect가 실행하여 로컬 스토리지 업데이트
    localStorage.setItem('todos', JSON.stringify(todos));
    // 로컬스토리지에 todos라는 객체를 찾아가 todos로 들어온 값을 문자열(string) 형태로 변환해서 저장
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, {
      id: Date.now(),
      text,
      completed: false
    }]);
  };

  /**
   * U 업데이트 - 변경된 텍스트 반영
   * @param {*} id todo의 고유 값
   * @param {*} updatedText 업데이트 반영 할 텍스트
   */
  const updateTodo = (id, updatedText) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, text: updatedText } : todo)));
    /* .map() 기록 되어있는 todos를 순회하면서 동일한 행동을 해, 각 할일은 todo라고 할게
    (삼항연산자) 현재 순회 중인 todos에서 todo가 변경된 텍스트를 반영할 아이템이라면
    (true) ...todo 전개구문을 이용해서 객체의 모든 속성을 복사하고, text 속성만 새로운 텍스트로 변경해
    (false) 기존 todo 그대로 둬 */
  };
  /**
   * U 업데이트 - 완료여부를 토글하는 핸들러 함수
   * @param {*} id todo의 고유 값
   */
  const toggleComplete = (id) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo)));
    /* .map() 기록 되어있는 todos를 순회하면서 동일한 행동을 해, 각 할일은 todo라고 할게
    (삼항연산자) 현재 순회 중인 todo가 완료여부를 표시하려는 아이템이라면
    (true) ...todo 전개구문을 이용해서 객체의 모든 속성을 복사하고, completed 속성만 반전해
    (false) 기존 todo 그대로 둬 */
  };

  /**
   * D 삭제
   * @param {*} id todo의 고유 값
   */
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
    /* .filter() 주어진 조건을 만족하는 요소들로만 새로운 배열을 생성
    삭제하려는 todo의 id가 파라미터로 들어가고
    그 id와 같지 않은 todo만 모아서 배열생성하여 setTodos()로 부모상태 업데이트
    => 그 id값을 가진 todo는 제외시켜 */
  };

  // 검색기능 구현하기
  const [searchQuery, setSearchQuery] = useState(""); // 검색결과만 추릴 상태값 선언
  const filteredTodos = searchQuery
    ? todos.filter((todo) => todo.text.toLowerCase().includes(searchQuery.toLowerCase()))
    : todos;
  // .toLowerCase()는 전부 소문자 처리하는 메서드 => 검색이 대소문자 구분안하고 광범위하게 되도록 만드는 과정

  return (
    <VStack 
    $css={{ 
      maxWidth: '500px',
      margin: '50px auto',
      padding: '40px',
      backgroundColor: 'white', 
      borderRadius: '24px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      gap: '$200' 
    }}
  >
      <Text typography="h1"
      $css={{
        textAlign: 'center', 
        marginBottom: '$150',
        fontWeight: 'bold',
        color: '$basic-black'
        }}>
      민진이의 To-do List
      </Text>

      <TodoInput addTodo={addTodo} />
      <TodoList
        todos={filteredTodos}
        // todos={todos}
        updateTodo={updateTodo}
        toggleComplete={toggleComplete}
        deleteTodo={deleteTodo}
      />

      {/* 검색기능 */}
      <VStack 
      $css={{ 
        marginTop: '$300', 
        paddingTop: '$200', 
        borderTop: '1px solid $slate20' 
      }}
      >
        <TextInput
          type="search"
          placeholder="할 일을 검색할 수 있어요"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}

          $css={{width:'100%'}}
        />
      </VStack>
    </VStack>
  );
};

export default App;
