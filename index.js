
const Manager = require('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const inquirer = require('inquirer');
const fs = require('fs');

//TODO - write your inquirer app here to gather information about the team members, and generate the HTML file using fs

const team = [];

function newTeam() {
    inquirer.prompt([
        {
            type: 'input',
            name: 'name',
            message:'What is the team members name?',
        },
        {
            type: 'input',
            name: 'id',
            message: 'What is the team members id?',
        },
        {
            type: 'input',
            name: 'email',
            message: 'What is the team members email?',
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the team members role?',
            choices: ['Manager', 'Engineer', 'Intern'],
        },
]).then(({name, id, email, role}) => {
    switch (role) {
        case 'Manager':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'officeNumber',
                    message: 'What is the managers office number?',                   
                },
            ]).then(({officeNumber}) => {
                team.push(new Manager(name, id, email, officeNumber));
                addMember();

            })
            break;
        case 'Engineer':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'github',
                    message: 'What is the engineers github username?',
                },
            ]).then(({github}) => {
                team.push(new Engineer(name, id, email, github));
                addMember();
            })
            break;
        case 'Intern':
            inquirer.prompt([
                {
                    type: 'input',
                    name: 'school',
                    message: 'What school does the intern attend?',
                },
            ]).then(({school}) => {
                team.push(new Intern(name, id, email, school));
                addMember();
            })
            break;
        }
    })
}

function addMember() {
    inquirer.prompt([
        {
            type:'list',
            name:'addMember',
            message:'Would you like to add another team member?',
            choices: ['Yes', 'No'],
        },
    ]).then(({addMember}) => {
        if (addMember === 'Yes') {
            newTeam();
        } else {
            generateHTML();
        }
    })
}

function generateHTML() {
    const html = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Team Profile</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-GLhlTQ8iRABdZLl6O3oVMWSktQOp6b7In1Zl3/Jr59b6EGGoI1aFkw7cmDA6j6gD" crossorigin="anonymous">
    </head>
    <body>
        <header>
            <div class="p-5 text-center bg-danger">
                <h1 class="mb-3">My team</h1>
            </div>
        </header>
        <div class="container">
            <div class="row">
                <div class="col-12 d-flex flex-wrap justify-content-center">
                    ${generateTeam(team)}
                </div>
            </div>
        </div>
    </body>
    </html>
    `
    fs.writeFileSync('./index.html', html, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    })
}

function generateTeam(team) {
    let html = '';
    team.forEach((member) => {
        if (member.getRole() === 'Manager') {
            html += `
            <div class="card" style="width: 18rem; margin: 1rem;">
                <div class="card-header border-bottom-0 bg-primary">
                <h2>${member.name}</h2>
                </div>
                <div class="card-header bg-primary">
                    <h3>Manager</h3>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${member.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${member.email}">${member.email}</a></li>
                <li class="list-group-item">Office number: ${member.officeNumber}</li>
                </ul>
            </div>`
        } else if (member.getRole() === 'Engineer') {
            html += `
            <div class="card" style="width: 18rem; margin: 1rem;">
                <div class="card-header border-bottom-0 bg-primary">
                <h2>${member.name}</h2>
                </div>
                <div class="card-header bg-primary">
                    <h3>Engineer</h3>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${member.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${member.email}">${member.email}</a></li>
                <li class="list-group-item">Github: <a href="https://github.com/${member.github}">${member.github}</a></li>
                </ul>
            </div>`
        } else if (member.getRole() === 'Intern') {
            html += `
            <div class="card" style="width: 18rem; margin: 1rem;">
                <div class="card-header border-bottom-0 bg-primary">
                <h2>${member.name}</h2>
                </div>
                <div class="card-header bg-primary">
                    <h3>Intern</h3>
                </div>
                <ul class="list-group list-group-flush">
                <li class="list-group-item">ID: ${member.id}</li>
                <li class="list-group-item">Email: <a href="mailto:${member.email}">${member.email}</a></li>
                <li class="list-group-item">School: ${member.school}</li>
                </ul>
            </div>`
        }
    })
    return html;
}


            

newTeam();





