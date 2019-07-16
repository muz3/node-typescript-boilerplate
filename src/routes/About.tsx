import React from 'react';
import Heading from '@src/components/base/Typography/Heading';
import Text from '@src/components/base/Typography/Text';
import { NavLink } from 'react-router-dom';
import { Button } from '@src/components/base/Button/Button';
import Flex from '@src/components/base/Grid/Flex';

const About = () => (
  <div>
    <Flex mt={2}>
      <Heading>About</Heading>
      <Button border={0} padding={0}>
        <NavLink to="/">Back</NavLink>
      </Button>
    </Flex>
    <hr />
    <Text>React Starter Kit</Text>
    <Text>An app built by Guangda Zhang</Text>
  </div>
);

export default About;
