import { Container, Heading, SimpleGrid } from '@chakra-ui/react';
import DarkModeIconButton from './components/DarkModeIconButton';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import Column from './components/Column';
import { EColumnType } from './utils/enums';

const App = () => {
  return (
    <>
      <Heading fontSize={{ base: '4xl', sm: '5xl', md: '6xl' }} fontWeight="bold" textAlign="center" my={10}>
        Welcome to DnD Kanban
      </Heading>
      <DarkModeIconButton position="fixed" bottom={10} right={10} zIndex={999} />
      <DndProvider backend={HTML5Backend}>
        <Container maxWidth="container.lg" px={4} py={10}>
          <SimpleGrid columns={{ base: 1, md: 4 }} spacing={{ base: 16, md: 4 }}>
            <Column column={EColumnType.TO_DO} />
            <Column column={EColumnType.IN_PROGRESS} />
            <Column column={EColumnType.BLOCKED} />
            <Column column={EColumnType.COMPLETED} />
          </SimpleGrid>
        </Container>
      </DndProvider>
    </>
  );
};

export default App;
