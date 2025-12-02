source .env

pnpm install

pnpm run build

rm -fr _site/

cp -r _site/* $OUTPUT_DIR
