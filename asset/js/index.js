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
    const x = window.matchMedia('(max-width:768px)')
    document.getElementById('tosignup').addEventListener('click', (e) => {
        if(x.matches){
            _green.classList.add('rounded-t-[20px]','translate-y-[-360px]')
            _green.classList.remove('rounded-b-[20px]')
            _white.classList.add('translate-y-[250px]')
            _signin.classList.add('hidden')
            _signin.classList.remove('flex')
            _signup.classList.add('flex')
            _signup.classList.remove('hidden')
            _first.classList.add('hidden')
            _first.classList.remove('flex')
            _second.classList.add('flex')
            _second.classList.remove('hidden')
        }else{
            _green.classList.remove('translate-y-[-360px]','md:rounded-r-[20px]')
            _green.classList.add('md:rounded-l-[20px]','md:translate-x-[-420px]')
            _white.classList.add('md:translate-x-[280px]')
            _white.classList.remove('translate-y-[250px]')
            _signin.classList.add('hidden')
            _signin.classList.remove('flex')
            _signup.classList.add('flex')
            _signup.classList.remove('hidden')
            _first.classList.add('hidden')
            _first.classList.remove('flex')
            _second.classList.add('flex')
            _second.classList.remove('hidden')
        }
    })
    document.getElementById('tosignin').addEventListener('click', (e) => {
        if(x.matches){
            _green.classList.remove('rounded-t-[20px]','translate-y-[-360px]')
            _green.classList.add('rounded-b-[20px]')
            _white.classList.remove('translate-y-[250px]')
            _signin.classList.remove('hidden')
            _signin.classList.add('flex')
            _signup.classList.remove('flex')
            _signup.classList.add('hidden')
            _first.classList.remove('hidden')
            _first.classList.add('flex')
            _second.classList.remove('flex')
            _second.classList.add('hidden')
        }else{
            _green.classList.add('md:rounded-r-[20px]')
            _green.classList.remove('md:rounded-l-[20px]','md:translate-x-[-420px]','translate-y-[-360px]')
            _white.classList.remove('md:translate-x-[280px]','translate-y-[250px]')
            _signin.classList.remove('hidden')
            _signin.classList.add('flex')
            _signup.classList.remove('flex')
            _signup.classList.add('hidden')
            _first.classList.remove('hidden')
            _first.classList.add('flex')
            _second.classList.remove('flex')
            _second.classList.add('hidden')
        }

    })
    let pass = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/
    let email = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/
    function move1() {
        alert2.innerHTML = ''
        if ((pass.test(_pass2.value) == '') || (email.test(_email.value) == '')) {
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
        document.getElementById('confirm').classList.add('hidden')
        document.getElementById('confirm').classList.remove('flex')
        if ((pass.test(_pass1.value) == '')) {
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

                for(i=0 ; i < tasks.length;i++){
                    if((tasks[i].username == user1.value) && (tasks[i].password == pass1.value) ){
                        document.getElementById('confirm').classList.add('flex')
                        document.getElementById('confirm').classList.remove('hidden')
                        document.getElementById('confirm').innerHTML =`
                        <h2 class="md:text-[30px] text-white">
                            Id :   ${tasks[i].id} <br>
                            Username : ${tasks[i].username} <br>
                            Email :${tasks[i].email} <br>   
                            
                        </h2>
                        `
                        alert1.innerHTML=''
                    }else{
                        alert1.innerHTML='user not found'
                        alert1.style.color = 'red'
                    }
                    
                }
            }).catch(error => {})
        }
    }
    let flag = 0
    function show(e){
        console.log(e);
        if(
            flag == 0
        ){
            _pass1.setAttribute('type','text')
            document.getElementById('btn').innerHTML = '🔒'
            flag++
        }else{
            _pass1.setAttribute('type','password')
            document.getElementById('btn').innerHTML = '👁‍🗨'
            flag--
        }
    }
