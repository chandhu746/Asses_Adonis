import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class Book extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public bookId: number

  @column()
  public bookTitle:string

  @column()
  public author: string

  @column()
  public language: string

  // @column()
  // public publishedDate: DateTime

  @column()
  public publishedBy: string

  @column()
  public genre: string


  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
