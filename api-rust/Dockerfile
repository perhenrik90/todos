FROM rustlang/rust:nightly-stretch

WORKDIR /usr/src/api-rust
COPY . .

RUN rm *.lock && cargo install --path .
CMD ["target/release/api-rust"]