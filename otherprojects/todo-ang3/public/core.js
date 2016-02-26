var siyerTodo = angular.module('siyerTodo', []);

function mainController($scope, $http) {
    $scope.formData = {};

    // when landing on the page, get all todos and show them
    $http.get('/api/todos')
        .success(function(data) {
            $scope.todos = data;
            console.log(data);
            $scope.show="All";
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });

    // when submitting the add form, send the text to the node API
    $scope.createTodo = function() {
        $http.post('/api/todos', $scope.formData)
            .success(function(data) {
                $scope.formData = {}; // clear the form so our user is ready to enter another
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };

    // delete a todo after checking it
    $scope.deleteTodo = function(id) {
        $http.delete('/api/todos/' + id)
            .success(function(data) {
                $scope.todos = data;
                console.log(data);
            })
            .error(function(data) {
                console.log('Error: ' + data);
            });
    };
};

function ClickToEdit($scope, $http){
        $scope.todos = $http.get('api/todos')
        .success(function(data){
            $scope.todos = data;
            return $scope.todos
        })
        .error(function(data){
            console.log('Error:' + data);
        });

        $scope.title = $scope.todo.text;
        $scope.editorEnabled = false;
          
        $scope.enableEditor = function() {
            $scope.editorEnabled = true;
            $scope.editableTitle = $scope.todo.text;
        };
          
        $scope.disableEditor = function() {
            $scope.editorEnabled = false;
        };
          
        $scope.save = function(id) {
            $scope.todo.text = $scope.editableTitle;
            $scope.disableEditor();
            $http.post('/api/todos/' + id, {text:$scope.todo.text})
                .success(function(data){
                    console.log(data)

                })
                .error(function(data){
                    console.log('Error:' + data);
                });
        };

}