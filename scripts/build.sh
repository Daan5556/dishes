source .env

pnpm install

pnpm run build

cp -r _site/* $OUTPUT_DIR
