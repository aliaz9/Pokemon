const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {

    sequelize.define('type', {

    name: {
        type: DataTypes.TEXT,
     }

    }, {
        timestamps: false
    }
    
    )

}