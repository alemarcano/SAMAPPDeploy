module.exports = {

  connection: "db",
  tableName: "Persona",
  schema: true,
  autoUpdatedAt: false,
  autoCreatedAt: false,

  attributes: {

    idPersona:{
      type: 'integer',
      primaryKey: true,
      autoIncrement: true,
      columnName: 'idPersona'
    },

    cedula: {
      type: 'integer',
      required: true,
      unique: true,
      columnName: 'Cedula'
    },

    nombres: {
      type: 'string',
      required: true,
      columnName: 'Nombres'
    },

    apellidos: {
      type: 'string',
      required: true,
      columnName: 'Apellidos'
    },

    sexo: {
      type: 'string',
      required: true,
      columnName: 'Sexo'
    },

    nroAp: {
      type: 'string',
      columnName: 'NroAp'
    },

    calle: {
      type: 'string',
      columnName: 'Calle'
    },

    urbanizacion: {
      type: 'string',
      columnName: 'Urbanizacion'
    },

    municipio: {
      type: 'string',
      columnName: 'Municipio'
    },

    estado: {
      type: 'string',
      columnName: 'Estado'
    },

    //Atributos Virtuales necesario para el funcionamiento de Waterline :)

    profesor: {
      collection:'profesor',
      via:'persona'
    }


  }
};

