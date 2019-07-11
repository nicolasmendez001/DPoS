angular.module('app', [])
    .controller('Controller', ['$http', function ($http) {

        let ctrl = this;

        const COUNTRY = 'es-CO';
        const SERVICE_GET_TIME = '/getTime';
        const SERVICE_SAVE_TIME = '/saveTime';

        ctrl.ips = ['http://localhost:3001', 'http://localhost:3002'];


        //  ctrl.time = new Date(Date.now()).toLocaleTimeString(COUNTRY);

        ctrl.events = [];
        var count = 0;

        ctrl.refreshTime = function () {
            ctrl.events = [];
            ctrl.startTime = Date.now();
            count = 0;

            for (let i = 0; i < ctrl.ips.length; i++) {
                let delay = Math.floor(Math.random() * 1000);
                setTimeout(function () {
                    $http({
                        url: SERVICE_GET_TIME,
                        method: "GET",
                        params: { ip: ctrl.ips[i], tam: ctrl.ips.length }
                    }).then(function (res) {
                        count++;
                        ctrl.responseTime = (Date.now() - ctrl.startTime - res.data.delay) / 2;
                        ctrl.events.push(
                            {
                                'ip': res.data.ip,
                                'serverTime': new Date(res.data.time).toLocaleTimeString(COUNTRY),
                                'responseTime': ctrl.responseTime, 'serverDelay': res.data.delay
                            }
                        );
                    }, function () {
                        alert('Error');
                    });
                }, delay);
                if (count === ctrl.ips.length) {
                    alert("Entra IF");
                    $http({
                        url: SERVICE_SAVE_TIME,
                        method: "GET"
                    }).then(function (res) {
                        console.log(res);

                    }, function () {
                        alert('Error');
                    });
                }
            }




            /*$http.get(SERVICE_GET_TIME, element).then(function (res) {
                ctrl.responseTime = (Date.now() - ctrl.startTime - res.data.delay) / 2;
                ctrl.events.push({
                    'ip': res.data.ip,
                    'serverTime': new Date(res.data.time).toLocaleTimeString(COUNTRY),
                    'responseTime': ctrl.responseTime, 'serverDelay': res.data.delay
                });
            }, function () {
                console.log('Error');
            });
            */
        };

        function sendTime() {
            var prom = 0;
            ctr.events.forEach(element => {
                prom += element.serverTime;
            });
            prom /= ctrl.events.length;
        }
    }]);