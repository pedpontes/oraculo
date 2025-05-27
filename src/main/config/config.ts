import dotenv from 'dotenv';

const envFound = dotenv.config();

if (envFound.error) {
  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || 8080,
  openAi: {
    apiKey: process.env.OPENAI_API_KEY || '',
    baseApiUrl: process.env.OPENAI_API_BASE_URL || 'https://api.openai.com/v1',
  },
  mistralUrl: process.env.MISTRAL_7B_URL || '',
};
