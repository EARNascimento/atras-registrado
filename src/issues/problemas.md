# Problemas

## Descrição

Aqui vou listar alguns problemas que encontrei durante a codificação desse projeto.

### Typos / Erros de Digitação

Nessa branch `/config-rotas` foi uma chuva de erro de digitação que acabou me levando a revisar as mesmas linhas infinitas vezes, não sei como melhorar isso, mas a atenção tem que ficar redobrada.

### Responsabilidades no Express

Devo estudar mais sobre responsabilidades no Express, em algum dos arquivos eu utilizei o `app.get()` e `router.get()` ao mesmo tempo, o pior é que no final eu exportava o `router` e o `app` ficava boiando.

## Módulos X CommonJS

Outro momento que fiquei quebrando bastante a cabeça foi quando comecei a importar os módulos do `axios`, `dotenv`, `express`. O `package.json` foi criado com o `"type": "commonjs"`, mas em todos os módulos eu utilizei `import 'axios' from 'axios'`, ai o código não compilava dizendo que ou eu usava import ou eu usava outra maneira de trazer esses módulos para o código.

Devoe estudar a diferença entre Módulos ES6 e CommonJS e como trabalhar com eles dentro do código sem me confundir.

## Não ler a API direito

Errei na leitura da API tanto da Twitch quanto do IGDB, tenho que prestar mais atenção nisso. Um detalhe que estava quebrando meu código silenciosamente é errar o campo retornado pela API.
Vou tentar usar mais o `console.log(data)` daqui pra frente.