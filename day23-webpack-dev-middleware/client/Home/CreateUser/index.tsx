import React from 'react';
import { useEnhance } from './enhance';
import {
  SubmitContainer,
  InputContainer,
  Label,
  Input,
  Submit,
  ErrorText,
} from './styles';

export const CreateUser = () => {
  const {
    name,
    password,
    setName,
    setPassword,
    submit,
    errorMsg,
  } = useEnhance();
  return (
    <SubmitContainer>
      {errorMsg && <ErrorText>{errorMsg}</ErrorText>}
      <InputContainer>
        <Label>UserName</Label>
        <Input
          type='text'
          value={name}
          onChange={e => setName(e.currentTarget.value)}
        />
      </InputContainer>
      <InputContainer>
        <Label>Password</Label>
        <Input
          type='text'
          value={password}
          onChange={e => setPassword(e.currentTarget.value)}
        />
      </InputContainer>
      <Submit onClick={() => submit(name, password)}>Submit</Submit>
    </SubmitContainer>
  );
};
