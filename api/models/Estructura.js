module.exports = {

  connection: "db",
  tableName: "Estructura",
  schema: true,
  autoUpdatedAt: false,
  autoCreatedAt: false,

  attributes: {

    idEstructura:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      columnName: 'idEstructura'
    },

    nombre: {
      type: 'string',
      required: true,
      columnName: 'Nombre'
    },

    //Foreign Keys
    jefe:{
      model:'profesor',
      columnName: 'Profesor_idProfesor'
    },

    //Atributos Virtuales necesario para el funcionamiento de Waterline :)

    profesor: {
      collection:'profesor',
      via:'isEstructura'
    },

    materia:{
      collection:'materia',
      via:'departamento'
    }

  }
};

