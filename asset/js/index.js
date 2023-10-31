let _green = document.getElementsByClassName('green')[0]
    let _white = document.getElementsByClassName('white')[0]
    let _signin = document.getElementsByClassName('signin')[0]
    let _signup = document.getElementsByClassName('signup')[0]
    let _first = document.getElementsByClassName('first')[0]
    let _second = document.getElementsByClassName('second')[0]
    let _email = document.getElementById('email')
    let _pass1 = document.getElementById('pass1')
    let _pass2 = document.getElementById('pass2')
    let _user1 = document.getElementById('user1')
    let _user2 = document.getElementById('user2')
    let alert1 = document.getElementById('alert1')
    let alert2 = document.getElementById('alert2')
    document.getElementById('tosignup').addEventListener('click', (e) => {
        _green.style.borderRadius = `20px 0 0 20px`
        _green.style.transform = `translateX(-420px)`
        _white.style.transform = `translateX(280px)`
        _signin.style.display = 'none'
        _signup.style.display = 'flex'
        _first.style.display = 'none'
        _second.style.display = 'flex'
    })
    document.getElementById('tosignin').addEventListener('click', (e) => {
        _green.style.borderRadius = `0 20px 20px 0`
        _green.style.transform = `translateX(0px)`
        _white.style.transform = `translateX(0px)`
        _signin.style.display = 'flex'
        _signup.style.display = 'none'
        _first.style.display = 'flex'
        _second.style.display = 'none'
    })
    let pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    let user = /^[a-z0-9_-]{3,15}$/
    let email = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    function move1() {
        alert2.innerHTML = ''
        if ((pass.test(_pass2.value) == '') || (email.test(_email.value) == '') || user.test(_user2.value)) {
            alert2.innerHTML = `Password must be at least 8 characters long and contain a mix of uppercase letters, lower or email must be right`
            alert2.style.color = 'red'
        } else {
            const newTask = {
                email: _email.value,
                username: _user2.value,
                password: _pass2.value,
            };
            fetch('https://653fcf0845bedb25bfc14550.mockapi.io/rezamr8/users', {
                method: 'POST',
                headers: { 'content-type': 'application/json' },
                // Send your data in the request body as JSON
                body: JSON.stringify(newTask)
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
                // handle error
            }).then(task => {
                // do something with the new task
                alert2.innerHTML = "user added"
                alert2.style.color = "green"
            }).catch(error => {
                // handle error
            })
        }
    }
    function move() {
        alert1.innerHTML = ''
        document.getElementById('confirm').style.display ='none'
        if ((pass.test(_pass1.value) == '') && (user.test(_user1.value) == '')) {
            alert1.innerHTML = 'the user and password is not correct'
            alert1.style.color = 'red'
        } else {
            fetch('https://653fcf0845bedb25bfc14550.mockapi.io/rezamr8/users', {
                method: 'GET',
                headers: { 'content-type': 'application/json' },
            }).then(res => {
                if (res.ok) {
                    return res.json();
                }
            }).then(tasks => {


                for(i=0 ; i <= tasks.length;i++){
                    if((tasks[i].username == user1.value) && (tasks[i].password == pass1.value) ){

                        document.getElementById('confirm').style.display='flex'
                        document.getElementById('confirm').innerHTML =`
                        <h2>
                            Id :   ${tasks[i].id} <br>
                            Username : ${tasks[i].username} <br>
                            Email :${tasks[i].email} <br>   
                            
                        </h2>
                        `
                        break;
                    }else{
                        alert1.innerHTML='user not found'
                        alert1.style.color = 'red'
                    }
                }
            }).catch(error => {})
        }
    }