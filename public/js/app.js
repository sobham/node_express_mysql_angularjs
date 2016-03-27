angular.module("contactsApp", ['ngRoute'])
    .config(function($routeProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "list.html",
                controller: "ListController",
                resolve: {
                    customers: function(Customers) {
                        return Customers.getContacts();
                    }
                }
            })
            .when("/new/customer", {
                controller: "NewCustomerController",
                templateUrl: "contact-form.html"
            })
            .when("/customer/:customerId", {
                controller: "EditContactController",
                templateUrl: "contact.html"
            })
            .otherwise({
                redirectTo: "/"
            })
    })
    .service("Customers", function($http) {
        this.getContacts = function() {
            return $http.get("/customers").
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding customers.");
                });
        }
        this.createCustomer = function(customer) {
            return $http.post("/customers/add", customer).
                then(function(response) {
                    console.log("response in createCustomer---"+response)
                    return response;
                }, function(response) {
                    alert("Error creating customer.");
                });
        }
        this.getContact = function(contactId) {
            var url = "/customers/" + contactId;
            return $http.get(url).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error finding this contact.");
                });
        }
        this.editContact = function(contact) {
            var url = "/contacts/" + contact._id;
            console.log(contact._id);
            return $http.put(url, contact).
                then(function(response) {
                    return response;
                }, function(response) {
                    alert("Error editing this contact.");
                    console.log(response);
                });
        }
        this.deleteCustomer = function(cid) {
            var url = "/customers/" + cid;
            return $http.delete(url).
                then(function(response) {
                   
                    return response;
                  
                }, function(response) {
                    alert("Error deleting this Customer.");
                    console.log(response);
                });
        }
    })

    .controller("ListController", function(customers, $scope,$location, Customers) {
        $scope.customers = customers.data;

        $scope.deleteCustomer = function(cid) {
            console.log("cid---"+cid)
            Customers.deleteCustomer(cid);
              $location.path("#/");

        }
    })


    .controller("NewCustomerController", function($scope, $location, Customers) {
        $scope.back = function() {
            $location.path("#/");
        }

        $scope.saveCustomer = function(customer) {

            console.log("--->"+customer)
            
            Customers.createCustomer(customer).then(function(doc) {
                              $location.path("#/");

                //console.log("in SaveContact--->"+doc);

               // var contactUrl = "/customers/";

               // $location.path(contactUrl);

            }, function(response) {
                alert(response);
            });
        }
    })
    .controller("EditContactController", function($scope, $routeParams, Contacts) {
        Contacts.getContact($routeParams.contactId).then(function(doc) {
            $scope.contact = doc.data;
        }, function(response) {
            alert(response);
        });

        $scope.toggleEdit = function() {
            $scope.editMode = true;
            $scope.contactFormUrl = "contact-form.html";
        }

        $scope.back = function() {
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.saveContact = function(contact) {
            Contacts.editContact(contact);
            $scope.editMode = false;
            $scope.contactFormUrl = "";
        }

        $scope.deleteContact = function(contactId) {
            Contacts.deleteContact(contactId);
        }
    });