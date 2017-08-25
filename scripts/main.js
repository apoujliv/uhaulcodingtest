$(document).ready(function(){
  getAllUsers();
});

function displayUsers(users){
  //Get the users into a usable state via html
  var tmpl = $.templates("#hiddenUserTemplate");
    var data = users;
    var html = tmpl.render(data);
    $(".userList").html(html);
}

function displayPosts(posts, userId){
  var tmpl = $.templates("#hiddenPostsTemplate");
    var data = posts;
    var html = tmpl.render(data);
    $("#selectedUserPosts").html(html);

  var tmplSelected = $.templates("#selectedUserTemplate");
    var dataSelected = [{userId: userId}];
    var htmlSelected = tmplSelected.render(dataSelected);
    $("#selectedUser").html(htmlSelected);
}

function togglePostsDisplay(userId, element){
  element = $(element);
  var siblings = element.siblings();
  if(siblings.is(':visible')){
    siblings.slideUp();
    getPostsByUserId(userId);
  } else {
    siblings.slideDown();
    $("#selectedUserPosts").html("");
    $("#selectedUser").html("");
  }
}

function getPostsByUserId(userId){
  $.ajax({
    url: "http://jsonplaceholder.typicode.com/posts?userId=" + userId,
    method: "GET",
    success: function(data){
      displayPosts(data, userId);
    }
  });
}

function deletePostByPostId(postId){
  $.ajax({
    url: "http://jsonplaceholder.typicode.com/posts/" + postId,
    method: "DELETE",
    success: function(data){
      //Faking it.
      //If this were a real webservice, I'd call out to getPosts, or getPost again,
      //as it is, we'll just hand delete the post.
      $(".postBody[data-postId=" + postId + "]").parent().remove();
    }
  })
}

function editPostText(element, postId){
  element = $(element);
  var textarea = element.parent().children('textarea');
  var newBody = textarea.val();
  textarea.toggle();
  element.parent().children('.postBody').toggle();

  if ($(textarea).is(':hidden')){
    element.text("Edit");
    editPostByPostId(postId, newBody);
  } else {
    element.text("Save");
  }
}

function editPostByPostId(postId, body){
  $.ajax({
    url: "http://jsonplaceholder.typicode.com/posts/" + postId,
    method: "PUT",
    success: function(){
      //Faking it.
      //If this were a real webservice, I'd call out to getPosts, or getPost again,
      //as it is, we'll just hand edit the post.
      $(".postBody[data-postId=" + postId + "]").html(body);
    }
  })
}

function toggleNewPost(){
  $('.newPost').toggle();
}

function postNewPost(element, userId){
  element = $(element);
  var textarea = element.parent().children('textarea');
  var title = element.parent().children('.title');

  var newPost = {"body": textarea.val(), "title": title.val(), "userId": userId };

  $.ajax({
    url: " http://jsonplaceholder.typicode.com/posts",
    method: "POST",
    contentType: "application/json",
    body: newPost,
    success: function(){
      //Faking it.
      //If this were a real webservice, I'd call out to getPosts, or getPost again,
      //as it is, we'll just hand add the post.
      toggleNewPost();
      var tmpl = $.templates("#hiddenPostsTemplate");
        var data = newPost;
        var html = tmpl.render(data);
        $("#selectedUserPosts").append(html);
    }
  })
}

function getAllUsers(){
  $.ajax({
    url: "http://jsonplaceholder.typicode.com/users",
    method: "GET",
    success: function(data){
      displayUsers(data);
    }
  });
}

function alphabetize(direction){
  //I am running out of time to write this,
  //but the general gist would be that I would call my
  //displayPosts() function, (first adding in an 'alphabetize' param,
  // which it doesn't currently have).
  //I'd write a function that would allow me to sort an array by a property value,
  //(with the alphabetize param letting me specify which way to sort it)
  //and then after the data had been manipulated, I'd let the rest of the function
  //handle displaying it.
}
