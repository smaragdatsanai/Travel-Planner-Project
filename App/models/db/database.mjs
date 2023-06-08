import { sequelize } from './dbConfig.mjs'
import { DataTypes, UUIDV4 } from 'sequelize'


const User = sequelize.define('User',{
    User_Id:{
        type: DataTypes.UUID,
        allowNull:false,
        primaryKey: true
    },
    Username:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Password:{
        type: DataTypes.STRING,
        allowNull: false
    },
    Email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    ProfileImage:{
        type: DataTypes.TEXT,
        allowNull: true
    }
});

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
    status: {
        type: DataTypes.STRING,
        allowNull: false
    },
    budget: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: true
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

const Itinerary = sequelize.define('Itinerary', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    time: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    activityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    }
  });

const Favourites = sequelize.define('Favourites', {
});


User.hasMany(TravelPlan);
TravelPlan.belongsTo(User);

TravelPlan.belongsToMany(Destination, { through: 'TravelPlanDestination' });
Destination.belongsToMany(TravelPlan, { through: 'TravelPlanDestination' });

TravelPlan.belongsToMany(Accommodation, { through: 'TravelPlanAccommodation' });
Accommodation.belongsToMany(TravelPlan, { through: 'TravelPlanAccommodation' });

TravelPlan.belongsToMany(Flight, { through: 'TravelPlanFlight' });
Flight.belongsToMany(TravelPlan, { through: 'TravelPlanFlight' });

TravelPlan.hasMany(Itinerary);
Itinerary.belongsTo(TravelPlan);

User.belongsToMany(TravelPlan, { through: Favourites });
TravelPlan.belongsToMany(User, { through: Favourites });

Rating.belongsTo(TravelPlan,{ foreignKey:'travelPlanId'});
User.hasMany(Rating,{ foreignKey:'UserId'});
Rating.belongsTo(User,{ foreignKey:'UserId'});


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
    Favourites,
    User,
    Itinerary
} 
