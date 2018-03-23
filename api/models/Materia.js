module.exports = {
  connection: "db",
  tableName: "Materia",
  schema: true,
  autoUpdatedAt: false,
  autoCreatedAt: false,

  attributes: {

    idMateria:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      columnName: 'idMateria'
    },

    nombre:{
      type: 'string',
      required: true,
      columnName: 'Nombre'
    },

    codigo:{
      type: 'string',
      unique: true,
      required: true,
      columnName: 'Codigo'
    },

    //Foreign Keys
    departamento:{
      model:'estructura',
      columnName: 'Estructura_idEstructura'
    },
  }
};

