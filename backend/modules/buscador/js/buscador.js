
const NoOrdeanado="n";
const Ascendente="a";
const Descendente="d";
const JS_TEMPLATE_PATH = '../../modules/buscador/js/templates/';


function ValoresDef(Elemento){
	$('#'+Elemento).data('Desplaza',0)
	$('#'+Elemento).data('Orden',NoOrdeanado);
	$('#'+Elemento).data('CantidadT',0);
	$('#'+Elemento).data('Arreglo-Val',[]); //arreglo de valores de salida, como los elementos selecionados
}

function CreaVista(data,Elemento,n,CamposM,V,Cindice){
	var clase='';
	for (item=0;item<data.length;item++){
		if (data[item]["CantidadDisponible"]!=0) {clase="NoCero";} else {clase="NCero";}
		var vista='';

		for (c=0;c<CamposM.length;c++) {
			vista+='<div><b>'+CamposM[c][1]+': </b>'+data[item][CamposM[c][0]];
			vista+='</div>';
		}

		if (V['Control']!=''){
			//creamos el control
			vista+='</div><div class="col-xs-1"><input id="C'+Elemento+n+data[item][Cindice]+'" type='+V['Control']+' class="BI Control'+Elemento+'" ></div>';
		}
		// creamos registro
		$('#'+Elemento+n).append('<div class="RB col-xs-12" id="'+Elemento+n+'-'+data[item][Cindice]+'"><div class="Registro'+Elemento+' item-prestamo col-xs-12" id="'+Elemento+n+data[item][Cindice]+'">'+vista+'</div>');
		//pintamos el registro de acuerdo a la condición
		if (V['Resaltar']['campo']!=''){
			if (V['Resaltar']['condicion']=='='){
				if (data[item][V['Resaltar']['campo']]==V['Resaltar']['valor']){
					//cambiamos el color de fondo
					$("#"+Elemento+n+data[item][Cindice]).css('background',V['Resaltar']['cfondo']);
					$("#"+Elemento+n+data[item][Cindice]).attr('data-c',V['Resaltar']['cfondo']);
					//agregamos el mensaje
					$("#"+Elemento+n+data[item][Cindice]).append('<div>'+V['Resaltar']['mensaje']+'</div>');
				}
			}
		}
		//asociamos evento y comportamiento
		CompartamientoControl('C'+Elemento+n+data[item][Cindice]);
		$('#C'+Elemento+n+data[item][Cindice]).data('data-padre',Elemento+n+data[item][Cindice]);
		$('#C'+Elemento+n+data[item][Cindice]).data('idRegistro',data[item][Cindice]);
		$('#C'+Elemento+n+data[item][Cindice]).data('Control',Elemento);
	}
}
// el objetivo de esa funcion es definir los eventos del control asociados al registro
// y los comportamientos de los mismos
//esta función solo deb ser llamada de la función que arma la vista
function CompartamientoControl(id){
	$('#'+id).unbind();//eliminamos todos los eventos que pudieran estar asociados

	$('#'+id).bind('change',function() {//agregamos eventos para los checkbox
		var Padre=$(this).data('data-padre');
		var IdRegistro=$(this).data('idRegistro');
		var IdControl='#'+$(this).data('Control');
    	if ( $(this).is(':checked') ) {
    		var ArregloVal=$(IdControl).data('Arreglo-Val');
			//nos fijamos de no pasarnos del límite
    		if (ArregloVal.length<$(IdControl).data('CantMaxSelec')){
				// si es "cheked" pintamos en colorcito verde
    			$("#"+Padre).css('background','#dfd');
    			// agregamos el id del registro al arreglo
    			ArregloVal.push(IdRegistro);
    			$(IdControl).data('Arreglo-Val',ArregloVal);
    			//llamamos a la función asociada al presionar el boton
    			var funcion=$(IdControl).data('Fcontrol');
    			if(funcion!=''){funcion($(IdControl));}
    		} else {
    			//Si la cantidad máxima a seleccionar es "1" entonces no quitamos el checked y
    			//destildamos el tildado anteriormente
    			if ($(IdControl).data('CantMaxSelec')==1){
    				// agregamos el id del registro al arreglo
    				ArregloVal=[];
    				ArregloVal.push(IdRegistro);
    				$(IdControl).data('Arreglo-Val',ArregloVal);
    				//llamamos a la función asociada al presionar el boton
    				var funcion=$(IdControl).data('Fcontrol');
    				if(funcion!=''){funcion($(IdControl));}
    				//destiladmos los anteriores
    				$('.Control'+$(this).data('Control')).prop('checked',false);
    				$('.Registro'+$(this).data('Control')).css('background','#fff');
    				//pintamos en colorcito verde
    				$("#"+Padre).css('background','#dfd');
    				//tildamos este
    				$(this).prop('checked',true);
    			} else {
    				//sino se pueden seleccionar mas, sacamos el "cheked" del control
    				$(this).prop('checked',false);
    			}
    		}
  		} else {
			// si no es "cheked" pintamos en colorcito blanco o el de resaltado
			$("#"+Padre).css('background','#fff');
			if ($("#"+Padre).attr('data-c')!=""){$("#"+Padre).css('background',$("#"+Padre).attr('data-c'));}

    		//eliminamos el elemento del array
    		var ArregloVal=$(IdControl).data('Arreglo-Val');
    		var PEliminar=ArregloVal.indexOf(IdRegistro);
    		ArregloVal.splice(PEliminar,1);
    		$(IdControl).data('Arreglo-Val',ArregloVal);
    		//llamamos a la función asociada para reiniciar la pantalla de información
    		var funcion=$(IdControl).data('FcontrolD');
    		if(funcion!=''){funcion();}
  		}
	});
}

function MostrarInfoRes(data,n,RegistrosPag,Elemento){
	var mostrando=$('#'+Elemento).data('Desplaza')+RegistrosPag;
	if (mostrando<$('#'+Elemento).data('CantidadT')){mostrando=$('#'+Elemento).data('CantidadT');}
	$('#InfoResult'+n).html("Resultados: "+mostrando+" de "+data["CantTot"]);
	$('#'+Elemento).data('CantidadT',data["CantTot"]);
}

function ActualizaResultados(Elemento,n,Orden,Termino,Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice){
	//se actualizan la variable de desplazamiento y se procede a pedir datos si hay mas para pedir
	if ($('#'+Elemento).data('Desplaza')+RegistrosPag <= $('#'+Elemento).data('CantidadT')){
		$('#'+Elemento).data('Desplaza',$('#'+Elemento).data('Desplaza')+RegistrosPag);
		// "cargamos" el array de condiciones
		var Condiciones=JSON.stringify($('#'+Elemento).data('Condiciones'));
		//se piden los demas datos
		$.get(Rweb+$('#'+Elemento).data('Action'),{CO:Condiciones, TB:Termino, O:Orden, D:$('#'+Elemento).data('Desplaza'), C:RegistrosPag, T:Tabla, CB:CampoB},function (data) {
			data = JSON.parse(data);
			MostrarInfoRes(data,n,RegistrosPag,Elemento);
			data = data["ResBusca"];
			CreaVista(data,Elemento,n,CamposM,Vista,Cindice);
		});
	}
}

function Busqueda(Elemento,n,Orden,Termino,Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice){
	//se vacia el html de la caja que muestra los resultados
	$('#'+Elemento+n).html("");
	// "cargamos" el array de condiciones
	var Condiciones=JSON.stringify($('#'+Elemento).data('Condiciones'));
	// se piden los resultados al servidor
	console.log(Rweb);
	console.log(Rweb+$('#'+Elemento).data('Action'));
	$.get(Rweb+$('#'+Elemento).data('Action'),{CO:Condiciones, TB:Termino, O:Orden, D:$('#'+Elemento).data('Desplaza'), C:RegistrosPag, T:Tabla, CB:CampoB},function (data) {
		data = JSON.parse(data);
		MostrarInfoRes(data,n,RegistrosPag,Elemento,Vista);
		data = data["ResBusca"];
		CreaVista(data,Elemento,n,CamposM,Vista,Cindice);
	});
}

function crearFiltroBusquedaHTML(contenedor, parametros, callback){

	$.ajax({
		url: JS_TEMPLATE_PATH +'filtro_buscador.html',
		success: function(template){
			var result = Mustache.render(template, parametros);
			$(contenedor).append(result);
			 callback();
		},
		error: function(){
			alert('Se produjo un error al cargar la template del filtro de busqueda');
		}
	})
}

function AsignarEventos(n,Elemento,Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice){
		//Definimos los eventos para los controles de busqueda
	$('#ebusca'+n).on('input',function(){ //cuando se modifica el control de busqueda se cambian los terminos
		$('#'+Elemento).data('Termino',encodeURIComponent($('#ebusca'+n).val()));

	});

	$('#ebusca'+n).keypress(function(event){  //si se apreta la tecla enter
    	var keycode = (event.keyCode ? event.keyCode : event.which);
      if(keycode == '13'){
        	ValoresDef(Elemento);$('#'+Elemento).data('Orden',NoOrdeanado);
        	$('#'+Elemento).data('Termino',encodeURIComponent($('#ebusca'+n).val()));
			Busqueda(Elemento,n,$('#'+Elemento).data('Orden'),$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
		}
 	});

	$('#BBuscaMas'+n).on('click', function() { // si se apreta el boton de busqueda
		ActualizaResultados(Elemento,n,$('#'+Elemento).data('Orden'),$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
	});

	$('#BBusca'+n).on('click', function() { // si se apreta el boton de busqueda
		ValoresDef(Elemento);$('#'+Elemento).data('Orden',NoOrdeanado);
		$('#'+Elemento).data('Termino',encodeURIComponent($('#ebusca'+n).val()));
		Busqueda(Elemento,n,$('#'+Elemento).data('Orden'),$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
	});

	$('#BOrdA'+n).on('click', function() { // si se apreta el boton ordenar ascendente
		ValoresDef(Elemento);$('#'+Elemento).data('Orden',Ascendente);
		$('#'+Elemento).data('Termino',encodeURIComponent($('#ebusca'+n).val()));
		//console.log($('#'+Elemento).data('Termino'));
		Busqueda(Elemento,n,$('#'+Elemento).data('Orden'),$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
	});

	$('#BOrdD'+n).on('click', function() { // si se apreta el boton ordenar descendente
		ValoresDef(Elemento);$('#'+Elemento).data('Orden',Descendente);
		$('#'+Elemento).data('Termino',encodeURIComponent($('#ebusca'+n).val()));
		//console.log(encodeURIComponent($('#ebusca'+n).val()));
		Busqueda(Elemento,n,Descendente,$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
	});

	$('#ebusca'+n).on('click', function() { $('#ebusca'+n).val(''); }); //si se hace click
}


//n es el numero de buscador
//camposM es el arreglo que se usa para definir los campos que se mostraran en la vista
function InicializarBuscador(Config,CamposM,Vista){
	//Id elemento bus
	var EB='#'+Elemento;
	//Abrimos la configuracion
	var Elemento=Config['id'];
	var n=Config['n'];
	var Titulo=Config['Tit'];
	var Tabla=Config['Tabla'];
	var CampoB=Config['CampoB'];
	//definimos la funcion que se ejecutara al hacer click en el check box
	$('#'+Elemento).data('Fcontrol',Config['FuncionControl']);
	$('#'+Elemento).data('FcontrolD',Config['FuncionControlD']);
	//definimos el action para hacer la petición que nos devolverá resultados
	$('#'+Elemento).data('Action',Config['Action']);
	//cargamos el arreglo de filtros, por ahora solo vale el primer elemento del array
	$('#'+Elemento).data('Condiciones',Config['Condiciones']);
	//definimos la cantidad máxima de elementos seleccionables para el control
	$('#'+Elemento).data('CantMaxSelec',Vista['MaxCantEleSele']);
	var Rweb=Config['RWeb'];
	var RegistrosPag=Config['CantR'];
	var Cindice=Config['CampoId'];

	var parametros = {
			'n': n,
			'vista': Vista['TextoDef'],
	}

	//Se aplican las configuraciones de estilo
	var Alto=Vista['Alto'];
	if (Alto!=''){
		$('#'+Elemento).css('height',Alto);
		$('#'+Elemento).css('padding','2px');
	}
	//Definimos los datos basicos de cada buscador
	$('#'+Elemento).data('Desplaza',0);        //Se usa para seguir trayendo registros a la vista
	$('#'+Elemento).data('Orden',NoOrdeanado); //Almacena el ordenamiento que hay ahora
	$('#'+Elemento).data('CantidadT',0);       //almacena la cantidad de registros totales
	$('#'+Elemento).data('Termino','');        //almacena el termino de busqueda
	//Armamos el encabezado del buscador
	$('#'+Elemento).html("<div class='bEncab"+n+" bEncab col-xs-12'><div class='Btit col-xs-12'>"+Titulo+"</div></div>");
	//agregamos el control de buscqueda del encabezado

	crearFiltroBusquedaHTML('.bEncab'+n, parametros,function(){AsignarEventos(n,Elemento,Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice)});

	//Definimos la caja donde mostrar la informacion sobre resultado de busqueda
	$('#'+Elemento).append("<div class='binfr'><p id='InfoResult"+n+"'></p></div>");

	//Definimos lacaja donde mostrar los resultados y la caja donde mostrar el "boton mas resultados"
	$('#'+Elemento).append("<div id='"+Elemento+n+"' class='cajares'></div>"
		+"<div class='col-xs-12 bFoot'>"
		+"<input id='BBuscaMas"+n+"' class='btn btn-success btn-xs' type='button' value='Más resultados'></div>");
	//Pedimos todos los datos y armamos la vista
	ValoresDef(Elemento);
	Busqueda(Elemento,n,NoOrdeanado,"",Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
}
