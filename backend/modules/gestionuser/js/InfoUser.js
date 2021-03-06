const IdBusUsr='InfoUser';
var r;

const MensSeleccionar="Tiene que seleccionar un usuario";
const MensEstAgre="Registro exitoso";
const MensContrasNoIgual="Las contraseñas no coinciden";
const MensUserSeleccion="Editando el usuario ";

const ColorAlerta='#fdd';
const ColorExit='#dfd';
const ColorInfo='#ddf';

const PeticionEli='/eliminausr';
const PeticionInf='/infousr';
const PeticionEdi='/editausr';

const CreaLib="1";
const ModiLib="2";

$(document).ready(function(){
	//eventos y funciones del formulario
	function InicForm(){
		$('#id').val("");
		$('#username').val("");
		$('#email').val("");
		$('#rango').val("");
		$('#contrasenia').val("");
		$('#contrasenia-conf').val("");
	}
	//id	username 	email 	rango
	function CreaNuevo() {
		$.post(r+PeticionInf,{id:ID},function (data) {
			data = JSON.parse(data);
			$('#id').val(data['id']);
			$('#username').val(data['username']);
			$('#email').val(data['email']);
			$('#rango').val(data['rango']);
			$('#contrasenia').val("");
			$('#contrasenia-conf').val("");
		});
	}

	function Actualizar(ID) {
		$.post(r+PeticionInf,{id:ID},function (data) {
			data = JSON.parse(data);
			$('#id').val(data['id']);
			$('#username').val(data['username']);
			$('#email').val(data['email']);
			$('#rango').val(data['rango']);
			$('#contrasenia').val("");
			$('#contrasenia-conf').val("");
		});
	}

	$('#Aceptar').click(function () {
		if($('#ingInf').data('peticion')==ModiLib){
			var ArLib=$('#'+IdBusUsr).data('Arreglo-Val');
			if ($('#contrasenia').val()==$('#contrasenia-conf').val()) {
				$.post(r+PeticionEdi,{
					id:ArLib[0],
					username:$('#username').val(),
					email:$('#email').val(),
					rango:$('#rango').val(),
					contrasenia:$('#contrasenia').val(),},
					function (data) {
						//Se anuncia el resultado de la petición
						data = JSON.parse(data);
						switch(data["codigo"]) {
							case "1": //si la carga fue exitosa
								$('#Notific > .mensaje').html(data["detalles"]);
								$('#Notific > .mensaje').css('background',ColorExit);
								InicForm();
								$('#ingInf').css('display','none');
								IniBusLib();
								break;
							case "3": //si hubo un error al guardar
								$('#Notific > .mensaje').html(data["detalles"]);
								$('#Notific > .mensaje').css('background',ColorAlerta);
								break;
						}
					});
			} else {
				$('#Notific > .mensaje').html(MensContrasNoIgual);
				$('#Notific > .mensaje').css('background',ColorAlerta);
			}
		}
	});
	//eventos botonera
	$('#Modificar').click(function () {
		var ArLib=$('#'+IdBusUsr).data('Arreglo-Val');
		if (ArLib.length>0){
			$('#ingInf').css('display','block');
			$('#ingInf').data('peticion',ModiLib);
			$('#Notific > .mensaje').html(MensUserSeleccion+ArLib[0]);
			$('#Notific > .mensaje').css('background',ColorInfo);
			Actualizar(ArLib[0]);
			//
			//IniBusEst();
		} else {
			$('#Notific > .mensaje').html(MensSeleccionar);
			$('#Notific > .mensaje').css('background',ColorAlerta);
		}

	});

	$('#Eliminar').click(function () {
		var ArLib=$('#'+IdBusUsr).data('Arreglo-Val');
		if (ArLib.length>0){
			$.post(r+PeticionEli,{id:ArLib[0]},function (data) {
				//Se anuncia el resultado de la petición
				data = JSON.parse(data);
				switch(data["codigo"]) {
					case "1": //si la carga fue exitosa
						$('#Notific > .mensaje').html(data["detalles"]);
						$('#Notific > .mensaje').css('background',ColorExit);
						IniBusLib();
						break;
					case "2": //si hubo un error al guardar
						$('#Notific > .mensaje').html(data["detalles"]);
						$('#Notific > .mensaje').css('background',ColorAlerta);
						IniBusLib();
						break;
				}
			});
		} else {
			$('#Notific > .mensaje').html(MensSeleccionar);
			$('#Notific > .mensaje').css('background',ColorAlerta);
		}

	});

	r="../index.php";
	IniBusLib();
	function IniBusLib(){
		InicializarBuscador(
			{
				id:IdBusUsr,n:2,Tit:'Usuarios registrados',Tabla:'user',
				CampoB:'username',CampoId:'id',RWeb:r,CantR:5,
				Condiciones:'',
				FuncionControl:'',//BuscaIdPresta,//función que se ejecuta al activar el checkbox
				FuncionControlD:'',//BlancIdPresta,//función que se ejecuta al desactivar el checkbox
				Action:"/rbusca",
			},
			[ 	 	  	 	 	 //id	username 	email 	rango
				["id","Número de usuario"], //campos, 1 Nombre campo, 2 Alias
				["username","Nombre"],
				["email","Correo electrónico"],
				//["rango","Rango"],
			],
			{
				Control:'checkbox', //control asociado con registro
				MaxCantEleSele:'1',//maxima cantidad de elementos seleccionables
				Alto:'300px',
				Resaltar:{ //Especificamos el campo, condicion y color para resaltar
					campo:'rango',
					cfondo:'',//color resaltado, fondo
					condicion:'=',
					valor:'0', //valor con el que comparar el campo
					mensaje:'<b class="verde">Administrador</b>',//mensaje a incluir si se resalta por ej "Suspendido"
				},
				TextoDef:'Nombre', //texto por defecto del campo de busqueda
			}
		);
	}
});
