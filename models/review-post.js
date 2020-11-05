module.exports = function(sequelize, DataTypes) {
    const Review = sequelize.define("Review", {
        song: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                max: 255,
                notNull: {
                    msg: 'Please enter the song title'
                }
            }
        },
        artist: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                min: 1,
                max: 255,
                notNull: {
                    msg: 'Please enter the artist'
                }
            }
        },
        album: {
            type: DataTypes.STRING,
            allowNull: true,
            validate: {
                min: 1,
                max: 255
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                notNull: {
                    msg: 'Please write a review'
                }
            }
        },
        rating: {
            type: DataTypes.INTEGER,
            allowNull: false,
            len: [1],
            validate: {
                notNull: {
                    msg: 'Please rate the song'
                }
            }
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    // Review.associate = function(models) {
    //     Review.belongsTo(models.username, {
    //       foreignKey: {
    //         allowNull: false
    //       }
    //     });
    //   };

    return Review;
};