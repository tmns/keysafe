import polka from 'polka';

async function start() {
  function one(req, res, next) {
    req.hello = 'world';
    next();
  }
  
  function two(req, res, next) {
    req.foo = '...needs better demo';
    next();
  }
  
  polka()
    .use(one, two)
    .get('/users/:id', (req, res) => {
      console.log(`-> Hello, ${req.hello}`);
      res.end(`User: ${req.params.id}`);
    })
    .listen(3000, err => {
      if (err) throw err;
      console.log('> Running on localhost:3000');
    });  
}

export default start;