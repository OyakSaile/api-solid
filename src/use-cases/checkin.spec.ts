import { it, describe, expect, beforeEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Checkin Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should  be able to create check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymId',
      userId: 'userId',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
