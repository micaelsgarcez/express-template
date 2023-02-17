import AdminJSExpress from '@adminjs/express'
import { Database, Resource } from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import { DMMFClass } from '@prisma/client/runtime'
import AdminJS from 'adminjs'
import express from 'express'

const PORT = process.env.port || 3000

const prisma = new PrismaClient()

AdminJS.registerAdapter({ Database, Resource })

const app = express()

// `_baseDmmf` contains necessary Model metadata. `PrismaClient` type doesn't have it included
const dmmf = (prisma as any)._baseDmmf as DMMFClass

const admin = new AdminJS({
  resources: [
    {
      resource: { model: dmmf.modelMap.Project, client: prisma },
      options: {}
    },
    {
      resource: { model: dmmf.modelMap.Challenge, client: prisma },
      options: {}
    },
    {
      resource: { model: dmmf.modelMap.ProjectStack, client: prisma },
      options: {}
    },
    {
      resource: { model: dmmf.modelMap.ChallengeStack, client: prisma },
      options: {}
    },
    {
      resource: { model: dmmf.modelMap.Tech, client: prisma },
      options: {}
    }
  ]
})

const router = AdminJSExpress.buildRouter(admin)

app.use(admin.options.rootPath, router)

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})

export default app
