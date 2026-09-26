class Catalog {

    async renderCatalog(req,res,next){
        const path = req.app.locals.services.home.createPath('catalog');
        const category = await req.app.locals.services.home.getDataBase('Shop','category');

        return res.render(path,{category})
    }
    

}

module.exports.CatalogController = new Catalog();