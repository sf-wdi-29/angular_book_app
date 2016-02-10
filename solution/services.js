angular.module('postApp').factory('Post', PostFactory);

function PostFactory($resource) {
  return $resource('http://jsonplaceholder.typicode.com/posts/:id', { id: '@_id' }, {
    update: {
     method: 'PUT' // this method issues a PUT request
   }
  });
};
