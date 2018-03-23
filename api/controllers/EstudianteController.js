/**
 * EstudianteController
 *
 * @description :: Server-side logic for managing estudiantes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

		index: function(req, res){
	    Estudiante.find().populate('persona').exec(function(err, estudiantes){
	      if(err){
	        return res.serverError(err);
	      }
	      if(!estudiantes){
	        estudiantes = [];
	      }
	      sails.log(estudiantes);
	      res.view('estudiante/show',{estudiantes: estudiantes});
	    });

		},
		

		availablePersonaa: function(req, res){
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
	
					res.view('estudiante/add', {personas: personas});
				
			});
		},

		add: function(req, res){
			Estudiante.create(req.allParams()).exec(function(err, created){
				if(err){
					res.serverError(err);
				}
				sails.log(created);
				return res.redirect('/showEstudiante');
			});
		},

	/*	edit: function(req, res){
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
	
					res.view('estudiante/edit', {personas: personas});
				
			});
		},*/

		edit: function(req, res){
			Persona.findOne(req.param('id')).exec(function (err, persona){
			  if(err){
				res.serverError(err);
			  }
			  return res.view('estudiante/edit', {persona: persona});
			});
		  },

		update: function(req, res){
			Estudiante.update({idEstudiante: req.param('id')},{
				carnet: req.param('carnet'),
				persona: req.param('persona'),
		
			}).exec(function(err, updated){
				if(err){
					res.serverError(err);
				}
				res.redirect('/showEstudiante');
			});
		},

		
	
		delete: function(req, res){
			Estudiante.destroy({idEstudiante: req.param('id')}).exec(function(err){
				if(err){
					res.serverError(err);
				}
				res.redirect('/showEstudiante');
			});
		},
		

		

		indexHorario: function(req, res){
			var query = 'select S.numSecc , ma.Nombre as Materia, per.Nombres as Profesor, H.Dia,H.HoraInicial, H.HoraFinal, timediff(Horafinal, HoraInicial) as duracion, count(I.Seccion_idSeccion) as Inscritos '+
									'from Horario as H inner join Horario_has_Seccion as HS on H.idHorario = HS.Horario_idHorario '+
									'inner join Seccion S on S.idSeccion = HS.Seccion_idSeccion '+
									'inner join Materia ma on ma.idMateria = S.Materia_idMateria '+
									'inner join Profesor pro on pro.idProfesor=S.Profesor_idProfesor '+
									'inner join Persona per on per.idPersona=pro.Persona_idPersona '+
									'inner join SeccionEstudiante I on I.Seccion_idSeccion = S.idSeccion '+
									'group by I.Seccion_idSeccion ';

			Estudiante.query(query, [], function(err, estudiantes){
				if(err){
					res.serverError(err);
				}
				if(!estudiantes){
					estudiantes = [];
				}
			 res.view('estudiante/showtodo',{estudiantes: estudiantes});
			});
		}


};
