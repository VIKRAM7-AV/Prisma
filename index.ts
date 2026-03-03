import 'dotenv/config'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { PrismaClient } from '@prisma/client'

const adapter = new PrismaBetterSqlite3({
    url: process.env.DATABASE_URL || 'file:./dev.db'
})

const prisma = new PrismaClient({ adapter })

async function main() {
    const user = await prisma.user.create({
        data: {
            email: 'Vikramria@gmail.com',
            name: 'Vikram'
        }
    })

    const users =await prisma.user.findMany({
        include:{
            articles:true
        }
    })

    users.forEach((user)=>{
        console.log(`${user.name} has written the following articles: `)
        user.articles.forEach((article)=>{
            console.log(` - ${article.title}`)
        })
    })

    const user =await prisma.user.update({
        where:{
            id:4
        },
        data:{
            name:"Vikram Swetha"
        }
    })

    const user= await prisma.user.delete({
        where:{
            id:1
        }
    })

    console.log(users)

    const article = await prisma.article.create({
        data:{
            title:"Vikram First Article",
            body:"Vikram Poster",
            author:{
                connect:{
                    id:4
                }
            }
        }
    })

    console.log(article)
}

const articles= await prisma.article.findMany()

console.log(articles)

const article =await prisma.user.create({
    data:{
        email:"VikraSwe@gmail.com",
        name:"Vikram Swe",
        articles:{
            create:{
                title:"Vikram Swe First Article",
                body:"Vikram Swe Poster"
            }
        }
    }
})


main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
}) 