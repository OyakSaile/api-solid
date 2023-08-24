import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { UserAlreadyExistsError } from '@/use-cases/errors/users-already-exists-error'
import { makeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
export const register = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  const registrationSchema = z.object({
    email: z.string().email(),
    name: z.string().min(6),
    password: z.string(),
  })

  const { email, name, password } = await registrationSchema.parse(request.body)

  try {
    const registerUseCase = makeRegisterUseCase()

    await registerUseCase.execute({ email, name, password })
  } catch (err) {
    if (err instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: err.message })
    }

    throw err
  }
}
