// src/components/TesteNotificacao.jsx

import { Button } from '@mantine/core';
import { showNotification } from '@mantine/notifications';

const TesteNotificacao = () => {
  return (
    <Button
      onClick={() =>
        showNotification({
          title: '✅ Teste de notificação',
          message: 'Se você está vendo isso, o Mantine está funcionando!',
          color: 'green',
        })
      }
    >
      Testar Notificação
    </Button>
  );
};

export default TesteNotificacao;
