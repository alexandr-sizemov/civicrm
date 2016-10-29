 /*
  * Membership conroller
  *  Provides memberships listing with date filter
  */


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

  // Base search controller 'Class'
  function BaseSearchController(){

    // fields returned by the api
    this.returnFields = [];

    // base search configuration
    this.searchObject = {'options':{}};

    // base filters operators
    this.filterOperators = {
      start_date:'='
    };

    // given filters and operations on filters builds the search object
    // es:
    // @param filters: {start_date: "2011-10-06", end_date: "2016-10-11"}
    // @param filterOperators: {start_date: ">", end_date: "<"}
    // return  
    // {
    //   sequential: 1,
    //   end_date: { '<': "2016-10-19"},
    //   start_date: {'>': "2016-10-03"},
    //   options: {
    //     return: ["membership_name", ...]
    //     }
    // } 
    this.composeSearch = function(filters, filterOperators){
      var searchFilters = {}

      // for each filter
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
    // redefine or extends the return fields
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
