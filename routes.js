const express = require('express');
const csrf = require('csurf');
const routes = express.Router();
const {environment} = require('./config');
const db = require('./db/models');
const router = express.Router();

const csrfProtection = csrf({
    cookie: true
});



const asyncHandler = handler =>{
    return (res, req, next)=>{
        return handler(res, req, next).catch(next)
    }
}

routes.get("/", asyncHandler( async(req, res) => {
    res.render("index", {title: "Home"})
}));


routes.get("/parks", asyncHandler(async (req,res)=>{
    const parks = await db.Park.findAll({
        order: [
            ['parkName', 'DESC']
        ],
    });
    res.render('park-list', {
        title: 'Parks',
        parks: parks
    } )

}));

routes.get("/park/:id(\\d+)", asyncHandler( async(req, res)=>{
    const id = parseInt(req.params.id, 10);
    const park = await db.Park.findByPk(id);
    res.render('park-detail', {
        title: "Park Detail",
        park:park         
    })

}));

routes.get('/park/add', csrfProtection, (req, res) => {

  const park =  db.Park.build();
  res.render('park-add',{
    title:"Add Park",
    csrfToken: req.csrfToken(),
    park: park
  })
});

routes.post('/park/add', csrfProtection, asyncHandler( async (req,res)=>{
    const {parkName, city, provinceState, country, opened, size, description} = req.body;
    const newPark = {parkName, city, provinceState, country, opened, size, description};
    const park = await db.Park.create(newPark);
    res.redirect("/");
}))

routes.get('/park/edit/:id(\\d+)',  csrfProtection, asyncHandler( async (req,res)=>{
    const id = parseInt(req.params.id, 10);
    const park = await db.Park.findByPk(id);
    console.log(park)
    res.render('park-edit', {
        title: "Edit Park",
        csrfToken: req.csrfToken(),
        park: park
    })
}));

routes.post('/park/edit/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const {parkName, city, provinceState, country, opened, size, description} = req.body;
    const updatedPark = {parkName, city, provinceState, country, opened, size, description,
        updatedAt: new Date()
    };
    await db.Park.update(updatedPark, {
        where: {id: id}
    })
    res.redirect("/parks")
}));

routes.get('/park/delete/:id(\\d+)', csrfProtection, asyncHandler( async (req,res)=>{
    const id = parseInt(req.params.id, 10);
    const deletePark = await db.Park.findByPk(id);
    res.render('park-delete', {
        title: "Delete Park",
        park: deletePark,
        csrfToken: req.csrfToken()
    })
}));
routes.post('/park/delete/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id, 10);
    const deletePark = await db.Park.findByPk(id);
    await deletePark.destroy();
    res.redirect('/parks');
}));


if (environment !== "production") {
  routes.get("/error-test", () => {
    throw new Error("This is a test error.");
  });
}

module.exports = routes;
