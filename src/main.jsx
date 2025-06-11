import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { Notifications } from '@mantine/notifications';
import { createRoot } from 'react-dom/client';
import App from './App';

createRoot(document.getElementById('root')).render(
  <MantineProvider withNormalizeCSS withGlobalStyles>
    <Notifications />
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </MantineProvider>
);


