fetch('https://www.googleapis.com/books/v1/volumes?q=quilting')
    .then(resp => {
        return resp.json();
    })
    .then(booksInfo => {
        console.log(booksInfo);
    })
    .catch(err => {
        console.log('Niestety, błąd!', err);
    });