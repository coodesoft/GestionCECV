<?php

//importamos el módulo del "buscador"
use app\modules\buscador\buscadorAssets;buscadorAssets::register($this);

//importamos los asets de la página
use app\modules\gestionstock\PrestaAsset;PrestaAsset::register($this);

$this->title = 'Prestamos';
?>

<div class="site-presta row">
	<div class="col-md-6 col-xs-12">
		<div id="BuscaEstu" class="bus"></div>
	</div>
	<div class="col-md-6 col-xs-12">
		<div id="BuscaLib" class="bus"></div>
	</div>
	
	<div class="col-xs-12" id="bot-presta">
		<input id='NuevoPrestamo' class='btn btn-default btn-xs' value='Ingresar retiro' type='button'>
		<input id='CancelPrestamo' class='btn btn-default btn-xs' value='Ingresar devolución' type='button'>
	</div>
</div>

<div class="prestamos-index" id="Historial"></div>
