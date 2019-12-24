import styled from 'styled-components';

export const SubmitContainer = styled.div`
  border: solid 1px #c1c1c1;
  border-radius: 3px;
  padding: 16px;
  width: 300px;
  text-align: center;
  box-shadow: 1px 1px #c1c1c1;
  margin-right: 56px;
`;
export const InputContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 8px auto;
`;
export const Label = styled.label`
  font-size: 18px;
  line-height: 30px;
  margin-right: 16px;
`;
export const Input = styled.input`
  width: 100px;
  height: 30px;
  border: solid 1px #c1c1c1;
  border-radius: 3px;
  font-size: 18px;
`;
export const Submit = styled.button`
  margin-top: 24px;
  background-color: transparent;
  border: none;
  cursor: pointer;
  outline: none;
  padding: 0;
  appearance: none;

  transition: all 0.1s ease-out;
  border: solid 1px #00bfff;
  border-radius: 3px;
  width: 80%;
  height: 30px;
  background-color: #00bfff;
  font-size: 13px;
  color: white;
  box-shadow: 2px 2px #c1c1c1;

  &:active {
    box-shadow: none;
  }
`;

export const ErrorText = styled.p`
  margin: 0;
  padding: 0;
  font-size: 24px;
  color: #dc143c;
  text-align: center;
`;
