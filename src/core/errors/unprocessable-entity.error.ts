export class UnprocessableEntityError extends Error {
  constructor(message?: string) {
    super(message || 'Entidade não processável')
  }
}
