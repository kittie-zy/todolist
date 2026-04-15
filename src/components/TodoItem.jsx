import { useState } from 'react';
import { Checkbox, HStack, Text, Button, TextInput } from '@vapor-ui/core';
import { 
  EditOutlineIcon, 
  TrashOutlineIcon, 
  ConfirmOutlineIcon, 
  CloseOutlineIcon 
} from '@vapor-ui/icons';

function TodoItem({ todo, updateTodo, toggleComplete, deleteTodo }){
  const [isEditing, setIsEditing] = useState(false);
  // 수정상태 여부를 초기값으로 상태에 설정
  const [editText, setEditText] = useState(todo.text);
  // 기존 todo에 기록된 텍스트를 초기값으로 상태에 설정
  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      // isEditing이 true이고 editText가 존재한다면 App에 선언한 updateTodo(해당todo고유 아이디값, 변경된내용)를 실행해
      updateTodo(todo.id, editText);
    }
    setIsEditing(!isEditing);
    // 수정상태를 반대로 돌려
  };

  return (
    <HStack
      $css={{
        padding: '$100 $150',
        backgroundColor: '$slate10',
        borderRadius: '$md',
        marginBottom: '$50',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
      }}>

    <HStack $css={{ gap: '$100', alignItems: 'center', flex: 1 }}>
      <Checkbox.Root
          checked={todo.completed}
          onCheckedChange={() => toggleComplete(todo.id)}
        />

      {isEditing ? (
          <TextInput
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            $css={{ flex: 1 }}
            size="md"
          />
        ) : (
          <Text
            typography="body1"
            $css={{
              textDecoration: todo.completed ? 'line-through' : 'none',
              color: todo.completed ? '$slate50' : '$slate100',
              cursor: 'pointer'
            }}
            onClick={() => toggleComplete(todo.id)}
          >
            {todo.text}
          </Text>
        )}
      </HStack>

      <HStack $css={{ gap: '$50' }}>
        {/* 수정/확인 버튼 */}
        <Button variant="ghost" size="sm" onClick={handleEdit}>
          {isEditing ? (
            <ConfirmOutlineIcon size={20} color="green" /> // 수정 중이면 체크 아이콘
          ) : (
            <EditOutlineIcon size={20} /> // 평소엔 연필 아이콘
          )}
        </Button>

        {/* 삭제 버튼 */}
        <Button variant="ghost" size="sm" onClick={() => deleteTodo(todo.id)}>
          <TrashOutlineIcon size={20} color="red" />
        </Button>
      </HStack>
    </HStack>
  );
}
    

export default TodoItem;
