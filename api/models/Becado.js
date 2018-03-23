/**
 * Becado.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

connection: "db",
 tableName: "Becado",
 shema: true,
 autoCreatedAt: false,
 autoUpdatedAt: false,


 attributes: {

   idBecado:{
     type: 'integer',
      primaryKey: true,
     autoIncrement:true,
     columnName: ' idBecado'
   },

   condicion:{
     type: 'integer',
     columnName: 'condicion'
   },

   tipo:{
     type: 'string',
     columnName: 'tipo'
   },


   //Foreign Keys
   estudiante:{
     model:'estudiante',
     unique: true,
     columnName: 'Estudiante_idEstudiante'
   },

 }
};