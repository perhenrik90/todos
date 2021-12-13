FROM rustlang/rust:nightly-stretch

WORKDIR /usr/src/api-rust
COPY . .

RUN rm -f *.lock && cargo install --path .
CMD ["target/release/api-rust"]