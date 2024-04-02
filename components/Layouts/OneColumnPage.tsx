import { Box, Container } from '@mantine/core';
import React, { ReactNode } from 'react';

interface OneColumnPageProps {
  children: ReactNode[];
}

const OneColumnPage: React.FC<OneColumnPageProps> = ({ children }: OneColumnPageProps) => {
  return (
    <Box>
      <Container size="xl" sx={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {children.map((child, index) => (
          <Box key={index}>{child}</Box>
        ))}
      </Container>
    </Box>
  );
};

export default OneColumnPage;
