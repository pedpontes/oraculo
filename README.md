### Oráculo: Conversasão com assistente IA

#### Objetivo do projeto:

Um dispositivo simples para fins educacionais e para o público infantil, no qual o usuário vai iniciar uma conversa verbal através de um dispositivo movel, afim de receber uma resposta a altura como um assistente de voz.

#### Stacks:

- Fastify
- Fastify (WebSocket)
- Axios (Client HTTP)

#### Serviços:

- OpenAi
- Eleven Labz

#### Como iniciar:

- Verifique as variaveis de ambiente `.env.example`.
- Instale as dependencias através do `yarn`
- Inicie em modo dev com `yarn dev`

#### Testando `chat completion` (texto):

- Inicie o serviço como destacado em `Como iniciar`
- Abra um novo terminal e execute `yarn test:ws`
- Comece a conversar com seu assistente via texto.
