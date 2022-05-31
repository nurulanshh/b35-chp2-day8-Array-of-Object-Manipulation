const express = require ('express');

const app = express()
const port = 3000

const isLogin = true;

const month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',];



let projects = [
  {
  id: 1,
  title: 'Dumbways Web App - 2021',
  author: 'Nurul Anisah',
  startDate: '2021-01-12',
  endDate: '2021-03-12',
  duration: '3 month',
  nodejs: 'public/assets/nodejs.png',
  reactjs: 'public/assets/reactjs.png',
  js: 'public/assets/js.png',
  typescript: 'public/assets/typescript.png',
  content: 'App that used for Dumbways student, it was deployed and can downloaded on playstore. Happy download',
  image: ''
}
];

app.set('view engine', 'hbs'); //setup template engine / view engine

app.use('/public', express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: false }));

// Routing GET
app.get('/', (req, res) => {
    res.render('index',{isLogin, projects});
});


app.get('/add-project',(req, res) =>{
  res.render('add-project')

});

app.get('/contact-me', (req, res) => {
    res.render('contact-me');
  });

app.get('/delete-project/:id', (req, res) => {
    const id = req.params.id;
    const removeIndex = projects.findIndex( item => item.id === id );
    projects.splice( removeIndex, 1 );
    res.redirect('/');
});

app.get('/project-detail/:index', function (req, res){
  const index = req.params.index;
  const project = projects[index]

  res.render('project-detail', {isLogin: isLogin, project})
});

app.get('/edit-project/:index', function(req, res){
  const index = req.params.index;
  const edit = projects[index];  

  res.render('edit-project', {isLogin: isLogin, edit, id:index})
});

 // Routing POST 
  app.post('/contact-me', (req, res) => {
    const data = req.body;

      res.redirect('/contact-me');
  });
  
  
  app.post('/add-project', (req, res) => {
    const data = req.body;

    data.duration = durationTime(data['startDate'],data['endDate']);
    data.time = getFullTime(data['startDate'],data['startDate']);
    
    console.log(data);

    projects.push(data);
    console.log(projects);


    res.redirect('/');
});


app.post('/edit-project/:index', (req, res) => {
  const data = req.body;
  const index = req.params.index;

  data.duration = durationTime(data['startDate'],data['endDate']);
  data.time = getFullTime(data['startDate'],data['startDate']);
  
  console.log(data);

  projects[index]=data;
  console.log(projects);


  res.redirect('/');
});



app.listen(port, () => {
    console.log(`Server running on PORT: ${port}`);
  });


  

  //function

  function durationTime(startDate, endDate) {
    // Convert Start - End Date to Days
    let newStartDate = new Date(startDate)
    let newEndDate = new Date(endDate)
    let duration = Math.abs(newStartDate - newEndDate)
  
    let day = Math.floor(duration / (1000 * 60 * 60 * 24))
  
    if (day < 30) {
      return day + ` days `
    } 
    
    else {
      let diffMonths = Math.ceil(duration / (1000 * 60 * 60 * 24 * 30));
      if (diffMonths >= 1) {
        return diffMonths + ` months `
      }

      if (diffMonths < 12) {
        return diffMonths + ` months `
      } 
      
      else {
        let diffYears = Math.ceil(duration / (1000 * 60 * 60 * 24 * 30 * 12));
        if (diffYears >= 1) {
          return diffYears + ` years `
        }
      }
    }

    if (diffMonths < 12) {
      return diffMonths + ` months `
    } 
    
  };

  function getFullTime(time) {
    time = new Date(time);
    const date = time.getDate();
    const monthIndex = time.getMonth();
    const year = time.getFullYear();
    let hour = time.getHours();
    let minute = time.getMinutes();
  
    if (hour < 10) {
      hour = '0' + hour;
    }
  
    if (minute < 10) {
      minute = '0' + minute;
    }
  
    const fullTime = `${date} ${month[monthIndex]} ${year} ${hour}:${minute} WIB`;
  
    return fullTime;
  }


  