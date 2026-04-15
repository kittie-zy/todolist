import { useState } from 'react';
import { TextInput, Button, HStack } from '@vapor-ui/core';

const TodoInput = ({ addTodo }) => {

  const [input, setInput] = useState('');

  const handleAdd = () => {
    if (input.trim()) {
      addTodo(input);
      setInput('');
    }
  }

  // Enter 키 입력 감지
  const handleKeyDown = (e) => {
    if (e.keyCode === 229) return;
    // 맥에서 한글을 입력하는 동작(onKeyDown/Up)에서 함수 콜링이 두번 중첩되는 이슈가 있어 해결책 삽입
    if (e.key === 'Enter') handleAdd();
    // Enter를 누르면 할 일 추가
  };

  return (
    <>
    <HStack $css={{gap: '$100', marginBottom: '$-200'}}>
      <TextInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="오늘 해야하는 일을 등록해 주세요"
        $css={{flex: 1}}
      />
    
    <Button variant='fill' onClick={handleAdd}>
      할 일 등록
    </Button>
    </HStack>
    </>
  );
};

export default TodoInput;
