module.exports = {

	index: function(req, res){
    Materia.find().populate('departamento').sort('departamento DESC').exec(function(err, materias){
      if(err){
        res.serverError(err);
      }
      sails.log(materias);
      res.view('materia/show', {materias: materias});
    });
  },

  available_Departamento: function(req, res){
    Estructura.find({ nombre: { contains: 'Departamento' } }, {select:['idEstructura', 'nombre']}).exec(function(err, departamentos){
      if(err){
        res.serverError(err);
      }
      res.view('materia/add', {departamentos: departamentos});
    });
  },

  add: function(req, res){
    Materia.create(req.allParams()).exec(function(err, created){
      if(err){
        res.serverError(err);
      }
      res.redirect('/showMaterias');
    });
  },

  edit: function(req, res){
    Materia.findOne({idMateria: req.param('id')}).exec(function(err, materia){
      if(err){
        res.serverError(err);
      }Estructura.find({ nombre: { contains: 'Departamento' } }, {select:['idEstructura', 'nombre']}).exec(function(err, departamentos){
        if(err){
          res.serverError(err);
        }
        sails.log(departamentos);
        sails.log(materia);
        res.view('materia/edit', {materia: materia, departamentos: departamentos});
      });
    });
  },

  update: function(req, res){
    Materia.update({idMateria: req.param('id')},{
      nombre: req.param('nombre'),
      codigo: req.param('codigo'),
      departamento: req.param('departamento')
    }).exec(function(err, updated){
      if(err){
        res.serverError(err);
      }
      res.redirect('/showMaterias');
    });
  },

  delete: function(req, res){
    Materia.destroy({idMateria: req.param('id')}).exec(function(err){
      if(err){
        res.serverError(err);
      }
      res.redirect('/showMaterias');
    });
  }
};

