
import express from "express";
import fs from "fs"
const app = express();
const PORT = 3000;




app.use(express.json());


let employeeCounter = 0; 
const employees = []; 
let cargoCounter = 0
const cargos = [];

const getEmployee = () =>{
    
    const data = fs.readFileSync("./employees.json", "utf-8")
    const parseData = JSON.parse(data)
    return parseData
}

const getCargos = () => {
  const data = fs.readFileSync("./cargos.json")
  const parseData = JSON.parse(data)
  return parseData
}



    

//Routes for Employee


app.get("/employees/all", (req, res) => {
  res.json(getEmployee());
});



app.get("/employee/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    res.status(400).send({ message: "Please enter valid employee" });
  }

  const employee  = getEmployee()
  
  

  const findEmployee = employee.find((employee) => employee.id === parsedId);
  if (!findEmployee) {
    res.status(404);
  }
  res.send(findEmployee);
});


app.get("/employee/:id/hours", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)){
    res.status(400).send({message:"Bad Request"})
  }
  const employeeList = getEmployee()
  const employee = employeeList.find((employee)=> employee.id === parsedId)

  if(!employee){
    res.status(404).send()
  }
  const employeeFullName = employee.fullName
  
  const employeeWorkedHours = employee.workedHours
  res.json(`Name: ${employeeFullName} | Worked Hours: ${employeeWorkedHours}`)
});



app.get("/employee/:id/salary", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)){
    res.status(400).send({message:"Bad Request"})
  }
  const employeeList = getEmployee()
  const employee = employeeList.find((employee)=> employee.id === parsedId)
  if(!employee){
    res.status(404).send()
  }
  const employeeSalary = employee.salary
  res.json(employeeSalary)
});



app.post("/employees", (req, res) => {
  
  if (!req.body.cedula || !req.body.fullName || !req.body.pricePerHour || !req.body.workedHours) {
    return res.status(400).json
  }


  const salary = req.body.pricePerHour * req.body.workedHours;

  const newEmployee = {
    id: employeeCounter++, 
    cedula: req.body.cedula,
    fullName: req.body.fullName,
    pricePerHour: req.body.pricePerHour,
    workedHours: req.body.workedHours,
    salary: salary 
  };

  employees.push(newEmployee);
  res.status(201).json(newEmployee);
});

//Body:

// {
//   "cedula": "123456789",
//   "fullName": "Maria Garcia",
//   "pricePerHour": 30.00,
//   "workedHours": 35
// }


app.post("/employee/:id/hours",(req, res)=>{

})
app.put("/employee/:id",(req, res)=>{

})
app.delete("/employee",(req, res)=>{

})




// Routes for cargo

app.get("/cargos/all", (req, res) => {
  res.json(getCargos())
});
app.get("/cargo/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    res.status(400).send({ message: "Please enter valid cargo" });
  }

  const cargoList = getCargos()
  

  const findCargo = cargoList.find((cargo) => cargo.id === parsedId);
  if (!findCargo) {
    res.status(404);
  }
  
  res.send(findCargo)
});



app.get("/cargo/:id/employee", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    res.status(400).send({ message: "Please enter valid cargo" });
  }

  const employeeCargos = getEmployee()
  const cargo = employeeCargos.find((cargo) => cargo.id === parsedId);
  if (!cargo) {
    res.status(404);
  }
  const employeeCargo = cargo.cargo;
  const employeeName = cargo.fullName
  
  res.send(`el empleado: ${employeeName} tiene un cargo de ${employeeCargo} `)
});


app.get("/cargo/:id/salary", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    res.status(400).send({ message: "Please enter valid cargo" });
  }

  const employeeCargos = getEmployee()
  const cargo = employeeCargos.find((cargo) => cargo.id === parsedId);
  if (!cargo) {
    res.status(404);
  }
  const employeeCargo = cargo.cargo;
  const cargoSalary = cargo.salary; 
  res.send(`Los empleados del cargo ${employeeCargo}, tienen un salario de ${cargoSalary}Dop`)

});



app.post("/cargo/create", (req, res) => {
  if(!req.body.cargo || !req.body.salary){
    return res.status(400).json
  }
  const newCargo = {
    id: cargoCounter++,
    cargo:req.body.cargo,
    salary:req.body.salary
  }
  cargos.push(newCargo);
  res.status(201).json(newCargo)
});

//Body:

// {
//  "cargo":"Manager", "salary":"25000"
// }



app.post("/cargo/asignEmployee", (req, res) => {});


app.put("/cargo/update", (req, res) => {});


app.patch("/cargo/delete/:id", (req, res) => {});

//Routes for Ponche

app.get("/ponche/all", (req, res) => {});
app.get("/ponche/empleado/:id", (req, res) => {});
app.get("/ponche/:entryDate/empleado/:id", (req, res) => {});
app.get("/ponche/:id/empleado/:id", (req, res) => {});

app.put("/ponche/ponchar/", (req, res) => {});

//Routes for Nomina

app.get("/nomina/all", (req, res) => {});
app.get("/nomina/empleado/:id", (req, res) => {});
app.get("/nomina/:id/empleado/:id", (req, res) => {});
app.post("/nomina/genNomina", (req, res) => {});

//Routes for login
app.get("/account/rol", (req, res) => {});
app.get("/account/rol/:id", (req, res) => {});
app.get("/account/:user/rol/:id/permisos", (req, res) => {});

app.post("/account/login", (req, res) => {});
app.post("/account/rol/create", (req, res) => {});
app.post("/account/register", (req, res) => {});

app.put("/account/rol/asignPermission/", (req, res) => {});
app.put("/account/rol/update/", (req, res) => {});

// Routes for Permisos

app.get("/permisos/all", (req, res) => {});
app.get("/permisos/:id", (req, res) => {});
app.post("/permisos/create", (req, res) => {});
app.put("/permisos/update", (req, res) => {});
app.patch("/permisos/delete", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
