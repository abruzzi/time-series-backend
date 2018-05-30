db.getCollection('pagedata_20180530').aggregate([{
    '$match': {
        airport: 'PD'
    }
}, {
    $group: {
        _id: "$location",
        total: {
            $sum: 1
        }
    }
}, {
    $sort: {
        total: -1
    }
}]);

db.getCollection('pagedata_20180530').aggregate([{
    '$match': {
        airport: 'PD'
    }
}, {
    $group: {
        _id: "$browserLanguage",
        total: {
            $sum: 1
        }
    }
}, {
    $sort: {
        total: -1
    }
}]);
