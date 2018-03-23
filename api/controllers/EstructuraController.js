/**
 * EstructuraController
 *
 * @description :: Server-side logic for managing Estructuras
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
  index: function(req, res){
    Estructura.find({ nombre: { contains: 'Departamento' } }).populate('jefe').exec(function(err, departamentos){
      if(err){
        res.serverError(err);
      }
      res.view('departamento/show', {departamentos: departamentos});
    });
  },

	indexJefe: function(req, res){
    Estructura.find({ nombre: { contains: 'Departamento' } }, {select: ['nombre','idEstructura']}).exec(function(err, departamentos){
      if(err){
        res.serverError(err);
      }
      res.view('departamento/showJefe', {departamentos: departamentos});
    });
  },

  menu: function(req, res){
    Estructura.findOne({idEstructura: req.param('id')}, {select: ['nombre']}).exec(function(err, departamento){
      if(err){
        res.serverError(err);
      }
      res.view('departamento/menu', {departamento: departamento});
    });
  }
};

