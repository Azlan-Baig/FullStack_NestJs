import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main(){

    await prisma.post.create({
        data : {
            title: 'First Post',
            description: 'This is the first post in our blog.',
            authorId: 1,
        }
    })    
}

main()
    .catch(e => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })