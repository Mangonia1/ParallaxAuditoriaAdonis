'use strict'
const Cuestionario=use('App/Models/Cuestionario');
const Usuario=use('App/Models/User');
const Empresa=use('App/Models/Empresa');
const Pregunta=use('App/Models/Pregunta');
const Respuesta=use('App/Models/Respuesta');
const Database = use('Database');
class CuestionarioController {

    // ============CUESTIONARIO=========================
    async guardarcuestionario({request,response})
    {
        const quis = new Cuestionario()
        quis.nombrecuestionario = request.input('nombrecuestionario');
        quis.idcreador = request.input('idcreador');
        quis.usernameauditor = request.input('usernameauditor');
        quis.empresa = request.input('empresa');
        quis.departamento = request.input('departamento');
        quis.terminado = '1';
        quis.terminareditarcuestionario = '1';
        quis.visible = '1';
        await quis.save();
        return await response.status(200).json(quis);
    }

    async editarcuestionario({params,request,response})
    {
        const quis=await Cuestionario.find(params.id);
        quis.nombrecuestionario = request.input('nombrecuestionario');
        quis.idcreador = request.input('idcreador');
        quis.usernameauditor = request.input('usernameauditor');
        quis.empresa = request.input('empresa');
        quis.departamento = request.input('departamento');
        // quis.terminado = '1';
        // quis.terminareditarcuestionario = '1';
        // quis.visible = '1';
        await quis.save();
        return await response.status(200).json(quis);
    }

    async terminareditarcuestionario({params,request,response})
    {
        const quis=await Cuestionario.find(params.id);
        quis.terminareditarcuestionario = '2';
        await quis.save();
        return await response.status(200).json(quis);
    }

    async terminarcuestionario({params,request,response})
    {
        const quis=await Cuestionario.find(params.id);
        quis.terminado = '2';
        await quis.save();
        return await response.status(200).json(quis);
    }



    async eliminarcuestionario({params,request,response})
    {
        const quis=await Cuestionario.find(params.id);
        quis.visible = '2';
        await quis.save();

        const borrarpreguntas = await Database
        .table('preguntas')
        .where('idcuestionario',params.id)
        .update('visible', '2');
        


        return response.status(200).json(quis);
    }

    async vercuestionario({request,response})
    {

        var id= await request.input('myid');
        var  usuario= await request.input('username');
        const usi=await Usuario.find(id);

        const empr = await Empresa.find(usi.idempresa);

        // console.log('awantaaaaaaaaa '+usi.tipo);
        if(usi.tipo == 'Empresa')
        {
            return await Database
            .select('cuestionarios.id as id','cuestionarios.nombrecuestionario as nombrecuestionario',
            'cuestionarios.idcreador as idcreador' , 'users.username as creador',
            'cuestionarios.usernameauditor as usernameauditor',
            'cuestionarios.empresa as empresa', 'cuestionarios.departamento as departamento',
            'cuestionarios.terminado as terminado',
            'cuestionarios.terminareditarcuestionario as terminareditarcuestionario'
            )
            .from('cuestionarios')
            .innerJoin('users', function () {
             this
               .on('cuestionarios.idcreador', 'users.id')
           }) 
           .where( 'cuestionarios.visible', 1)
           .where( {'cuestionarios.empresa':empr.nombre}, {'cuestionarios.usernameauditor':usuario} )
           .orWhere({'cuestionarios.usernameauditor':usuario},{'cuestionarios.empresa':empr.nombre})
           .where( 'cuestionarios.visible', 1);
        }
        if(usi.tipo == 'Auditor'){
            return await Database
       .select('cuestionarios.id as id','cuestionarios.nombrecuestionario as nombrecuestionario',
       'cuestionarios.idcreador as idcreador' , 'users.username as creador',
       'cuestionarios.usernameauditor as usernameauditor',
       'cuestionarios.empresa as empresa', 'cuestionarios.departamento as departamento',
       'cuestionarios.terminado as terminado',
       'cuestionarios.terminareditarcuestionario as terminareditarcuestionario'
       )
       .from('cuestionarios')
       .innerJoin('users', function () {
        this
          .on('cuestionarios.idcreador', 'users.id')
      }) 
      .where( 'cuestionarios.visible', 1)
      .where( {'cuestionarios.usernameauditor':usuario} )
      .where( 'cuestionarios.visible', 1);
        }


       
    }

    async vercuestionarioparaadministrador({request,response})
    {
       return await Database
       .select('cuestionarios.id as id','cuestionarios.nombrecuestionario as nombrecuestionario',
       'cuestionarios.idcreador as idcreador' , 'users.username as creador',
       'cuestionarios.usernameauditor as usernameauditor',
       'cuestionarios.empresa as empresa', 'cuestionarios.departamento as departamento',
       'cuestionarios.terminado as terminado',
       'cuestionarios.terminareditarcuestionario as terminareditarcuestionario'
       )
       .from('cuestionarios')
       .innerJoin('users', function () {
        this
          .on('cuestionarios.idcreador', 'users.id')
      }) 
      .where( 'cuestionarios.visible', 1);
    }


    async vercuestionariouno({params,request,response})
    {
        const cuestionario=await Cuestionario.find(params.id);

        return response.status(200).json(cuestionario);
    }


// ======================CUESTIONARIO================================

//======================PREGUNTA============================================
async guardarpregunta({request,response})
    {
        const preg = new Pregunta()
        preg.idcuestionario = request.input('idcuestionario');
        preg.preguntatxt = request.input('preguntatxt');
        preg.tiporespuesta = request.input('tiporespuesta');
        preg.respondido = 'no';
        preg.visible = '1';
        await preg.save();
        return await response.status(200).json(preg);
    }

    async editarpregunta({params,request,response})
    {
        const preg=await Pregunta.find(params.id);
        preg.idcuestionario = request.input('idcuestionario');
        preg.preguntatxt = request.input('preguntatxt');
        preg.tiporespuesta = request.input('tiporespuesta');
        preg.respondido = 'no';
        preg.visible = '1';
        await preg.save();
        return await response.status(200).json(preg);
    }

    async eliminarpregunta({params,request,response})
    {
        const preg=await Pregunta.find(params.id);
        preg.visible = '2';
        await preg.save();
        return response.status(200).json(preg);
    }



    async responderpregunta({params,request,response})
    {
        const preg=await Pregunta.find(params.id);
        preg.respuesta = request.input('respuesta');
        //preg.calificar = 'sincalif';
        preg.respondido = 'si';
        preg.visible = '1';
        await preg.save();
        return await response.status(200).json(preg);
    }

    // async calificarpregunta({params,request,response})
    // {
    //     const preg=await Pregunta.find(params.id);
    //     preg.calificar = request.input('calificar');
    //     preg.respondido = 'si';
    //     preg.visible = '1';
    //     await preg.save();
    //     return await response.status(200).json(preg);
    // }

    async verpreguntauno({params,request,response})
    {
        const pregunta=await Pregunta.find(params.id);

        return response.status(200).json(pregunta);
    }

    async verpreguntavisible({params,request,response})
    {
       return await Database
       .select('preguntas.id as id',
       'preguntas.idcuestionario as idcuestionario',
        'preguntas.preguntatxt as preguntatxt',
        'preguntas.tiporespuesta as tiporespuesta',
        'preguntas.respuesta as respuesta',
        'preguntas.respondido as respondido'
       )
       .from('preguntas')
       .where('preguntas.visible', 1)
       .where('preguntas.idcuestionario', params.id);
    }

    async verpreguntanorespondida({params,request,response})
    {
       return await Database
       .select('preguntas.id as id',
       'preguntas.idcuestionario as idcuestionario',
        'preguntas.preguntatxt as preguntatxt',
        'preguntas.respuesta as respuesta',
        'preguntas.respondido as respondido',
        
        'preguntas.tiporespuesta as tiporespuesta'
       )
       .from('preguntas')
       .where({'preguntas.visible': 1})
       .where({'preguntas.respondido': 'no'})
       .where('preguntas.idcuestionario', params.id);
    }


    async vercuestionarioresultado({params,request,response})
    {

        var id= await request.input('myid');
        var  usuario= await request.input('username');
        const usi=await Usuario.find(id);

        const empr = await Empresa.find(usi.idempresa);
        const micuestion = await Cuestionario.find(params.id);

        // console.log('awantaaaaaaaaa '+usi.tipo);
        if(usi.tipo == 'Administrador'){
        console.log('soy admin');
        return await Database
       .select('preguntas.id as id',
       'preguntas.idcuestionario as idcuestionario',
        'preguntas.preguntatxt as preguntatxt',
        'preguntas.respuesta as respuesta',
        'preguntas.respondido as respondido',
        
        'preguntas.tiporespuesta as tiporespuesta'
       )
       .from('preguntas')
       .where({'preguntas.visible': 1})
       .where({'preguntas.respondido': 'si'})
       .where('preguntas.idcuestionario', params.id);
        }
        if(usi.tipo == 'Empresa')
        {console.log('soy empresa');
        console.log('mi cuestionario '+micuestion.empresa+' empresa del usuario '+empr.nombre);
        if(micuestion.empresa == empr.nombre){console.log('oli :3');
        return await Database
        .select('preguntas.id as id',
        'preguntas.idcuestionario as idcuestionario',
         'preguntas.preguntatxt as preguntatxt',
         'preguntas.respuesta as respuesta',
         'preguntas.respondido as respondido',
         
         'preguntas.tiporespuesta as tiporespuesta'
        )
        .from('preguntas')
        .where({'preguntas.visible': 1})
        .where({'preguntas.respondido': 'si'})
        .where('preguntas.idcuestionario', params.id);
        }
    }
        if(usi.tipo == 'Auditor'){console.log('soy auditor');
        return await Database
        .select('preguntas.id as id',
        'preguntas.idcuestionario as idcuestionario',
         'preguntas.preguntatxt as preguntatxt',
         'preguntas.respuesta as respuesta',
         'preguntas.respondido as respondido',
         
         'preguntas.tiporespuesta as tiporespuesta'
        )
        .from('preguntas')
        .where({'preguntas.visible': 1})
        .where({'preguntas.respondido': 'si'})
        .where('preguntas.idcuestionario', params.id);
        
    
    
    }


       
    }


    // async verpreguntanocalificada({params,request,response})
    // {
    //    return await Database
    //    .select('preguntas.id as id',
    //    'preguntas.idcuestionario as idcuestionario',
    //     'preguntas.preguntatxt as preguntatxt',
    //     'preguntas.respuesta as respuesta',
    //     'preguntas.respondido as respondido',
    //     'preguntas.calificar as calificar'
    //    )
    //    .from('preguntas')
    //    .where({'preguntas.visible': 1})
    //    .where({'preguntas.calificar': 'sincalif'})
    //    .where('preguntas.idcuestionario', params.id);
    // }


// =====================PREGUNTA==========================================

//======================RESPUESTA============================================
async guardarrespuesta({request,response})
    {
        const res = new Respuesta()
        res.idpregunta = request.input('idpregunta');
        res.respuestatxt = request.input('respuestatxt');
        await res.save();
        return await response.status(200).json(res);
    }

    async editarrespuesta({params,request,response})
    {
        const res=await Respuesta.find(params.id);
        res.idpregunta = request.input('idpregunta');
        res.respuestatxt = request.input('respuestatxt');
        await res.save();
        return await response.status(200).json(res);
    }

    async verrespuesta({request,response})
    {
       return await Database
       .select('respuestas.id as id',
       'respuestas.idpregunta as idpregunta',
       'respuestas.respuestatxt as respuestatxt'
       )
       .from('respuestas');
    }
//======================RESPUESTA============================================

}

module.exports = CuestionarioController
