import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  try {
    const user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: 'password',
        name: 'Test User',
        role: 'ADMIN'
      }
    })
    console.log('User created:', user)
  } catch (e) {
    console.error('Error creating user:', e)
  } finally {
    await prisma.$disconnect()
  }
}

main()
