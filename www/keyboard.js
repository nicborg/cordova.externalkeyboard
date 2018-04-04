var exec = require('cordova/exec');

var pluginName = 'ExternalKeyboard';

var ExternalKeyboard = function() {
};

// ExternalKeyboard.redraw = function(){
//     var deferred = $.Deferred();
//     exec(
//         function (result) {
//             deferred.resolve(result);
//         },
//         function (error) {
//             deferred.reject(error);
//         },
//         pluginName, "redraw", []);
//     return deferred.promise();
// }


ExternalKeyboard.setKeyCommands = function(commands, delimiter){
    exec(
        function (result) {
            console.log('result returned', result);
            return result;
        },
        function (error) {
            console.error('keyboard error', error);
            return error;
        },
        pluginName, "setKeyCommands", [commands, delimiter]);
    
}


module.exports = ExternalKeyboard;
