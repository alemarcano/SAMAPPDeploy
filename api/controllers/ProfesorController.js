module.exports = {

	index: function(req, res){
    Profesor.find().populate('persona').populate('isEstructura').sort('especialidad ASC').exec(function(err, profesores){
      if(err){
        return res.serverError(err);
      }
      if(!profesores){
        profesores = [];
      }
      res.view('profesor/show',{profesores: profesores});
    });

  },

  indexProfesorMateria: function(req, res){
    var query = 'SELECT Persona.Nombres, Persona.Apellidos, Persona.Cedula, Materia.Nombre AS Materia, Materia.Codigo '+
                'FROM Profesor '+
                'LEFT JOIN  Seccion ON Profesor.idProfesor = Seccion.Profesor_idProfesor '+
                'INNER JOIN Persona ON Profesor.Persona_idPersona = Persona.idPersona '+
                'INNER JOIN Materia ON Seccion.Materia_idMateria = Materia.idMateria '+
                'WHERE Profesor.Estructura_idEstructura = '+ req.param('id') +
                ' ORDER BY Persona.Apellidos ASC';


    Profesor.query(query, [], function(err, profesores){
      if(err){
        res.serverError(err);
      }
      if(!profesores){
        profesores = [];
      }
      res.view('profesor/showProfesor_Materia', {profesores: profesores, idEstructura: req.param('id') });
    });
  },

  indexProfesorSeccion: function(req, res) {
    var query = 'SELECT Persona.Nombres, Persona.Apellidos, Persona.Cedula, Seccion.idSeccion '+
                'FROM Profesor '+
                'LEFT OUTER JOIN Seccion ON Profesor.idProfesor = Seccion.Profesor_idProfesor '+
                'INNER JOIN Persona ON Profesor.Persona_idPersona = Persona.idPersona '+
                'WHERE Profesor.Estructura_idEstructura = '+ req.param('id') +
                ' AND Seccion.Profesor_idProfesor IS null ';

    Profesor.query(query, [], function(err, profesores){
      if(err){
        res.serverError(err);
      }
      sails.log(profesores);
      res.view('profesor/showProfesorSeccion', {profesores: profesores});
    });
  },

  availablePersona_Departamento: function(req, res){
    var query = 'SELECT Persona.idPersona, Persona.Nombres, Persona.Apellidos '+
                'FROM  Persona ' +
                'LEFT JOIN Profesor ON Persona.idPersona = Profesor.Persona_idPersona ' +
                'LEFT JOIN Estudiante ON Persona.idPersona = Estudiante.Persona_idPersona ' +
                'WHERE Profesor.Persona_idPersona IS null ' +
                'AND Estudiante.Persona_idPersona IS null ';

    Persona.query(query, [], function(err, personas){
      if(err){
        res.serverError(err);
      }

      Estructura.find({ nombre: { contains: 'Departamento' } }, {select:['idEstructura', 'nombre']}).exec(function(err, departamentos){
        if(err){
          res.serverError(err);
        }
        res.view('profesor/add', {departamentos: departamentos, personas: personas});
      });
    });
  },

  add: function(req, res){
    Profesor.create(req.allParams()).exec(function(err, created){
      if(err){
        res.serverError(err);
      }
      sails.log(created);
      return res.redirect('/showProfesor');
    });
  },

  edit: function(req, res){
    var query = 'SELECT Persona.idPersona, Persona.Nombres, Persona.Apellidos '+
                'FROM  Persona ' +
                'LEFT JOIN Profesor ON Persona.idPersona = Profesor.Persona_idPersona ' +
                'LEFT JOIN Estudiante ON Persona.idPersona = Estudiante.Persona_idPersona ' +
                'WHERE Profesor.Persona_idPersona IS null ' +
                'AND Estudiante.Persona_idPersona IS null ';

    Persona.query(query, [], function(err, personas){
      if(err){
        res.serverError(err);
      }

      Estructura.find({ nombre: { contains: 'Departamento' } }, {select:['idEstructura', 'nombre']}).exec(function(err, departamentos){
        if(err){
          res.serverError(err);
        }

        Profesor.findOne({idProfesor: req.param('id')}).populate('persona').exec(function(err, profesor){
          if(err){
            res.serverError(err);
          }
          res.view('profesor/edit',{personas: personas, departamentos: departamentos, profesor: profesor});
        });
      });
    });
  },

  update: function(req, res){
    Profesor.update({idProfesor: req.param('id')},{
      especialidad: req.param('especialidad'),
      persona: req.param('persona'),
      isEstructura: req.param('isEstructura')
    }).exec(function(err, updated){
      if(err){
        res.serverError(err);
      }
      res.redirect('/showProfesor');
    });
  },

  delete: function(req, res){
    Profesor.destroy({idProfesor: req.param('id')}).exec(function(err){
      if(err){
        res.serverError(err);
      }
      res.redirect('/showProfesor');
    });
  }
};
