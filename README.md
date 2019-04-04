# Desafio StarQuiz

O desafio consiste em um jogo (quiz) sobre os personagens de Star Wars.

Demonstração completa: https://econsolo.github.io

### Tecnologias utilizadas

1) [Angular 7.x](https://angular.io/)
2) [Angular Material 7.x](https://material.angular.io/)
3) [Sweet Alert](https://sweetalert.js.org/)

### Iniciar o projeto

O projeto requer [Node.js](https://nodejs.org/) instalado para rodar.
Garanta que há uma variável de ambiente para o _npm (Gerenciador de Pacotes do Node)_.

Clonar o projeto:
```sh
$ git clone https://github.com/econsolo/star-quiz.git
```

Instalar as dependências do package.json e rodar (desenvolvimento)

```sh
$ cd star-quiz
$ npm install
$ ng serve
```

### O que há no projeto?


- [x] Compatível com mobile (responsivo)
- [x] Tela inicial contendo instruções para o jogador
- [x] Cronômetro com 2 minutos para jogar
- [x] Imagem do personagem através do [Google Custom Search API](https://developers.google.com/custom-search/)
- [x] Popup com dicas sobre cada personagem
- [x] Popup para adivinhar o nome de cada personagem
- [x] Paginação dos personagens
- [x] Calculador de pontuação ao final do jogo
- [x] Popup para coletar Nome e E-mail do jogador e sua pontuação final
- [x] Tela com apresentação de todos os jogadores e sua pontuação final (localStorage)
- [x] Preparado para o [PWA](https://developers.google.com/web/fundamentals/codelabs/your-first-pwapp/?hl=pt-br)
- [x] Requisições para a [SWAPI](https://swapi.co/) cacheáveis (quando disponível o service-worker)


### Dificuldades/Problemas

1) A busca de imagens pode apresentar instabilidade por motivos desconhecidos. A API utilizada foi Google Cloud Search utilizando o nome do personagem como palavra chave.
2) Algumas imagens podem variar a cada vez que é solicitada.
3) Algumas imagens podem não fazer sentido com a palavra chave.
4) No desenvolvimento, ocorreu problemas como estouro do limite diário de requisições e Http error 503 [(BackendError)](https://cloud.google.com/resource-manager/docs/core_errors)
