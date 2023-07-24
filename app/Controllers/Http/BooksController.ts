import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import {schema } from '@ioc:Adonis/Core/Validator'
import Book from 'App/Models/Book'
export default class BooksController {

    public async index(){
        return Book.all()
    } 

    public async store({request} : HttpContextContract){

        const newSchema = schema.create({
            bookId: schema.number(),
            bookTitle: schema.string(),
            author: schema.string(),
            language:schema.string(),
            // publishedDate:schema.date(),
            publishedBy:schema.string(),
            genre:schema.string(),

        });

const payload = await request.validate({schema: newSchema});

const learns = await Book.create(payload);
return learns;
 }
        


public async update({params , request}: HttpContextContract){
    // const body = request.body();
    

    try{
        const updateSchema = schema.create({

            bookId: schema.number(),
            bookTitle: schema.string(),
            author: schema.string(),
            language: schema.string(),
            publishedBy: schema.string(),
            genre:schema.string()
        })
        const payload = await request.validate({schema: updateSchema})
        const learn = await Book.findOrFail(params.id)
    console.log(learn);
    learn.bookId = payload.bookId
    learn.bookTitle = payload.bookTitle
    learn.author = payload.author
    learn.language = payload.language
    // learn.publishedDate= body.publishedDate
    learn.publishedBy = payload.publishedBy
    learn.genre = payload.genre

    await learn.save();

    return "Updated"
}catch(error){
    return error
}


}
public async displaybooks({}:HttpContextContract)
   {
    const display = await Book.all()
    return display;
}

public async searchByQuery({ request }: HttpContextContract) {
    const { searchQuery } = request.all();

    const searchSchema = schema.create({
      searchQuery: schema.string(),
    });

    const validatedQuery = await request.validate({ schema: searchSchema });

    const { searchQuery: query } = validatedQuery;

    const searchResults = await Book.query()
      .where('bookTitle', 'ILIKE', `%${query}%`)
      .orWhere('author', 'ILIKE', `%${query}%`)
      .orWhere('language', 'ILIKE', `%${query}%`)
      .orWhere('publishedBy', 'ILIKE', `%${query}%`)
      .orWhere('genre', 'ILIKE', `%${query}%`)
      .select('*'); // Optionally, you can choose the specific columns you want to retrieve

    return searchResults;
  }

//   public async searchbooks({ request }: HttpContextContract) {
//     const searchTerm = request.input('term');
//     //const searchTermInt = parseInt(searchTerm);
//     const book = await Book.query()
//       .where('bookTitle', 'ilike', `%${searchTerm}%`)
//       .orWhere('author','ilike', `%${searchTerm}%`)
//       .orWhere('genre', 'ilike', `%${searchTerm}%`)
//       .select('*')
//       .exec();
  
//     return book;
//   }


  public async delete({params}: HttpContextContract){
    const learns =  await Book.findOrFail(params.id);
   await learns.delete();
   return 'Deleted Succesfully';
}


public async selectById({params}:HttpContextContract)
{
    const book = await Book.findBy('id',params.id)
    if(book == null){
        return "No ID Found!!"
    }else{
    return book
}
}

public async updated({params, request} : HttpContextContract){
    const body = request.body();

    const learn = await Book.findOrFail(params.id);

    learn.bookId=body.bookId
    learn.bookTitle = body.bookTitle
    learn.author = body.author
    learn.language = body.language
    learn.publishedBy = body.publishedBy
    learn.genre = body.genre
    await learn.save();

    return learn;
}




  

}






