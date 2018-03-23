module.exports = {

  index: function(req, res){
    Persona.find().exec(function(err, personas){
      if(err){
        res.serverError(err);
      }
      if(!personas){
        personas = [];
      }
      res.view('persona/show', {personas: personas});
    });
  },

  add: function(req, res){
    Persona.create(req.allParams()).exec(function(err, persona){
      if(err){
        res.serverError(err);
      }
      return res.redirect('/showPersona');
    });
  },

  edit: function(req, res){
    Persona.findOne(req.param('id')).exec(function (err, persona){
      if(err){
        res.serverError(err);
      }
      return res.view('persona/edit', {persona: persona});
    });
  },

  update: function(req, res){
    Persona.update({idPersona: req.param('id')},{
      cedula: req.param('cedula'),
      nombres: req.param('nombres'),
      apellidos: req.param('apellidos'),
      sexo: req.param('sexo'),
      nroAp: req.param('nroAp'),
      calle: req.param('calle'),
      urbanizacion: req.param('urbanizacion'),
      municipio: req.param('municipio'),
      estado: req.param('estado'),
    }).exec(function(err, update){
      if(err){
        res.serverError(err);
      }
      return res.redirect('/showPersona');
    });
  },

  delete: function(req, res){
    Persona.destroy({idPersona: req.param('id')}).exec(function(err){
      if(err){
        res.serverError(err);
      }
      return res.redirect('/showPersona');
    });
  }
};

