import { CheckIn, Prisma } from '@prisma/client'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'crypto'

export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckIn[] = []

  async findByUserIdOnDate(userId: string, date: Date) {
    const checkOnSameDate = this.items.find(
      (checkin) => checkin.user_id === userId,
    )

    if (!checkOnSameDate) {
      return null
    }

    return checkOnSameDate
  }

  async create(data: Prisma.CheckInUncheckedCreateInput) {
    const checkIn = {
      id: randomUUID(),
      user_id: data.user_id,
      gym_id: data.gym_id,
      validated_at: data.validated_at ? new Date() : null,
      created_at: new Date(),
    }
    this.items.push(checkIn)

    return checkIn
  }
}
