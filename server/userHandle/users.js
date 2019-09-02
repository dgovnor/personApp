const Sequelize = require("sequelize");
const { sequelize } = require("../helper/database");
const Users = sequelize.define(
  "users",
  {
    name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    phone: {
      type: Sequelize.BIGINT
    }
  },
  {
    freezeTableName: true
  }
);
exports.signUp = (req, res) => {
  const { name, email, phone } = req.body;
  sequelize
    .authenticate()
    .then(() => {
      console.log("Success!");

      Users.sync()
        .then(function() {
          Users.create({
            name,
            email,
            phone
          });
        })
        .then(() => {
          return res.status(200).json({
            status: 200,
            message: "Created user successfully"
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.updateUser = (req, res) => {
  const { userId } = req.params;
  const { name, email, phone } = req.body;

  Users.update(
    {
      name,
      email,
      phone
    },
    {
      where: {
        id: userId
      }
    }
  )
    .then(() => {
      console.log("Updated");
      return res.status(200).json({
        status: 200,
        message: "user updated successfully"
      });
    })
    .catch(e => {
      console.log("Error" + e);
    });
};

exports.removeUser = (req, res) => {
  const { userId } = req.params;
  Users.destroy({
    where: {
      id: userId
    }
  })
    .then(() => {
      console.log("removed");
      return res.status(200).json({
        status: 200,
        message: "user removed successfully"
      });
    })
    .catch(e => {
      console.log("Error" + e);
    });
};

exports.getUser = (req, res) => {
  Users.findAll({})
    .then(data => {
      return res.status(200).json({
        status: 200,
        message: data
      });
    })
    .catch(err => {
      console.log(err);
    });
};
