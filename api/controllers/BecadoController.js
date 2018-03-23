/**
 * BecadoController
 *
 * @description :: Server-side logic for managing becadoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {


	add: function(req, res){
    Becado.create(req.allParams()).exec(function(err, created){
      if(err){
        res.serverError(err);
      }
      res.redirect('/showBecado');
    });
	},
	

	availableBecado: function(req, res){
		var query = 'SELECT Persona.idPersona, Persona.Nombres, Persona.Apellidos FROM Estudiante '+
								'inner join Persona on Estudiante.Persona_idPersona=Persona.idPersona ' +
								'left join Becado on Estudiante.idEstudiante=Becado.Estudiante_idEstudiante '+
								'where Becado.Estudiante_idEstudiante is null ';
						

		Persona.query(query, [], function(err, personas){
			if(err){
				res.serverError(err);
			}

				res.view('becado/add', {personas: personas});
			
		});
	},


	indexBecado: function(req, res){
    var query = 'SELECT Persona.Cedula, Persona.Nombres as NombreCompleto, Becado.condicion, Becado.tipo '+
								'from Persona '+
                'inner join Estudiante on Estudiante.Persona_idPersona=Persona.idPersona '+
                'inner join Becado on Estudiante.idEstudiante=Becado.Estudiante_idEstudiante ';

    Becado.query(query, [], function(err, becados){
      if(err){
        res.serverError(err);
      }
      if(!becados){
        becados = [];
      }
     res.view('becado/show',{becados: becados});
    });
  },

	indexNoBecado: function(req, res){
		var query = 'SELECT Persona.Nombres, Persona.Apellidos, Estudiante.carnet '+
								'FROM Estudiante '+
								'inner join Persona on Estudiante.Persona_idPersona=Persona.idPersona '+
								'left join Becado on Estudiante.idEstudiante=Becado.Estudiante_idEstudiante '+
								'where Becado.Estudiante_idEstudiante is null ';

		Becado.query(query, [], function(err, becados){
			if(err){
				res.serverError(err);
			}
			if(!becados){
				becados = [];
			}
		 res.view('becado/showno',{becados: becados});
		});
	},


	promedio: function(req, res){
		var query = 'select AVG(SeccionEstudiante.Nota) as Nota, Persona.Nombres, Persona.Apellidos from Persona '+
								'inner join Estudiante on Persona.idPersona= Estudiante.Persona_idPersona '+
								'inner join Becado on Becado.Estudiante_idEstudiante=Estudiante.idEstudiante '+
								'inner join SeccionEstudiante on SeccionEstudiante.Estudiante_idEstudiante=Estudiante.idEstudiante '+
								'group by Persona.Nombres ';

		Becado.query(query, [], function(err, becados){
			if(err){
				res.serverError(err);
			}
			if(!becados){
				becados = [];
			}
		 res.view('becado/prome',{becados: becados});
		});
	},



	becadocarrera: function(req, res){
		var query = 'Select  c.Nombre , count(c.idCarrera) as Contador '+
								'from Estudiante e inner join Persona p on e.Persona_idPersona = p.idPersona '+
								'inner join Becado b on e.idEstudiante = b.Estudiante_idEstudiante '+
								'inner join Carrera_has_Estudiante ce on e.idEstudiante = ce.Estudiante_idEstudiante '+
								'inner join Carrera c on c.idCarrera = ce.Carrera_idCarrera '+
								'group by c.idCarrera ';

		Becado.query(query, [], function(err, becados){
			if(err){
				res.serverError(err);
			}
			if(!becados){
				becados = [];
			}
		 res.view('becado/becacarrera',{becados: becados});
		});
	},


	becadomateria: function(req, res){
		var query = 'Select  ma.Nombre , count(ma.idMateria) as Contador '+
								'from Estudiante e inner join Persona p on e.Persona_idPersona = p.idPersona '+
								'inner join Becado b on e.idEstudiante = b.Estudiante_idEstudiante '+
								'inner join SeccionEstudiante se on se.Estudiante_idEstudiante = e.idEstudiante '+
								'inner join Seccion sec on sec.idSeccion = se.Seccion_idSeccion '+
								'inner join Materia ma on ma.idMateria=sec.Materia_idMateria '+
								'group by ma.idMateria ';

		Becado.query(query, [], function(err, becados){
			if(err){
				res.serverError(err);
			}
			if(!becados){
				becados = [];
			}
		 res.view('becado/becamateria',{becados: becados});
		});
	},




	contadorBecados: function(req, res){
		var query = 'Select count(Becado.idBecado) as Becaditos, Becado.tipo  '+
								'from Becado group by Becado.tipo ';

		Becado.query(query, [], function(err, becados){
			if(err){
				res.serverError(err);
			}
			if(!becados){
				becados = [];
			}
		 res.view('becado/showcontador',{becados: becados});
		});
	}

};
