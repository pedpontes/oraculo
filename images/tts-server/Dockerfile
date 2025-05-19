FROM python:3.10-slim

RUN apt update && apt install -y espeak ffmpeg git libsndfile1
RUN pip install TTS

WORKDIR /app

CMD ["tts", "--model_name", "tts_models/pt/cv/vits", "--use_cuda", "true", "--port", "5002"]