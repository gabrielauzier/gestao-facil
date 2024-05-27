export class UnexpectedError extends Error {
  constructor() {
    super(`Algo de errado aconteceu. Tente novamente em breve. `)
    this.name = 'UnexpectedError'
  }
}

export const UnexpectedErrorMessage = {
  message: 'Algo de errado aconteceu. Tente novamente em breve. ',
}
