export class UnauthorizedError extends Error {
  constructor(messsage?: string) {
    super(messsage || 'unauthorized')
  }
}
