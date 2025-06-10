FROM ubuntu:22.04

# Instala dependências
RUN apt-get update && apt-get install -y \
    git \
    cmake \
    build-essential \
    wget \
    curl \
    libcurl4-openssl-dev \
    && rm -rf /var/lib/apt/lists/*

# Clona o repositório do llama.cpp
RUN git clone https://github.com/ggerganov/llama.cpp.git
WORKDIR /llama.cpp

# Compila o projeto incluindo o llama-server
RUN mkdir build && cd build && cmake .. && cmake --build . --config Release -j$(nproc)

# Cria uma pasta para os modelos
RUN mkdir /models

# # Exponha a porta do servidor
# EXPOSE 8080

# # Comando para rodar o servidor
# CMD ["./build/bin/llama-server", "-m", "/models/mistral.gguf", "-c", "4096"]
