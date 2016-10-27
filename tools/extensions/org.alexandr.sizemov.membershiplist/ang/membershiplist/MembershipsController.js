(function(angular, $, _) {

  angular.module('membershiplist').config(function($routeProvider) {
      $routeProvider.when('/membershipslist', {
        controller: 'MembershiplistMembershipsController',
        templateUrl: '~/membershiplist/MembershipsController.html',        
        resolve: {
          membershipList: function(crmApi) {
            return crmApi('Membership', 'get', {
              "sequential": 1,
              return:['contact_id','membership_name','start_date','end_date','status_id','source','relationship_name']
            });
          }
        }
      });
    }
  );

  // Base search controller
  function BaseSearchController(){

    this.returnFields = [];
    this.searchObject = {'options':{}};
    this.filterOperators = {};

    this.composeSearch = function(filters, filterOperators){

      var searchFilters = {}
      _.keys(filters).forEach(function(filter){
        if(filters[filter] && filters[filter].length > 0){
          var currentFilter = {}
          currentFilter[filterOperators[filter]] = filters[filter]
          searchFilters[filter] = currentFilter
        }
      });
      return _.assign(this.searchObject, searchFilters);
    }
  }

  // MembershipsController extends BaseSearchController
  MembershipsController.prototype = new BaseSearchController();
  MembershipsController.prototype.constructor = BaseSearchController;

  function MembershipsController($scope, crmApi, crmStatus, membershipList){
    // redefine or extends return fields
    this.returnFields = this.returnFields.concat(['membership_name', 'contact_id','start_date','end_date','status_id','source','relationship_name'])

    // extends base search
    var searchObject = {
      "sequential": 1,
      return: this.returnFields
    };
    this.searchObject = _.assign(this.searchObject, searchObject); 

    // extends base filters
    var filterOperators = {
      start_date:'>',
      end_date:'<'
    };
    this.filterOperators = _.assign(this.filterOperators, filterOperators); 

    // attach to scope
    var ts = $scope.ts = CRM.ts('membershiplist');
    $scope.membershipList = membershipList;
    $scope.search = _.bind(function search() {
      var currentSearch = this.composeSearch($scope.filter, this.filterOperators)
      return crmStatus(
        {start: ts('Searching...'), success: ts('Search finish')},
        crmApi('Membership', 'get', currentSearch).then(function(result){
          $scope.membershipList = result;
        })
      );
    },this);
  }

  angular.module('membershiplist')
    .controller('MembershiplistMembershipsController', MembershipsController);

})(angular, CRM.$, CRM._);
