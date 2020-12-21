const {Router} = require('express'); 
const router = Router();
const fs = require('fs');

const booksFile = fs.readFileSync("./books.json","utf8");
let books = JSON.parse(booksFile);

router.get("/",(req,res)=>{
    res.json("Bienvenido a mi API");
});

router.get("/books",(req,res)=>{
  res.status(200).json(books);
});

router.post("/books",(req,res)=>{
    
  const { title, author, year, pages, genre, cover} = req.body;

  if(!title || !author || !year || !pages || !genre || !cover ){
    res.status(401).json({error:"Por favor, diligencie todos los datos"});
  }else{

  const id = books.length + 1;


  let  newbooks = {
    id,
    title,
    author,
    year,
    pages,
    genre,
    cover
  };

  books.push(newbooks);
  const json_books = JSON.stringify(books);

  fs.writeFileSync("./books.json", json_books, "utf-8");

   res.status(200).json(books);

  }
});

router.put("/books/:id",(req,res)=>{

  const { title, author, year, pages, genre, cover}=  req.body;
  const id = req.params.id;
   
  if(!title || !author || !year || !pages || !genre || !cover || !id){
    res.status(401).json({error:"Debe completar los datos y especificar el id."});
  }else{
     
    books.filter((books)=>{

     if(books.id == id){
       books.title = title;
       books.author = author;
       books.year = year;
       books.pages = pages;
       books.genre = genre;
       books.cover = cover;
     }
    }); 

    const json_books = JSON.stringify(books);
    fs.writeFileSync("./books.json",json_books,"utf-8");

    res.status(200).json(books);


  }

  

});


router.delete("/books/:id",(req,res)=>{
    const id = req.params.id;

    if(!id){
      res.status(401).json({error: "Especifique un id"});
    }else{
      const indexbooks = books.findIndex((books) => books.id === id);
      books.splice(indexbooks,1);

      const json_books = JSON.stringify(books);
      fs.writeFileSync("./books.json", json_books,"utf-8");

      res.status(200).json(books);

     
    }

});



module.exports = router;