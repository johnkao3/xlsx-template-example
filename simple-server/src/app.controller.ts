import { Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import * as XlsxTemplate from 'xlsx-template';
import * as fs from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('xlsx')
  postXlsx(): void {
    const file = fs.readFileSync('./template/template.xlsx');
    const template = new XlsxTemplate(file);
    // Replacements take place on first sheet
    const sheetNumber = 1;

    // Set up some placeholder values matching the placeholders in the template
    const values = {
      extractDate: new Date(),
      dates: [
        new Date('2013-06-01'),
        new Date('2013-06-02'),
        new Date('2013-06-03'),
      ],
      people: [
        { name: 'John Smith', age: 20 },
        { name: 'Bob Johnson', age: 22 },
      ],
    };

    // Perform substitution
    template.substitute(sheetNumber, values);

    // Get binary data
    const data = template.generate({
      type: 'nodebuffer',
    });
    return data;
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
