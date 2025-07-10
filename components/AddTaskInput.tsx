import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

type AddTaskInputProps = {
  onAdd: (text: string) => void;
};

export default function AddTaskInput({ onAdd }: AddTaskInputProps) {
  const [text, setText] = useState('');

  const handleAdd = () => {
    if (text.trim().length === 0) return;
    onAdd(text.trim());
    setText('');
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="New Task"
        value={text}
        onChangeText={setText}
        style={styles.input}
      />
      <Button title="Add" onPress={handleAdd} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // marginVertical: 8,
    // paddingHorizontal: 10,
    alignItems: 'center'
    
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginRight: 10,
    fontSize: 16,
  },
});
