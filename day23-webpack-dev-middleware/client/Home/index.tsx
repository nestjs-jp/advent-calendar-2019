import React from 'react';
import { Container, Text, CardContainer } from './styles';
import { CreateUser } from './CreateUser';
import { SearchUserById } from './SearchUserById/index';

export const Home = () => {
  return (
    <Container>
      <Text>Hello webpack-dev-middleware and NestJS</Text>
      <CardContainer>
        <CreateUser />
        <SearchUserById />
      </CardContainer>
    </Container>
  );
};
