import { UsersRepository } from '@/repositories/users-repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from './errors/users-already-exists-error'

interface RegisterUseCaseRequest {
  email: string
  name: string
  password: string
}

export class RegisterUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({ email, name, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)

    const alreadyHaveAccountCreated =
      await this.usersRepository.findByEmail(email)

    if (alreadyHaveAccountCreated) {
      throw new UserAlreadyExistsError()
    }

    await this.usersRepository.create({
      email,
      name,
      password_hash,
    })
  }
}
