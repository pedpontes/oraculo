FROM ubuntu:22.04

# Instalar dependências
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    cmake \
    git \
    wget \
    curl \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Clonar o llama.cpp
RUN git clone https://github.com/ggerganov/llama.cpp.git /llama.cpp

# Compilar o servidor com suporte AVX2
WORKDIR /llama.cpp
RUN make -j $(nproc) server

# Criar diretório para os modelos
RUN mkdir -p /models

# Definir porta do servidor HTTP
EXPOSE 8000

# Comando de inicialização
CMD ["./server", "-m", "/models/mistral-7b-instruct-v0.1.Q4_K_M.gguf", "-c", "4096"]