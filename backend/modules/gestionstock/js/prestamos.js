const IdSelecLibro='BuscaLib';
const IdSelecEstud='BuscaEstu';
const r="/cecv/backend/web/index.php";
const PeticionPre='/apresta';

$(document).ready(function(){
	//Inicializamos controles de carga de información
	$('#NuevoPrestamo').click(function () {
		//se hace la peticion
		var ArLib=JSON.stringify($('#'+IdSelecLibro).data('Arreglo-Val'));
		var ArEst=JSON.stringify($('#'+IdSelecEstud).data('Arreglo-Val'));
		$.get(r+PeticionPre,{L:ArLib,E:ArEst},function (data) {		
			//data = JSON.parse(data);
			//alert(data);
		});		
	});
	$('#CancelPrestamo').click(function () {
	});
	//Inicializamos controles de búsqueda	
	InicializarBuscador({
							id:IdSelecLibro,n:1,Tit:'Catálogo de libros',Tabla:'Stock',
							CampoB:'Nombre',CampoId:'idStock',RWeb:r,CantR:5,
						},
						[
							["Codigo","Código"], //campos, 1 Nombre campo, 2 Alias
							["Nombre","Nombre"],
							["Descripcion","Descripción"],
							["Autor","Autor"],
							["CantidadDisponible","Cantidad Disponible"],
						],
						{
							Control:'checkbox',//control
							MaxCantEleSele:'2',//maxima cantidad de elementos seleccionables
							Alto:'300px', // definir altura fija de la caja
						}
						);	
	InicializarBuscador(
						{
							id:IdSelecEstud,n:2,Tit:'Estudiantes',Tabla:'DatosUser',
							CampoB:'NombreyApellido',CampoId:'IdUser',RWeb:r,CantR:5,
						},						
						[
							["NombreyApellido","Nombre"], //campos, 1 Nombre campo, 2 Alias
							["DNI","DNI"],
							["Email","Correo electrónico"],
							["Telefono","Teléfono"],
						],
						{
							Control:'checkbox', //control asociado con registro
							MaxCantEleSele:'1',//maxima cantidad de elementos seleccionables
							Alto:'300px',
						}			
						);	
});