'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('tags_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_tags: {
        type: Sequelize.INTEGER,
        references: {             // User belongsTo Company 1:1
          model: 'tags',
          key: 'id'
        }
      },
      id_content: {
        type: Sequelize.INTEGER,
        references: {             // User belongsTo Company 1:1
          model: 'contents',
          key: 'id'
        }
      },
      createdBy: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('tags_details');
  }
};