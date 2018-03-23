module.exports = {

  connection: "db",
  tableName: "Profesor",
  schema: true,
  autoUpdatedAt: false,
  autoCreatedAt: false,

  attributes: {

    idProfesor:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      columnName: 'idProfesor'
    },

    especialidad: {
      type: 'string',
      required: true,
      columnName: 'Especialidad'
    },

    //Foreign Keys
    persona:{
      model:'persona',
      unique: true,
      columnName: 'Persona_idPersona'
    },

    isEstructura:{
      model:'estructura',
      columnName: 'Estructura_idEstructura'
    },

    //Atributos Virtuales necesario para el funcionamiento de Waterline :)

    estructura: {
      collection:'estructura',
      via:'jefe'
    }

  }
};

