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
        }
    });

    Review.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Review.belongsTo(models.Author, {
          foreignKey: {
            allowNull: false
          }
        });
      };

    return Review;
};