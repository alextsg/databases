var db = require('../db').dbConnection;


module.exports = {
  messages: {
    get: function (callback) {
      db.query('SELECT message, username, roomname FROM messages JOIN users ON messages.user_id=users.id;', function(err, rows, fields) {
      if (err) throw 'messages.get';
      callback(rows);
      });
    }, // a function which produces all the messages
    post: function (message, callback) {
      var user_id;
      module.exports.users.get(message.username, function(rows){
        if (rows.length) {
          user_id = rows[0].id;
          db.query("INSERT INTO messages (message, user_id, roomname) values ('" + message.text + "','" + user_id + "','" + message.roomname + "');", function(err){
            if (err) throw "error on insert message";
            else {
              callback();
            }
        });
        } else {
          module.exports.users.post(message.username, function(id) {
            user_id = id;
            db.query("INSERT INTO messages (message, user_id, roomname) values ('" + message.text + "','" + user_id + "','" + message.roomname + "');", function(err){
              if (err) throw "error on insert message";
              else {
                callback();
          }
        });
          });
        }
      });
      
      
    } // a function which can be used to insert a message into the database
  },

  users: {
    // Ditto as above.
    get: function (username, callback) {
      db.query("SELECT users.id FROM users WHERE users.username='" + username + "';", function(err, rows, fields) {
        if (err) throw "users.get";
        else {
          callback(rows);
        }
      });
    },
    post: function(username, callback) {
      db.query("INSERT INTO users (username) values ('" + username + "');", function(err, result) {
        if (err) throw "users.post";
        else {
          console.log('result', result);
          console.log('resultid', result.insertId);
          callback(result.insertId);
        }
      });
    }
  }
};
