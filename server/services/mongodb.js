var mongoSettings = require('../settings/mongodb');
var mongodb = require('mongodb');
var mongoClient = mongodb.MongoClient;

var Server = mongodb.Server;
var Db = mongodb.Db;
var db;

exports.getCollection = function(collectionName) {
    return getCollection(collectionName);
};

exports.insertDocuments = function(docs, collectionName, callback) {
    insertDocuments(docs, collectionName, callback);
};

exports.clearCollection = function(collectionName) {
    clearCollection(collectionName);
};

exports.searchCollection = function(searchField, searchValue, collection) {
    return searchCollection(searchField, searchValue, collection);
};

function getCollection(collectionName) {
    var collection = null;
    open();

    db.collection(collectionName, function(err, result) {
        collection = result;
    });

    return collection;
    close();
}

function insertDocuments(docs, collectionName, callback) {
    mongoClient.connect(mongoSettings.settings().url, function(err, db) {
        if (err) {
            console.log(err);
        }

        var collection = db.collection(collectionName);

        collection.insert(docs, {
            w: 1
        }, function(err, result) {
            if (err) {
                console.log(err);
            }

            if (callback != undefined) {
                callback();
            }
        });
    });
}

function clearCollection(collectionName) {
    mongoClient.connect(mongoSettings.settings().url, function(err, db) {
        if (err) {
            console.dir(err);
        }

        db.collection(collectionName).remove();
    });
}

function searchCollection(searchCriterias, collectionName) {
    var promise = new Promise(
        function(resolve, reject) {
            mongoClient.connect(mongoSettings.settings().url, function(err, db) {
                if (err) {
                    console.log(err);
                }

                var query = {};

                if (searchCriterias != null) {
                    searchCriterias.forEach(function (item, index) {
                        query[item.field] = item.value;
                    });
                }
                
                db.collection(collectionName).find(query).toArray(function(err, documents) {
                    if (err) {
                        console.log(err);
                    }

                    resolve(documents);
                });
            });
        }
    );

    promise.then(
        function(val) {
            return val;
        });

    return promise;
}

function open() {
    var server = new Server(mongoSettings.settings().url, {
        auto_reconnect: true
    });
    db = new Db('cars', server);

    db.open(function(err, dbref) {
        if (err) {
            console.log(err);
        }
    });
}

function close() {
    db.close();
}
