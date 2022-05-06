const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();

server.use(middlewares);

router.render = (req, res) => {
  res.jsonp({
    data: res.locals.data,
    currentPage: 1,
    numberOfPages: 20,
  });
};

server.use(router);
server.listen(3001, () => {
  console.log('JSON Server is running');
});
