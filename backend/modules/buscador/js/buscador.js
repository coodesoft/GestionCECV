const PeticionB="/rbusca"; //parte ruta peticion elementos filtrados

const NoOrdeanado="n";
const Ascendente="a";
const Descendente="d";

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
			vista+='</div><div class="col-xs-1"><input id="C'+Elemento+n+data[item][Cindice]+'" type='+V['Control']+' class="BI" ></div>';	
		}		
		// creamos registro 
		$('#'+Elemento+n).append('<div class="RB col-xs-12" id="'+Elemento+n+'-'+data[item][Cindice]+'"><div class="col-xs-11" id="'+Elemento+n+data[item][Cindice]+'">'+vista+'</div>');
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
			//nos fijamos de no pasarno del límite    		
    		if (ArregloVal.length<$(IdControl).data('CantMaxSelec')){
				// si es "cheked" pintamos en colorcito verde
    			$("#"+Padre).css('background','#dfd');
    			// agregamos el id del registro al arreglo
    			ArregloVal.push(IdRegistro);
    			$(IdControl).data('Arreglo-Val',ArregloVal);
    			//alert(ArregloVal);    		
    		} else {
    			//sino se pueden seleccionar mas, sacamos el "cheked" del control
    			$(this).prop('checked',false);
    		}
  		} else {
			// si no es "cheked" pintamos en colorcito blanco
    		$("#"+Padre).css('background','#fff');  	
    		//eliminamos el elemento del array
    		var ArregloVal=$(IdControl).data('Arreglo-Val');
    		var PEliminar=ArregloVal.indexOf(IdRegistro);
    		ArregloVal.splice(PEliminar,1);
    		$(IdControl).data('Arreglo-Val',ArregloVal);
    		//alert(ArregloVal);
  		}
	});	
}

function MostrarInfoRes(data,n,RegistrosPag,Elemento){
	var mostrando=$('#'+Elemento).data('Desplaza')+RegistrosPag;
	if (mostrando>$('#'+Elemento).data('CantidadT') && $('#'+Elemento).data('CantidadT')!=0){mostrando=$('#'+Elemento).data('CantidadT');}
	$('#InfoResult'+n).html("Resultados: "+mostrando+" de "+data["CantTot"]);
	$('#'+Elemento).data('CantidadT',data["CantTot"]);
}

function ActualizaResultados(Elemento,n,Orden,Termino,Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice){
	//se actualizan la variable de desplazamiento y se procede a pedir datos si hay mas para pedir
	if ($('#'+Elemento).data('Desplaza')+RegistrosPag <= $('#'+Elemento).data('CantidadT')){ 
		$('#'+Elemento).data('Desplaza',$('#'+Elemento).data('Desplaza')+RegistrosPag);
		//se piden los demas datos
		$.get(Rweb+PeticionB,{TB:Termino, O:Orden, D:$('#'+Elemento).data('Desplaza'), C:RegistrosPag, T:Tabla, CB:CampoB},function (data) {		
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
	// se piden los resultados al servidor
	$.get(Rweb+PeticionB,{TB:Termino, O:Orden, D:$('#'+Elemento).data('Desplaza'), C:RegistrosPag, T:Tabla, CB:CampoB},function (data) {		
		data = JSON.parse(data);
		MostrarInfoRes(data,n,RegistrosPag,Elemento,Vista);
		data = data["ResBusca"];			
		CreaVista(data,Elemento,n,CamposM,Vista,Cindice);
	});		
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
	//definimos la cantidad máxima de elementos seleccionables para el control
	$('#'+Elemento).data('CantMaxSelec',Vista['MaxCantEleSele']);
	var Rweb=Config['RWeb'];
	var RegistrosPag=Config['CantR'];
	var Cindice=Config['CampoId'];
	//Se aplican las configuraciones de estilo
	var Alto=Vista['Alto'];
	if (Alto!=''){
		//$('#'+Elemento).css('overflow','scroll');
		//$('#'+Elemento).css('overflow-x','hidden');
		//$('#'+Elemento+n).css('height',Alto);
		$('#'+Elemento).css('height',Alto);
		//alert('#'+Elemento+n);
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
	$('.bEncab'+n).append("<div class='buscalib col-xs-12'>"
		+"<input type='text' id='ebusca"+n+"' class='ebusca' value='Busqueda por título'>"
		+" <input id='BBusca"+n+"' class='btn btn-default btn-xs' type='button' value='Ir'>"
		+" <input id='BOrdD"+n+"' class='btn btn-default btn-xs' type='button' value='&dArr;'>"	
		+" <input id='BOrdA"+n+"' class='btn btn-default btn-xs' type='button' value='&uArr;'>"	
		+"</div>");
	//Definimos la caja donde mostrar la informacion sobre resultado de busqueda
	$('#'+Elemento).append("<div class='binfr'>"
		+"<p id='InfoResult"+n+"'></p>"
		+"</div>");
	//Definimos lacaja donde mostrar los resultados y la caja donde mostrar el "boton mas resultados"
	$('#'+Elemento).append("<div id='"+Elemento+n+"' class='cajares'></div>"
		+"<div class='col-xs-12 bFoot'>"
		+"<input id='BBuscaMas"+n+"' class='btn btn-default btn-xs' type='button' value='Más resultados'></div>");
	//Pedimos todos los datos y armamos la vista
	ValoresDef(Elemento);	
	Busqueda(Elemento,n,NoOrdeanado,"",Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
	
	//Definimos los eventos para los controles de busqueda
	$('#ebusca'+n).on('input',function(){ //cuando se modifica el control de busqueda se cambian los terminos
		$('#'+Elemento).data('Termino',encodeURIComponent($('#ebusca'+n).val()));
	});	

	$('#ebusca'+n).keypress(function(event){  
    	var keycode = (event.keyCode ? event.keyCode : event.which);  
      	if(keycode == '13'){  
          	ValoresDef(Elemento);$('#'+Elemento).data('Orden',NoOrdeanado);		
			Busqueda(Elemento,n,$('#'+Elemento).data('Orden'),$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
		}   
 	});	
	
	$('#BBuscaMas'+n).on('click', function() { // si se apreta el boton de busqueda
		ActualizaResultados(Elemento,n,$('#'+Elemento).data('Orden'),$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
	});
	
	$('#BBusca'+n).on('click', function() { // si se apreta el boton de busqueda
		ValoresDef(Elemento);$('#'+Elemento).data('Orden',NoOrdeanado);		
		Busqueda(Elemento,n,$('#'+Elemento).data('Orden'),$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
	});
	
	$('#BOrdA'+n).on('click', function() { // si se apreta el boton ordenar ascendente
		ValoresDef(Elemento);$('#'+Elemento).data('Orden',Ascendente);
		Busqueda(Elemento,n,$('#'+Elemento).data('Orden'),$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);	
	});
	
	$('#BOrdD'+n).on('click', function() { // si se apreta el boton ordenar descendente
		ValoresDef(Elemento);$('#'+Elemento).data('Orden',Descendente);
		Busqueda(Elemento,n,Descendente,$('#'+Elemento).data('Termino'),Tabla,CampoB,RegistrosPag,Rweb,CamposM,Vista,Cindice);
	});
	
	$('#ebusca'+n).on('click', function() { $('#ebusca'+n).val(''); }); //si se hace click
	
	
}
