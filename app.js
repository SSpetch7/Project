const   express         = require('express'),
        app             = express(),
        bodyParser      = require('body-parser'),
        mongoose        = require('mongoose'),
        methodOverride  = require('method-override'),
        passport        = require('passport'),
        LocalStrategy   = require('passport-local'),
        Collection      = require('./models/item'),
        Comment         = require('./models/comment'),
        User            = require('./models/user'),
        seedDB          =  require('./seeds');

var itemRoutes = require('./routes/item'),
    commentRoutes    = require('./routes/comments'),
    indexRoutes    = require('./routes/index'),
    commentV2Routes = require('./routes/commentsNewV');
    
// database
mongoose.connect('mongodb://localhost/BItem');
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');
app.use(methodOverride('_method'));
//Static File( CSS )
app.use(express.static('public'))
app.use('/css',express.static(__dirname+'public/css'))
//seedDB();

app.use(require('express-session')({
    secret: 'secret is always secret.',
    resave: false,
    saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req,res,next){
    res.locals.currentUser = req.user ;
    next();
})

/*CSS*/ 
app.use('/public',function(req,res,next){
    next();
});

app.use('/',indexRoutes);
app.use('/item',itemRoutes);
app.use('/item/:id/comments',commentRoutes);
/*app.use('/do-comment',commentV2Routes);*/

app.listen(3000,function(){
    console.log('SHOPERSHOPER is started.');
});
