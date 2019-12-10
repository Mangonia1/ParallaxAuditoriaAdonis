'use strict'
const User=use('App/Models/User');
var Hash=use('Hash');

class LoginController {

    async login ({request,auth, response}){
        var email=request.input('email')
        var password=request.input('password')
        const u = await User.findBy('email', email);

        if (u != undefined){
            const check=await Hash.verify(password,u.password)
            if(check){
                return await auth.withRefreshToken().attempt(email, password);  
            }
            else{
                return response.status(403).json('contraseña incorrecta');
            }
        }
        else{
            return response.status(400).json('no se encontro el usuario');
        }

    }

    async veraftertoken({request,response})
    {
        var email=request.input('email')
        return User.query().where('email',email).orderBy('id').fetch();  
    }

}

module.exports = LoginController
