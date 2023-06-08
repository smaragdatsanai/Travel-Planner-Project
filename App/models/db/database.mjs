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
    },
    travelPlanId: {
        type: DataTypes.INTEGER,
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
    },
    travelPlanId: {
        type: DataTypes.INTEGER,
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
    },
    travelPlanId: {
        type: DataTypes.INTEGER,
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
    },
    travelPlanId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const UserInventory = sequelize.define('UserInventory', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    travelPlanId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});

const BudgetHandling = sequelize.define('BudgetHandling', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
    travelPlanId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
});


TravelPlan.hasMany(Flight, { foreignKey: 'travelPlanId' });
TravelPlan.hasMany(Destination, { foreignKey: 'travelPlanId' });
TravelPlan.hasMany(Accommodation, { foreignKey: 'travelPlanId' });
TravelPlan.hasMany(Rating, { foreignKey: 'travelPlanId' });
TravelPlan.hasMany(UserInventory, { foreignKey: 'travelPlanId' });
TravelPlan.hasMany(BudgetHandling, { foreignKey: 'travelPlanId' });

Flight.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });
Destination.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });
Accommodation.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });
Rating.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });
UserInventory.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });
BudgetHandling.belongsTo(TravelPlan, { foreignKey: 'travelPlanId' });



sequelize.sync({ force: true }) // Set `force` to `true` if you want to drop and recreate the tables on every sync
    .then(() => {
        console.log('Database synced');
    })
    .catch((error) => {
        console.error('Error syncing database:', error);
    });

export { TravelPlan,
    Flight,
    Destination,
    Accommodation,
    Rating,
    UserInventory,
    BudgetHandling } 
