cargo +nightly build --release --target wasm32-unknown-unknown \
&& wasm-bindgen target/wasm32-unknown-unknown/release/nzsc_web_cli.wasm --out-dir ./web-src/wasm/ \
&& npx webpack \
&& cp -a ./public/. ./build/
