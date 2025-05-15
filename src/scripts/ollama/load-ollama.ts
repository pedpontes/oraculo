import 'module-alias/register';

import { AxiosHelper } from '@/services/implementations/axios/axios';
import { OllamaHelper } from '@/services/implementations/ollama/ollama';

(async () => {
  const completion = new OllamaHelper(new AxiosHelper());

  try {
    const response = await completion.loadChatCompletions({
      messages: [
        {
          content: 'Ola, Tudo bem?',
          role: 'user',
        },
      ],
      model: 'openchat',
    });

    console.log('Response: ', JSON.stringify(response, null, 2));
  } catch (error) {
    console.error('Error: ', error);
  }
})();
