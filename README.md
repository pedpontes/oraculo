### Oráculo: Conversasão com assistente IA

#### Objetivo do projeto:

Um dispositivo simples para fins educacionais e para o público infantil, no qual o usuário vai iniciar uma conversa verbal através de um dispositivo movel, afim de receber uma resposta a altura como um assistente de voz.

#### Stacks:

- Yarn
- TypeScript
- Node
- Fastify
- Fastify (WebSocket)
- Axios (Client HTTP)

#### Serviços:

- OpenAi
- Eleven Labz

#### Como iniciar:

- Verifique as variaveis de ambiente `.env.example`.
- Instale as dependencias através do comando `yarn`
- Inicie em modo produção com `yarn start` ou dev com `yarn dev`
- Se tudo estiver certo, acesse interface WEB pelo link `http://localhost:{PORT}/` (Verifique a porta no seu `.env`)

##### Setup com modelo IA offline:

- Model: `òpenchat` através do Ollama.

Requisitos:
 - Docker
Utilize o comando `docker-compose up --build`
