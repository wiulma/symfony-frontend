# Row Frontend

## How to start
1. Start in dev mode
Open a terminal and execute:
```
npm run dev
```

2. Start in prod mode
```
npm run prod
```
## How to build frontend app
Open terminal and execute
```
npm run build
```

## Test builded version
Open terminal and execute
```
npx serve -l 8001 .\dist\
```

## Development
1. Debug webpack
```
node --inspect-brk ./node_modules/webpack/bin/webpack.js --config webpack.prod.js --verbose
```

## Links
1. [Bootstrap Material design components](https://fezvrasta.github.io/bootstrap-material-design/)