module.exports = {

  connection: "db",
  tableName: "Estudiante",
  schema: true,
  autoUpdatedAt: false,
  autoCreatedAt: false,

  attributes: {

    idEstudiante:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      columnName: 'idEstudiante'
    },

    carnet: {
      type: 'string',
      required: true,
      columnName: 'carnet'
    },

    //Foreign Keys
    persona:{
      model:'persona',
      unique: true,
      columnName: 'Persona_idPersona'
    },



    //Atributos Virtuales necesario para el funcionamiento de Waterline :)
    becado: {
      collection:'becado',
      via:'estudiante'
    }


  }
};
