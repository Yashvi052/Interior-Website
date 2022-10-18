const { json } = require('express');
var express = require('express');
var router = express.Router();
var UsersModel = require('../schema/user_table');


/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});


router.get('/signup', function (req, res, next) {
  res.render('signup');
});


router.post('/signup', function (req, res, next) {
  var my1 = req.body.username;
  console.log(my1);
  var my2 = req.body.email;
  console.log(my2);
  var my3 = req.body.phone;
  console.log(my3);
  var my4 = req.body.password;
  console.log(my4);

  req.session.mysess1 = my1;
  console.log("session value is" + req.session.mysess1);
  req.session.mysess2 = my2;
  console.log("session value is" + req.session.mysess2);
  req.session.mysess3 = my3;
  console.log("session value is" + req.session.mysess3);
  req.session.mysess3 = my4;
  console.log("session value is" + req.session.mysess4);


  var fileobject = req.files.file123;
  var filename = req.files.file123.name;
  var filesize = req.files.file123.size;
  var filemimetype = req.files.file123.mimetype;

  fileobject.mv("public/upload/" + filename, function (err) {
    if (err)
      return res.status(500).send(err)
    ///res.send('file uploaded!')
    //res.redirect("/login")
  })

  console.log(req.body);

  const mybodydata = {
    user_name: req.body.username,
    user_email: req.body.email,
    user_phone: req.body.phone,
    user_password: req.body.password
  }
  var data = UsersModel(mybodydata);

  data.save(function (err) {
    if (err) {
      console.log('error in insert record');
    } else {
      res.render('signup');
    }
  })

  res.redirect("/login")


});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Express' });
});

router.post('/login', function (req, res, next) {
  var a = req.session.mysess2;
  var b = req.body.email;

  if (a && b) {
    console.log('same')
    res.redirect('/')
  } else {
    console.log('not')
    res.redirect('/')
  }


});

router.get('/logout', function (req, res, next) {
  res.session.destroy(function (err) {
    res.redirect('/login')
  }
  )
});

router.get('/display', function(req, res, next) {
  UsersModel.find(function(err,db_users_array){
    if (err) {
      console.log('error in fetch data'+ err);
    }else{
      console.log(db_users_array);
      res.render('display', {user_array : db_users_array});
    }
  });
  
  
});

router.get('/display', function(req, res, next) {
  UsersModel.find(function(err,db_users_array){
    if (err) {
      console.log('error in fetch data'+ err);
    }else{
      console.log(db_users_array);
      res.render('display', {user_array : db_users_array});
    }
  });
  
  
});

router.get('/get-display', function(req, res, next) {
  UsersModel.find({},function(err,db_users_array){
    if (err) {
    res.send (JSON.stringify({'flag':0,'message':'Error in API','err':err}));
    }else{
      console.log(db_users_array);
      res.send(JSON.stringify({'flag':0,'message':'Data Listing','data':db_users_array}));
    //  res.render('display', {user_array : db_users_array});
    }
  });
  
  
});


router.get('/edit/:id',function(req,res){
  console.log(req.params.id);

  UsersModel.findById(req.params.id,function(err,db_users_array){
    if(err){
      console.log("edit fetch error "+ err);
    }else{
      console.log(db_users_array);
      res.render('edit-form',{user_array:db_users_array});
    }
  });
});


router.post('/edit/:id', function(req,res){
  
  const mybodydata = {
    user_name: req.body.txt1,
    user_email: req.body.txt2,
    user_phone : req.body.txt3,
    user_password : req.body.txt4
  }
  UsersModel.findByIdAndUpdate(req.params.id,mybodydata,function(err){
    if(err){
      console.log("error in record update");
      res.redirect('/display');
    }else{
      res.redirect('/display')
    }
  })
});

router.get('/delete/:id',function(req,res){
  var delete_id = req.params.id;
  console.log('delete id is ' ,delete_id);
  UsersModel.findOneAndRemove({_id:delete_id},function(err,project){
    if(err){
      console.log("error in record delete" + err);
      res.redirect('/display');
    }else{
      console.log("record deleted" );
      res.redirect('/display');
    }
  });
});

router.delete('/delete-api', function(req,res,next){
  UsersModel.findByIdAndRemove(req.body._id, function(err,post){
    if(err){
      res.send(JSON.stringify({'flag':0,'message':'Error in API','err': err}));
    }else{
      res.send(JSON.stringify({'flag':1,'message':'record deleted'}));
    }
  });
});

router.get('/show/:id',function(req,res){
  console.log(req.params.id);
  UsersModel.findById(req.params.id,function(err,db_users_array){
    if (err) {
      console.log('err in single record fatch'+ err);

    }else{
      console.log(db_users_array);
      res.render('single-record',{user_array:db_users_array});
    }
  });
});



module.exports = router;
