(function(){
    var myApp = angular.module('HelloApp', ['ngRoute', 'ngResource']);

    myApp.factory('Entity', function($resource) {
        return $resource('/entity/:id', {id: '@id'}, {
            remove: {
                method: "DELETE"
            }
        });
    });

    myApp.directive('entityDirictive', function(){
        return {
            scope:{
                entity:'=eModel'
            },
            restrict: "A",
            controller: function($scope, Entity) {
                this.entity = $scope.entity;
                this.editing = false;

                this.checkHandler = function() {
                    this.entity.isDone = !this.entity.isDone;
                    this.editing = false;
                    this.entity.$save();
                };

                this.editHandler = function() {
                    if (this.editing) {
                        this.entity.$save();
                    }

                    if (!this.entity.isDone) {
                        this.editing = !this.editing;
                    }
                };

                this.isEditing = function() {
                    return !this.entity.isDone && this.editing;
                };
            },
            controllerAs: "c",
            templateUrl:"templates/entity.view.html"
        }
    });

    myApp.directive('entitiesTableDirictive', function(){
        return {
            scope:{
                entities:'=entities',
                loading:'=loading'
            },
            restrict: "E",
            templateUrl:"templates/entities.table.view.html"
        }
    });

    myApp.directive('newEntityFormDirictive', function(){
        return {
            scope:{
                addFunc:'=addHandler'
            },
            restrict: "E",
            controller: function($scope) {
                this.addFunc = $scope.addFunc;
                this.title = '';

                this.addEntityHandler = function() {
                    this.addFunc(this.title);
                    this.title = '';
                    $scope.newEntityForm.title.$setPristine(true);
                };
            },
            controllerAs: "c",
            templateUrl:"templates/new.entity.form.view.html"
        }
    });

    myApp.directive('navBarDirictive', function(){
        return {
            restrict: "E",
            controller: function($location) {
                this.isShowTab = function(path) {
                    return $location.path() === path;
                };
            },
            controllerAs: "c",
            templateUrl:"templates/nav.bar.view.html"
        }
    });

    myApp.controller('EntitiesListController', function(Entity, $log) {
        this.loading = false;
        this.entities = [];
        var ctrl = this;

        this.addEntity = function(title) {
            var entity = {
                'title' : title,
                'isDone' : false
            };
            ctrl.entities.push(entity);
            //ctrl.loading = true;
            Entity.save(entity, function() {
                ctrl.refresh();
            });
        };

        this.finishLoading = function(entities) {
            ctrl.loading = false;
            ctrl.entities = entities;
            $log.info("Finish entities loading.");
        };

        this.refresh = function() {
            //this.loading = true;

            $log.info("Start entities loading.");

            Entity.query(function(entities) {
                ctrl.finishLoading(entities);
            });
        };

        this.refresh();
    });

    myApp.config(function($routeProvider, $locationProvider) {
        $routeProvider
            .when('/home', {
                controller: 'EntitiesListController',
                templateUrl: 'templates/home.view.html',
                controllerAs: 'listCtrl'
            })
            .when('/about', {
                templateUrl: 'templates/about.view.html'
            })
            .otherwise({ redirectTo: '/home' });
        $locationProvider.html5Mode(true);
    });
})();