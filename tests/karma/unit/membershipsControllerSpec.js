'use strict';

describe('membershiplist Module', function() {

  beforeEach(function() {
    module('membershiplist');
  });
  describe('Memberships Controller', function() {
    var rootScope, controller;

    beforeEach(inject(function($rootScope, $controller) {
      rootScope = $rootScope;
      controller = $controller;
    }));

    describe('Upon memberships controller cretion', function() {
      var scope;
      var membershipController;
      var membershiplistMockData = [
                        {
                            "id": "1",
                            "contact_id": "5",
                            "membership_type_id": "1",
                            "join_date": "2016-10-14",
                            "start_date": "2016-10-14",
                            "end_date": "2018-10-13",
                            "source": "Payment",
                            "status_id": "1",
                            "is_test": "0",
                            "is_pay_later": "0",
                            "membership_name": "General",
                            "relationship_name": "Head of Household for"
                        },
                        {
                            "id": "2",
                            "contact_id": "54",
                            "membership_type_id": "2",
                            "join_date": "2016-10-13",
                            "start_date": "2016-10-13",
                            "end_date": "2017-10-12",
                            "source": "Check",
                            "status_id": "1",
                            "is_test": "0",
                            "is_pay_later": "0",
                            "membership_name": "Student",
                            "relationship_name": "Child of"
                        },
                        {
                            "id": "3",
                            "contact_id": "202",
                            "membership_type_id": "1",
                            "join_date": "2016-10-12",
                            "start_date": "2016-10-12",
                            "end_date": "2018-10-11",
                            "source": "Payment",
                            "status_id": "1",
                            "is_test": "0",
                            "is_pay_later": "0",
                            "membership_name": "General",
                            "relationship_name": "Head of Household for"
                        },
                        {
                            "id": "4",
                            "contact_id": "113",
                            "membership_type_id": "2",
                            "join_date": "2016-10-11",
                            "start_date": "2016-10-11",
                            "end_date": "2017-10-10",
                            "source": "Donation",
                            "status_id": "1",
                            "is_test": "0",
                            "is_pay_later": "0",
                            "membership_name": "Student",
                            "relationship_name": "Child of"
                        }
      ];

      beforeEach(inject(['$controller', function() {
        scope = rootScope.$new();
        var apiCalls = {
          "is_error": 0,
          "version": 1,
          "count": 25,
          "values": [
                        {
                            "id": "1",
                            "contact_id": "5",
                            "membership_type_id": "1",
                            "join_date": "2016-10-14",
                            "start_date": "2016-10-14",
                            "end_date": "2018-10-13",
                            "source": "Payment",
                            "status_id": "1",
                            "is_test": "0",
                            "is_pay_later": "0",
                            "membership_name": "General",
                            "relationship_name": "Head of Household for"
                        },
                        {
                            "id": "2",
                            "contact_id": "54",
                            "membership_type_id": "2",
                            "join_date": "2016-10-13",
                            "start_date": "2016-10-13",
                            "end_date": "2017-10-12",
                            "source": "Check",
                            "status_id": "1",
                            "is_test": "0",
                            "is_pay_later": "0",
                            "membership_name": "Student",
                            "relationship_name": "Child of"
                        },
                        {
                            "id": "3",
                            "contact_id": "202",
                            "membership_type_id": "1",
                            "join_date": "2016-10-12",
                            "start_date": "2016-10-12",
                            "end_date": "2018-10-11",
                            "source": "Payment",
                            "status_id": "1",
                            "is_test": "0",
                            "is_pay_later": "0",
                            "membership_name": "General",
                            "relationship_name": "Head of Household for"
                        }],
          membershipList: membershiplistMockData
        }

        var controllerDeps = {
          $scope: scope,
          apiCalls: apiCalls,
          crmStatus:{},
          membershipList:membershiplistMockData
        };

        membershipController = controller('MembershiplistMembershipsController', controllerDeps);
      }]));

      it('has a returnFields property of type array', function() {
        expect(membershipController.returnFields).toEqual(jasmine.any(Array));
        expect(membershipController.returnFields).toEqual(['membership_name','contact_id','start_date','end_date','status_id','source','relationship_name']);
      });

      it('has a searchObject property with at least the return property', function() {
        expect(membershipController.searchObject).toEqual(jasmine.any(Object));
        expect(membershipController.searchObject.return).toEqual(jasmine.any(Array));
      });

      it('has a filterOperators property of type object', function() {
        expect(membershipController.filterOperators).toEqual(jasmine.any(Object));
        expect(membershipController.filterOperators.start_date).toEqual('>');
        expect(membershipController.filterOperators.end_date).toEqual('<');

        expect(scope.membershipList).toEqual(membershiplistMockData);
        expect(scope.search).toEqual(jasmine.any(Function));
      });

    });

  });
});
