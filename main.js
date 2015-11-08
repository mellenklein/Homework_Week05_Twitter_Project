//left side: displayed in brower. right side: fucnction to call.
var AppRouter = Backbone.Router.extend({
  routes: {
    ''          :'home',
    'login'     :'login',
    'register'  :'register',
    'dashboard' :'dashboard', // need to make funciton called db
    'users'     :'users', //need to make function called users
    'user/:id'  :'userId'  //need to make function called userId
  },

  home: function(){
    tweetsCollection.fetch({
      success: function(){
        $('.feed').html(feedView.el);
      },
    });
      var headerView = new HeaderView();
      headerView.render();
      $('.top').html(headerView.el);
  },

  dashboard: function(){
    dashboardCollection.fetch({
      success: function(){
        $('.feed').html(dashboardView.el);
      },
    });
      var headerView = new HeaderDashboardView();
      headerView.render();
      $('.top').html(headerView.el);
  },

  userId: function(){
    tweetsCollection.fetch({
      success: function(){
        $('.feed').html(feedView.el);
      }
    });
    var headerView = new HeaderDashboardView();
    headerView.render();
    $('.top').html(headerView.el);
  },

  login: function(){
    var view = new FormView();
    $('main').html(view.render().$el);
    var headerView = new HeaderLoginView();
    headerView.render();
    $('.top').html(headerView.el);
  },

  register: function(){
    var view = new regView();
    $('main').html(view.render().$el);
    // $('.form').html('Register');
    // $('.form').attr('href', 'register');

    var headerView = new HeaderRegisterView();
    headerView.render();
    $('.top').html(headerView.el);
  }
});

// $('nav a').click(function(){
//
// });

// $.ajaxSetup({
//  headers: {
//    "Authorization": "token " + token
//  }
// });



//////////////////////////////////////////
//       MODELS AND COLLECTIONS        //
////////////////////////////////////////
// Make a new model.
var Tweet = Backbone.Model.extend({
  // When we make a new Tweet,
  // this will use the GET Method to print a new tweet from this API.
  url: 'https://twittertiy.herokuapp.com/users'
});

// Make a new collection.
var Tweets = Backbone.Collection.extend({
  model: Tweet,
  url: 'https://twittertiy.herokuapp.com/users'
});

var Dashboard = Backbone.Collection.extend({
  model: Tweet,
  url: 'https://twittertiy.herokuapp.com/users'
});

// Make a new Model for the login and register pages:
var Form1 = Backbone.Model.extend({
  //When we click the login button,
  // this will use the POST method to send the form info to the server.
  url: 'http://twittertiy.herokuapp.com/collections/chat'
});

// Make a new Collection and Model for the user data

var user = Backbone.Model.extend({
  url: 'https://twittertiy.herokuapp.com/users'
});


var users = Backbone.Collection.extend({
  url: 'https://twittertiy.herokuapp.com/users',
  model: user,
});

var newUsers = new users();



//////////////////////////////////////////
//              VIEWS                  //
////////////////////////////////////////
//Make a new view for individual tweets.
var TweetView = Backbone.View.extend({
  tagName: 'article',
  className: 'tweet',
  template: _.template($('#tweetViewTemplate').html()),

  initialize: function(){
    this.listenTo(this.collection, 'fetch sync', this.render)
  },

  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  }
});

//Make a new view the twitter feed.
var FeedView = Backbone.View.extend({
  // tagName: 'section',
  // className: 'feed',

  initialize: function(){
    this.listenTo(this.collection, 'fetch sync', this.render)
  },

  render: function(){
    var view = this;

    this.$el.html('');
    this.collection.each(function(model){
      var tweet = new TweetView({
        model: model
      });
      tweet.render();
      view.$el.append(tweet.el);
    });
  }
});

var DashboardTweetView = Backbone.View.extend({
  tagName: 'article',
  className: 'tweet',
  template: _.template($('#followedTweetsTemplate').html()),

  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));
    return this;
  }
});

var DashboardFeedView = Backbone.View.extend({
  // tagName: 'section',
  // className: 'feed',

  initialize: function(){
    this.listenTo(this.collection, 'fetch sync', this.render)
  },

  render: function(){
    var view = this;

    this.$el.html('');
    this.collection.each(function(model){
      var tweet = new DashboardTweetView({
        model: model
      });
      tweet.render();
      view.$el.append(tweet.el);
    });
  }
});

//Make a new view for the form.
var FormView = Backbone.View.extend({
  tagName: 'section',
  className: 'form',
  template: _.template($('#LoginTemplate').html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

//Make a new view for the header.
var HeaderView = Backbone.View.extend({
  tagName: 'nav',
  className: 'top',
  template: _.template($('#headerHomeTemplate').html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var HeaderDashboardView = Backbone.View.extend({
  tagName: 'nav',
  className: 'top',
  template: _.template($('#headerDashboardTemplate').html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var regView = Backbone.View.extend({
  tagName: 'section',
  className: 'regForm',
  template: _.template($('#RegisterTemplate').html()),
  events: {
    'click .registerBtn': 'handleReg'
  },

  send: function(){
    var email = $('.email').val();
    var password1 = $('.pwd').val();
    var password2 = $('.pwd2').val();
     if (email.trim() === '' || password1.trim() === '' || password2.trim() === ''){
       alert('Please complete the form before submitting');
     } else if (password1 != password2) {
       alert('Passwords do not match!')
     } else {
       newUsers.create({"user":{
         "email": email,
         "password": password1
       }});
       $('.email').val('');
       $('.pwd').val('');
       $('.pwd2').val('');
       alert('Thank you for registering!');
     }
   },

   handleReg: function(){
     event.preventDefault();

     this.send();
   },

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});


var HeaderLoginView = Backbone.View.extend({
  tagName: 'nav',
  className: 'top',
  template: _.template($('#headerLoginTemplate').html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});

var HeaderRegisterView = Backbone.View.extend({
  tagName: 'nav',
  className: 'top',
  template: _.template($('#headerRegisterTemplate').html()),

  render: function(){
    this.$el.html(this.template());
    return this;
  }
});



//////////////////////////////////////////
//              RENDERING              //
////////////////////////////////////////
// creates new instance of Collection (collected tweets)
var tweetsCollection = new Tweets();

// creates new instance of View of the feed.
var feedView = new FeedView({
  collection: tweetsCollection
});

var dashboardCollection = new Dashboard();

var dashboardView = new DashboardFeedView({
  collection: dashboardCollection
});



var router = new AppRouter();   //tells Backbone to listen for changes
Backbone.history.start();
