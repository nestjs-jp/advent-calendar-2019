import React from 'react';
import { useEnhance } from './enhance';
import {
  SubmitContainer,
  InputContainer,
  Label,
  Input,
  Submit,
  DataContainer,
  Key,
  Data,
  User,
} from './styles';

export const SearchUserById = () => {
  const { findUserById, foundUser, userId, setUserId } = useEnhance();
  return (
    <SubmitContainer>
      <InputContainer>
        <Label>UserId</Label>
        <Input
          type='number'
          min='1'
          onChange={e => setUserId(parseInt(e.currentTarget.value, 10))}
        />
      </InputContainer>
      <Submit onClick={() => findUserById(userId)}>Submit</Submit>
      <User>
        <DataContainer>
          <Key>id</Key>
          <Data>{foundUser.id}</Data>
        </DataContainer>
        <DataContainer>
          <Key>name</Key>
          <Data>{foundUser.name}</Data>
        </DataContainer>
      </User>
    </SubmitContainer>
  );
};
