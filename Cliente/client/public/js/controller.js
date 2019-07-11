let dposApp = angular.module('app', []);

dposApp.controller('Controller', ['$http', '$scope', function ($http, $scope) {
    let urlServer = '192.168.0.23:3050/node'
    $scope.button = true;
    $scope.startVote = false;
    $scope.events = [];
    $scope.process = [];
    $scope.myData;
    $scope.sendProcess = false;

    //$scope.events.push({'id': 'aadsad234', 'ip': '192.168.0', 'port': '3000', 'stake': 5, 'name': "Juan casas"});


    const socket = io.connect(urlServer, { 'forceNew': true });

    $scope.sendName = function () {
        console.log("Enviar mi nombre");
        socket.emit('name', { 'name': document.getElementById('name').value });
        $scope.button = false;

    }

    $scope.sendProcess = function () {
        console.log("Enviar nuevo proceso");

        socket.emit('task', { 'task': document.getElementById('task').value });
    }

    $scope.votar = function (voto) {
        console.log("Info", $scope.myData);
        socket.emit('vote', { 'id': voto.id, 'stake': $scope.myData.stake });
        $scope.startVote = false;

    }

    socket.on('newProcess', (data) => {
        console.log("Recepcion de un nuevo proceso...");
        $scope.process.push(data.task);
        $scope.$apply();
    });

    socket.on('nodeInfo', (data) => {
        console.log(data.node);
        $scope.myData = data.node;
        $scope.$apply();
    });

    socket.on('isDelegated', (data) => {
        console.log("Soy Nuevo elegido");
        $scope.myData.isDelegated = true;

        $scope.$apply();
    });

    socket.on('startVotation', (data) => {
        console.log("Añadir a la lista...");
        console.log(data);
        $scope.events = data.list;
        $scope.startVote = true;
        $scope.myData.isDelegated = false;
        $scope.$apply();
        //setTimeout(sendAutoVote(), 30000);
    });

    function sendAutoVote() {
        console.log("Entra a timer-->");
        if ($scope.startVote) {
            socket.emit('vote', { 'id': $scope.myData.id, 'stake': $scope.myData.stake });
            $scope.startVote = false;
            $scope.$apply();
        }
    }
}]);
