<?php
	use app\widgets\htmlview\htmlview;
	use app\widgets\htmlview\htmlviewAssets;
	htmlviewAssets::register($this);
	$this->title = 'Catálogo de libros';
	
	use app\modules\buscador\buscador;
	use app\modules\buscador\buscadorAssets;
	buscadorAssets::register($this);
?>

<?= HtmlView::widget([
	'RegistrosPagina' => $paginacion,
	'TituloSeccion' => 'Catálogo de libros',
	'EtiquetaTitulo' => 'div',
	'ClaseTitulo' => 'TitCat',
	'TBusqueda' => $TBusqueda,
	'PaginaActual' => $pagina,
	'tabla' => 'Stock',
	'Urlpag' => $rutaweb,
	'registro' => 'todos',
	'CampoTitulo' => 'Nombre',
	'CampoCuerpo' => 'Descripcion',
	'CampoIndice'=> 'Nombre',
]);?>

