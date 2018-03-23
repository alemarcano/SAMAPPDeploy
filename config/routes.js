/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  'get /': {
    view: 'homepage'
  },

               //JEFE DE DEPARTAMENTO

  'get /showJefe': 'EstructuraController.indexJefe',

  'get /showDepartamento': 'EstructuraController.index',

  'get /menu': 'EstructuraController.menu',

  'get /showProfesor_Materia': 'ProfesorController.indexProfesorMateria',

  'get /showProfesor-Seccion': 'ProfesorController.indexProfesorSeccion',

                //PERSONA

  'get /showPersona': 'PersonaController.index',

  'get /addPersona': {
    view: 'persona/add'
  },

  'post /addPersona': 'PersonaController.add',

  'get /editPersona': 'PersonaController.edit',

  'post /editPersona': 'PersonaController.update',

  'get /deletePersona': 'PersonaController.delete',

                //PROFESOR

  'get /showProfesor': 'ProfesorController.index',

  'get /addProfesor': 'ProfesorController.availablePersona_Departamento',

  'post /addProfesor': 'ProfesorController.add',

  'get /editProfesor': 'ProfesorController.edit',

 'post /editProfesor': 'ProfesorController.update',

  'get /deleteProfesor': 'ProfesorController.delete',

              //EstudianteController
  'get /showEstudiante': 'EstudianteController.index',

  'get /addEstudiante': 'EstudianteController.availablePersonaa',

  'post /addEstudiante': 'EstudianteController.add',

  'get /editEstudiante': 'EstudianteController.edit',

  'post /editEstudiante': 'EstudianteController.update',
 
   'get /deleteProfesor': 'EstudianteController.delete',
  
  'get /estudiantehorario': 'EstudianteController.indexhorario',


                //MATERIA

  'get /showMateria': 'MateriaController.index',

  'get /addMateria': 'MateriaController.available_Departamento',

  'post /addMateria': 'MateriaController.add',

  'get /editMateria': 'MateriaController.edit',

  'post /editMateria': 'MateriaController.update',

              

                  //Becado
    'get /addBecado': 'BecadoController.availableBecado',

    'post /addBecado': 'BecadoController.add',


  'get /showBecado': 'BecadoController.indexBecado',

  'get /showNoBecado': 'BecadoController.indexNoBecado',

  'get /contador': 'BecadoController.contadorBecados',

  'get /promete': 'BecadoController.promedio',

  'get /unacarrera': 'BecadoController.becadocarrera',

  'get /unamateria': 'BecadoController.becadomateria',


   'get /menuss': {view:'becado/menubecado'},


  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
