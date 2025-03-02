import { isUtf8 } from "buffer";
import express from "express";
import fs from "fs"
const app = express();
const PORT = 3000;


// const employees = [
//   {
//     id: 1,
//     cedula: "123456789",
//     fullname: "John Doe",
//     pricePerHour: 20,
//   },
//   {
//     id: 2,
//     cedula: "987654321",
//     fullname: "Jane Smith",
//     pricePerHour: 25,
//   },
//   {
//     id: 3,
//     cedula: "456789123",
//     fullname: "Alice Johnson",
//     pricePerHour: 30,
//   },
// ];
const workedHour = [];
const cargo = [];
const salary = [];
const login = [];
const permiso = [];
const nomina = [];

app.use(express.json());

app.get("/",(req, res)=>{

})

const getEmployee = () =>{
    
    const data = fs.readFileSync("./employees.json", "utf-8")
    const parseData = JSON.parse(data)
    return parseData
}

const getHoursWorked = () => {
    const data = fs.readFileSync("./workedhours.json", "utf-8")
    const parseData = JSON.parse(data)
    return parseData
}
const getCargos = () => {
  const data = fs.readFileSync("./cargos.json")
  const parseData = JSON.parse(data)
  return parseData
}



    

//Route for Employee


app.get("/employees/all", (req, res) => {
  res.json(getEmployee());
});

app.get("/employee/:id", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)) {
    res.status(400).send({ message: "Please enter valid employee" });
  }
  const findEmployee = parseData.find((employee) => employee.id === parsedId);
  if (!findEmployee) {
    res.status(404);
  }
  res.send(findEmployee)
});

app.get("/employee/:id/hours", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)){
    res.status(400).send({message:"Bad Request"})
  }
  const employeeList = getEmployee()
  const employee = employeeList.find((employee)=> employee.id === parsedId)
  console.log(employee);
  if(!employee){
    res.status(404).send()
  }
  const employeeWorkedHours = employee.workedHours
  console.log(employeeWorkedHours)
  res.json(employeeWorkedHours)
});
app.get("/employee/:id/salary", (req, res) => {
  const parsedId = parseInt(req.params.id);
  if (isNaN(parsedId)){
    res.status(400).send({message:"Bad Request"})
  }
  const employeeList = getEmployee()
  const employee = employeeList.find((employee)=> employee.id === parsedId)
  console.log(employee);
  if(!employee){
    res.status(404).send()
  }
  const employeeSalary = employee.salary
  res.json(employeeSalary)
});

app.post("employee/create", (req, res) => {});

app.put("employee/update", (req, res) => {
  
});
app.patch("employee/delete/:id", (req, res) => {});

// Route for cargo

app.get("/cargo/all", (req, res) => {
  res.json();
});
app.get("/cargo/:id", (req, res) => {

});
app.get("/cargo/:id/empleado", (req, res) => {});
app.get("/cargo/empleado/:id", (req, res) => {});
app.get("/cargo/:id/empleado/:id", (req, res) => {});
app.get("/cargo/:id/salary", (req, res) => {});

app.post("/cargo/create", (req, res) => {});
app.post("/cargo/asignEmployee", (req, res) => {
  const { employeeId, cargo } = req.body;
});

app.put("/cargo/update", (req, res) => {});

app.patch("/cargo/delete/:id", (req, res) => {});

//Route for Ponche

app.get("/ponche/all", (req, res) => {});
app.get("/ponche/empleado/:id", (req, res) => {});
app.get("/ponche/:entryDate/empleado/:id", (req, res) => {});
app.get("/ponche/:id/empleado/:id", (req, res) => {});

app.put("/ponche/ponchar/", (req, res) => {});

//Route for Nomina

app.get("/nomina/all", (req, res) => {});
app.get("/nomina/empleado/:id", (req, res) => {});
app.get("/nomina/:id/empleado/:id", (req, res) => {});

app.post("/nomina/genNomina", (req, res) => {});

//Route for login
app.get("/account/rol", (req, res) => {});
app.get("/account/rol/:id", (req, res) => {});
app.get("/account/:user/rol/:id/permisos", (req, res) => {});

app.post("/account/login", (req, res) => {});
app.post("/account/rol/create", (req, res) => {});
app.post("/account/register", (req, res) => {});

app.put("/account/rol/asignPermission/", (req, res) => {});
app.put("/account/rol/update/", (req, res) => {});

// Permisos

app.get("/permisos/all", (req, res) => {});
app.get("/permisos/:id", (req, res) => {});
app.post("/permisos/create", (req, res) => {});
app.put("/permisos/update", (req, res) => {});
app.patch("/permisos/delete", (req, res) => {});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
