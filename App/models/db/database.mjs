import { sequelize } from './dbConfig.mjs'
import { DataTypes, UUIDV4 } from 'sequelize'


const TravelPlan = sequelize.define('TravelPlan', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    startDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    endDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

const Flight = sequelize.define('Flight', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    airline: {
        type: DataTypes.STRING,
        allowNull: false
    },
    departureDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    arrivalDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

const Destination = sequelize.define('Destination', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const Accommodation = sequelize.define('Accommodation', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    checkInDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    checkOutDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
});

const Rating = sequelize.define('Rating', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rating: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const UserInventory = sequelize.define('UserInventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});



TravelPlan.hasMany(Flight, { foreignKey: '' });
TravelPlan.hasMany(Destination, { foreignKey: 'destinationId' });
TravelPlan.hasMany(Accommodation, { foreignKey: 'accommodationId' });
TravelPlan.hasMany(Rating, { foreignKey: 'travelPlanId' });

Flight.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });
Destination.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });
Accommodation.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });
Rating.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });

TravelPlan.hasMany(UserInventory, { foreignKey: 'travelPlanId' });

UserInventory.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });



try {
    await sequelize.sync({ alter: true });
    console.log('Database sync successful!');
} catch (err) {
    console.error('Error sychronizing the database:', err);
}
export {
    TravelPlan,
    Flight,
    Destination,
    Accommodation,
    Rating,
    UserInventory,
} 
