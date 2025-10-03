# Build stage
FROM rust:1.90-bullseye AS builder

WORKDIR /app
COPY . .

RUN cargo build --release

# Final stage - Usar Ubuntu 24.04 que tiene libc6 más nuevo
FROM ubuntu:24.04

WORKDIR /app

# Instalar dependencias
RUN apt-get update && apt-get install -y \
    wget \
    && rm -rf /var/lib/apt/lists/* \
    && apt-get clean

# Descargar e instalar el paquete .deb de Quetzal
RUN wget https://github.com/AntaresGT/lenguaje-quetzal/releases/download/v0.0.2-alfa.2/lenguaje-quetzal_amd64.deb -O quetzal.deb \
    && apt-get install -y ./quetzal.deb \
    && rm quetzal.deb

# Verificar la instalación
RUN quetzal --version

COPY --from=builder /app/target/release/patiodejuegoQZB /app/server

EXPOSE 3501
CMD ["./server"]