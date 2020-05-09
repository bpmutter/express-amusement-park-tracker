'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

      return queryInterface.bulkInsert('Parks', [
        {
          parkName:'Six Flags',
          city:'Jackson',
          provinceState: 'New Jersey',
          country: 'United States',
          opened: new Date(),
          size: "really big",
          description: "such fun!!",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parkName: 'Coney Island',
          city: 'New York',
          provinceState: 'New York',
          country: 'United States',
          opened: new Date(),
          size: "pretty big",
          description: "gotta eat a hotdog!", 
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          parkName: "Pablo's casa",
          city: 'Medallo',
          provinceState: 'Antioquia',
          country: 'Colombia',
          opened: new Date(),
          size: "algo grande",
          description: "que chimba parce!!",      
          createdAt: new Date(),
          updatedAt: new Date(),
        }
      ], {});

  },

  down: (queryInterface, Sequelize) => {

      return queryInterface.bulkDelete('Parks', null, {});

  }
};
