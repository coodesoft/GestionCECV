const MensSeleccionar="Tiene que seleccionar al menos un estudiante";
const MensEliExit="Estudiante eliminado correctamente";
const MensSusExit="Estudiante suspendido";
const MensEstAgre="Registro exitoso";
const ColorAlerta='#fdd';
const ColorExit='#dfd';

const PetExitosa=1;

const IdSelEstud='InfoEstudiantes';
var r;

const PeticionEli='/eliestu';
const PeticionSus='/suspend';
const PeticionInf='/infoest';
const PeticionNus='/nuevoest';
const PeticionEdi='/editarest';

const CreaUser="1";
const ModiUser="2";

$(document).ready(function(){
	//eventos y funciones del formulario
	function InicForm(){
		$('#NombreyApellido').val("");
		$('#DNI').val("");
		$('#Email').val("");
		$('#Telefono').val("");
	}	
	
	function CreaNuevo() {
		$.post(r+PeticionInf,{id:ID},function (data) {
			data = JSON.parse(data);
			$('#NombreyApellido').val(data['NombreyApellido']);
			$('#DNI').val(data['DNI']);
			$('#Email').val(data['Email']);
			$('#Telefono').val(data['Telefono']);
		});
	}
	
	function Actualizar(ID) {
		$.post(r+PeticionInf,{id:ID},function (data) {
			data = JSON.parse(data);
			$('#NombreyApellido').val(data['NombreyApellido']);
			$('#DNI').val(data['DNI']);
			$('#Email').val(data['Email']);
			$('#Telefono').val(data['Telefono']);
		});
	}	
	
	$('#Aceptar').click(function () {
		if($('#ingInf').data('peticion')==CreaUser){
			$.post(r+PeticionNus,{
				NombreyApellido:$('#NombreyApellido').val(),
				DNI:$('#DNI').val(),
				Email:$('#Email').val(),
				Telefono:$('#Telefono').val()},
				function (data) {
					if (data==1){
						$('#Notific > .mensaje').html(MensEstAgre);
						$('#Notific > .mensaje').css('background',ColorExit);
						IniBusEst();
					}
			});
		} else {
			if($('#ingInf').data('peticion')==ModiUser){
				var ArEst=$('#'+IdSelEstud).data('Arreglo-Val');
				$.post(r+PeticionEdi,{
					id:ArEst[0],
					NombreyApellido:$('#NombreyApellido').val(),
					DNI:$('#DNI').val(),
					Email:$('#Email').val(),
					Telefono:$('#Telefono').val()},
					function (data) {
						if (data==1){
							$('#Notific > .mensaje').html(MensEstAgre);
							$('#Notific > .mensaje').css('background',ColorExit);
							IniBusEst();
						}
					});
			}		
		}
		InicForm();
		$('#ingInf').css('display','none');
	});
	//eventos botonera	
	r=$("#parametros").attr('data-rweb')+"/backend/web/index.php";
	$('#Agregar').click(function () {
		$('#ingInf').css('display','block');	
		$('#ingInf').data('peticion',CreaUser);	
		InicForm();
		IniBusEst();		
	});
	$('#Modificar').click(function () {
		var ArEst=$('#'+IdSelEstud).data('Arreglo-Val');
		if (ArEst.length>0){		
			$('#ingInf').css('display','block');	
			$('#ingInf').data('peticion',ModiUser);	
			Actualizar(ArEst[0]);
			//
			//IniBusEst();		
		} else {
			$('#Notific > .mensaje').html(MensSeleccionar);
			$('#Notific > .mensaje').css('background',ColorAlerta);
		}		
				
	});
	$('#Suspender').click(function () {
		var ArEst=$('#'+IdSelEstud).data('Arreglo-Val');
		if (ArEst.length>0){
			$.get(r+PeticionSus,{id:ArEst[0]},function (data) {		
				//Se anuncia el resultado
				//data = JSON.parse(data);
				if (data == PetExitosa){
					$('#Notific > .mensaje').html(MensSusExit);
					$('#Notific > .mensaje').css('background',ColorExito);
					//reestablecemos los buscadores
	    			IniBusEst();	
				}
			});
		} else {
			$('#Notific > .mensaje').html(MensSeleccionar);
			$('#Notific > .mensaje').css('background',ColorAlerta);
		}		
	});
	$('#Eliminar').click(function () {
		var ArEst=$('#'+IdSelEstud).data('Arreglo-Val');
		if (ArEst.length>0){
			$.get(r+PeticionEli,{id:ArEst[0]},function (data) {		
				//Se anuncia el resultado
				//data = JSON.parse(data);
				if (data == PetExitosa){
					$('#Notific > .mensaje').html(MensEliExit);
					$('#Notific > .mensaje').css('background',ColorExito);
					//reestablecemos los buscadores
	    			IniBusEst();	
				}
			});
		} else {
			$('#Notific > .mensaje').html(MensSeleccionar);
			$('#Notific > .mensaje').css('background',ColorAlerta);
		}
				
	});
	
	function EstudS(){}
	function EstudDS(){}
	
	IniBusEst();
	function IniBusEst(){
		InicializarBuscador(
			{
				id:IdSelEstud,n:2,Tit:'Estudiantes',Tabla:'DatosUser',
				CampoB:'NombreyApellido',CampoId:'IdUser',RWeb:r,CantR:5,
				Condiciones:'',							
				FuncionControl:EstudS,//BuscaIdPresta,//función que se ejecuta al activar el checkbox
				FuncionControlD:EstudDS,//BlancIdPresta,//función que se ejecuta al desactivar el checkbox
				Action:"/rbusca",						
			},						
			[ 	 	 	
				["IdUser","Número de estudiante"], //campos, 1 Nombre campo, 2 Alias
				["NombreyApellido","Nombre y apellido"],
				["DNI","DNI"],
				["Email","Correo electrónico"],
				["Telefono","Número de teléfono"],
			],
			{
				Control:'checkbox', //control asociado con registro
				MaxCantEleSele:'1',//maxima cantidad de elementos seleccionables
				Alto:'300px',
				Resaltar:{ //Especificamos el campo, condicion y color para resaltar
					campo:'Suspendido',
					cfondo:'#fcc',//color resaltado, fondo
					condicion:'=',
					valor:'1', //valor con el que comparar el campo
					mensaje:'<b class="rojo">Suspendido</b>',//mensaje a incluir si se resalta por ej "Suspendido"
				}, 
				TextoDef:'Nombre', //texto por defecto del campo de busqueda
			}			
		);
	}
});