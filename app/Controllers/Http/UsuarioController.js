'use strict'
const Usuario=use('App/Models/User');
const Empresa=use('App/Models/Empresa');
const Database = use('Database');
class UsuarioController {

    async guardarpersona({request,response})
    {
        // console.log('1');
        const usuario = new Usuario()
        if ( request.input('idempresa') != 'null'){
            // console.log('2');
        usuario.nombre = request.input('nombre');
        usuario.apellidop = request.input('apellidop');
        usuario.apellidom = request.input('apellidom');
        usuario.tipo = request.input('tipo');
        usuario.username = request.input('username');
        usuario.email = request.input('email');
        usuario.password = request.input('password');
        usuario.idempresa = request.input('idempresa');
        usuario.visible = '1';
        await usuario.save();
        }
        else{
            // console.log('3');
            usuario.nombre = request.input('nombre');
            usuario.apellidop = request.input('apellidop');
            usuario.apellidom = request.input('apellidom');
            usuario.tipo = request.input('tipo');
            usuario.username = request.input('username');
            usuario.email = request.input('email');
            usuario.password = request.input('password');
            usuario.visible = '1';
            await usuario.save();
        }

        return await response.status(200).json(usuario);
    }

    async editarpersona({params,request,response})
    {
        const unavar = null;
        const usuario=await Usuario.find(params.id);
        if ( request.input('idempresa') != 'null'){
        usuario.nombre = request.input('nombre');
        usuario.apellidop = request.input('apellidop');
        usuario.apellidom = request.input('apellidom');
        usuario.tipo = request.input('tipo');
        usuario.username = request.input('username');
        usuario.email = request.input('email');
        usuario.password = request.input('password');
        usuario.idempresa = request.input('idempresa');
        usuario.visible = '1';
        await usuario.save();
    }
    else{
        // console.log('3');
        usuario.nombre = request.input('nombre');
        usuario.apellidop = request.input('apellidop');
        usuario.apellidom = request.input('apellidom');
        usuario.tipo = request.input('tipo');
        usuario.username = request.input('username');
        usuario.email = request.input('email');
        usuario.password = request.input('password');
        usuario.idempresa = unavar;
        usuario.visible = '1';
        await usuario.save();
    }

        return await response.status(200).json(usuario);
    }

    async verusuariopersona({request,response})
    {
       return await Database
       .select('users.id as userid','users.nombre as nombre',
       'users.apellidop as apellidop', 'users.apellidom as apellidom',
       'users.tipo as tipo', 'users.username as username',
       'users.email as email','users.password as password',
       'empresas.nombre as nombreempresa',
       'users.visible as visible'
       )
       .from('users')
       .innerJoin('empresas', function () {
        this
          .on('users.idempresa', 'empresas.id')
      }) 
       .where( 'users.visible', 1);
    }

    async verusuariopersonasinempresa({request,response})
    {
       return await Database
       .select('users.id as userid','users.nombre as nombre',
       'users.apellidop as apellidop', 'users.apellidom as apellidom',
       'users.tipo as tipo', 'users.username as username',
       'users.email as email','users.password as password',
       'users.visible as visible'
       )
       .from('users')
       .where( 'users.visible', 1)
       .whereNull( 'users.idempresa');
    }


    async verusuariopersonauno({params,request,response})
    {
        const usuario=await Usuario.find(params.id);

        return response.status(200).json(usuario);
    }

    async miusuarioespecial({request,response})
    { 
      var email=request.input('email')
      return await Usuario.findBy('email',email);
  }


    async eliminarusuario({params,request,response})
    {
        const usuario=await Usuario.find(params.id);
        usuario.visible = '2';
        await usuario.save();
        return response.status(200).json(usuario);
    }


    async guardarempresa({request,response})
    {
        const empresa = new Empresa()

        empresa.nombre = request.input('nombre');
        empresa.giro = request.input('giro');
        empresa.visible = '1';

        await empresa.save();

        return await response.status(200).json(empresa);
    }


    async editarempresa({params,request,response})
    {
        const empresa=await Empresa.find(params.id);
        
        empresa.nombre = request.input('nombre');
        empresa.giro = request.input('giro');
        empresa.visible = '1';

        await empresa.save();

        return await response.status(200).json(empresa);
    }

    async verempresa({request,response})
    {
       return await Database
       .select('empresas.id as id','empresas.nombre as nombre',
       'empresas.giro as giro',
       'empresas.visible as visible' )
       .from('empresas')
       .where( 'empresas.visible', 1);
    }

    async verempresauno({params,request,response})
    {
        const empresa=await Empresa.find(params.id);

        return response.status(200).json(empresa);
    }

    async eliminarempresa({params,request,response})
    {
        const empresa=await Empresa.find(params.id);
        empresa.visible = '2';
        await empresa.save();
        return response.status(200).json(empresa);
    }


}

module.exports = UsuarioController
