source .env
eval "$(/root/.local/share/fnm/fnm env)"

git pull --ff-only

pnpm install

rm -fr _site/

pnpm run build

cp -r _site/* $OUTPUT_DIR
