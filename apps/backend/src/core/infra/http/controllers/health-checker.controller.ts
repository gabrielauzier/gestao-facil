import { Controller, Get } from '@nestjs/common'

@Controller('/')
export class HealthCheckerController {
  @Get()
  async handle() {
    return `Online`
  }
}
