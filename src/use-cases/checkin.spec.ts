import { it, describe, expect, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from './check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-in-repository'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase
describe('Checkin Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should  be able to create check in', async () => {
    const { checkIn } = await sut.execute({
      gymId: 'gymId',
      userId: 'userId',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to create check in twice times in the same day', async () => {
    vi.setSystemTime(new Date(2022, 1, 1, 8, 0, 0))

    await sut.execute({
      gymId: 'id-id',
      userId: 'user-id',
    })

    await expect(
      sut.execute({
        gymId: 'id-id',
        userId: 'user-id',
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
